import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        iter: "name",
        order: "asc"
    });
    const [users, setUsers] = useState();
    const [searchByUserName, setSearchByUserName] = useState("");

    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfession(
                data
                // first method of clearing the filter which doesn't work with arrays
                // Object.assign(data, {allProfession: {name: "All professions"}})
            )
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return {
                        ...user,
                        bookmark: !user.bookmark
                    };
                }
                return user;
            })
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    // second method for clearing the filter
    const clearFilter = () => {
        setSelectedProf();
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchByUserName("");
    };

    const handleSearchByName = ({ target }) => {
        setSearchByUserName(target.value);
        clearFilter();
    };

    if (!users) return <h2>loading....</h2>;

    const filterUsers = (users) => {
        try {
            if (selectedProf) {
                return users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                );
            } else if (searchByUserName) {
                return users.filter((user) =>
                    user.name
                        .trim()
                        .toLowerCase()
                        .includes(searchByUserName.trim().toLowerCase())
                );
            } else {
                return users;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]); // 'asc'-ascending 'desc'-descending
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    if (usersCrop.length === 0 && count) setCurrentPage((prev) => prev - 1);

    if (users.length === 0) return <h2>No users left</h2>;

    // if (!count) {
    //     clearFilter();
    // }

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        {" "}
                        Clear filter
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                {<SearchStatus number={count}/>}
                <TextField
                    name="search"
                    value={searchByUserName}
                    onChange={handleSearchByName}
                    placeholder="Search..."
                />
                {count > 0 && (
                    <UsersTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;

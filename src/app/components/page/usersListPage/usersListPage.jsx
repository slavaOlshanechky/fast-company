import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";

const UsersListPage = () => {
    const users = useSelector(getUsersList());

    const  currentUserId = useSelector(getCurrentUserId());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        iter: "name",
        order: "asc"
    });
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleDelete = (userId) => {
        // setUsers((prevState) =>
        //     prevState.filter((user) => user._id !== userId)
        // );
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        // setUsers(
        //     users.map((user) => {
        //         if (user._id === id) {
        //             return {
        //                 ...user,
        //                 bookmark: !user.bookmark
        //             };
        //         }
        //         return user;
        //     })
        // );
        console.log("newArray");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    // second method for clearing the filter
    const clearFilter = () => {
        setSelectedProf(undefined);
    };

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") {
            setSearchQuery("");
        }
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
        clearFilter();
    };

    if (!users) return <h2>loading....</h2>;

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
            )
            : selectedProf
                ? data.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : data;
        return filteredUsers.filter((user) => user._id !== currentUserId);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]); // 'asc'-ascending 'desc'-descending
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    if (usersCrop.length === 0 && count) setCurrentPage((prev) => prev - 1);

    if (users.length === 0) return <h2>No users left</h2>;

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
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
                    value={searchQuery}
                    onChange={handleSearchQuery}
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

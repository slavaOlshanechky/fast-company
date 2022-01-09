import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 2;

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfession(
                data
                // first method of clearing the filter which doesn't work with arrays
                // Object.assign(data, {
                //         allProfession: {name: "All professions"}})
            )
        );
    }, []);

    // useEffect(()=>{
    //     console.log(professions)
    // },[professions])

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // second method for clearing the filter
    const clearFilter = () => {
        setSelectedProf();
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    if (!allUsers) return <h2>loading....</h2>;

    const filteredUsers =
        // first method of clearing the filter
        // selectedProf && selectedProf._id
        selectedProf
            ? allUsers.filter(
                (user) => user.profession._id === selectedProf._id
            )
            : allUsers;

    const count = filteredUsers.length;

    const usersCrop = paginate(filteredUsers, currentPage, pageSize);

    if (usersCrop.length === 0 && count) setCurrentPage((prev) => prev - 1);

    if (allUsers.length === 0) return <h2>No users left</h2>;

    if (!count) {
        clearFilter();
    }

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
                {<SearchStatus number={count} />}

                {count > 0 && (
                    <table className="table">
                        <thead className="head">
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                            {/* {renderTable(users.length)} */}
                        </tbody>
                    </table>
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

Users.propTypes = {
    users: PropTypes.array
};
export default Users;

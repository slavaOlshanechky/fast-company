import React, {useEffect, useState} from "react";
import User from "./user";
import Pagination from "./pagination";
import {paginate} from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";

const Users = ({users: allUsers, ...rest}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState()
    const count = allUsers.length;
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfession(
                data
                //first method of clearing the filter which doesn't work with arrays
                // Object.assign(data, {
                //         allProfession: {name: "All professions"}})
            ))
    }, [])

    // useEffect(()=>{
    //     console.log(professions)
    // },[professions])


    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers =
        //first method of clearing the filter
        //selectedProf && selectedProf._id
        selectedProf
            ? allUsers.filter((user) => user.profession === selectedProf)
            : allUsers

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    //second method for clearing the filter
    const cleatFilter = () => {
        setSelectedProf()
    }
    const handleProfessionSelect = item => {
        setSelectedProf(item)
    };

    return (
        <>
            {professions && (
                <>
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}

                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={cleatFilter}
                    > Clear filter
                    </button>
                </>
            )
            }
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
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {userCrop.map((user) => (
                        <User key={user._id} {...rest} {...user} />
                    ))}
                    {/* {renderTable(users.length)} */}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array
};
export default Users;

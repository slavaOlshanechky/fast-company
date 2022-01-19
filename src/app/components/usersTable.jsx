import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import { Link } from "react-router-dom";


const UsersTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest}) => {
    const columns = {
        name: {path: "name", name: "Имя",
            component: (user) => (
                <Link to={`users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities}/>)},
        professions: {path: "profession.name", name: "Профессия"},
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {path: "rate", name: "Оценка"},
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )

        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };

    return (
        //first method
        // <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>

// second method with children
        <Table>
            <TableHeader {...{onSort, selectedSort, columns}} />
            <TableBody {...{columns, data: users}}/>
        </Table>

    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UsersTable;

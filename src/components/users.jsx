import React from "react";
import User from "./user";

const Users = (props) => {
    const {users, onDelete, onToggleBookMark} = props
    const renderTable = () => {
        return (
            <>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onDelete={onDelete}
                        onToggleBookMark={onToggleBookMark}
                    />
                ))}
            </>
        )

    }

    return (
        <>
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
                {renderTable(users.length)}
                </tbody>
            </table>

        </>
    )
}

export default Users
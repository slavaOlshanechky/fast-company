import React from "react";
import User from "./user";
const Users = ({users,...rest}) => {


    return (
        <>
            {/*<span className={getBadgeClasses()}>{renderPhrase(users.length)}</span>*/}
            {SearchStatus}
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
                <tbody>{renderTab()}</tbody>
            </table>

        </>
    )
}

export default Users
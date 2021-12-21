import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = () => {


    const renderTab = () => {
        return (
            users.length !== 0 &&
            users.map((user) =>
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                        {qualitiesIterator(user)}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td><i className="bi bi-bookmark-star"/><i className="bi bi-bookmark-star-fill"/></td>
                    <td>
                        <button className="btn btn-primary btn-sm m-2" onClick={() => handleDelete(user._id)}>
                            delete
                        </button>
                    </td>
                </tr>
            )
        );
    };

}
export default User
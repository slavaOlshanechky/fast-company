import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = (props) => {

    const {user, onDelete, onToggleBookMark} = props
    const {_id, name, qualities, profession, completedMeetings, rate, isBookMarked} = user

    const {name: profName} = profession;
    return (
        <tr key={user._id}>
            <th scope='row'>{name}</th>
            <td>
                <Quality qualitiesArr={qualities}/>
            </td>
            <td>{profName}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <button className="btn btn-primary btn-sm m-2" onClick={() => onToggleBookMark(_id)}>
                    {
                        <Bookmark
                            status={isBookMarked}
                            // user={user}

                        />
                        // isBookMarked ? (
                        //     <i className="bi bi-bookmark-star-fill"/>
                        // ) : (
                        //     <i className="bi bi-bookmark-star"/>
                        // )
                    }
                </button>
            </td>
            <td>
                <button className="btn btn-primary btn-sm m-2" onClick={() => onDelete(_id)}>
                    delete
                </button>
            </td>
        </tr>
    );

}
export default User
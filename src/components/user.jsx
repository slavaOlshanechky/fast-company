import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

// const User = (props) => {
//     const { user,onDelete, onToggleBookMark} = props
//     const {_id, name, qualities, profession, completedMeetings, rate, isBookMarked} = user
//
//     const {name: profName} = profession;
const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    isBookMarked,
    onToggleBookMark
}) => {
    return (
        <tr key={_id}>
            <th scope="row">{name}</th>
            <td>
                {qualities.map((quality) => (
                    <Quality {...quality} key={quality._id} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark
                    status={isBookMarked}
                    onClick={() => onToggleBookMark(_id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    isBookMarked: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleAllUsers = () => {
        history.push(`/users`);
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <Qualities qualities={user.qualities} />
            <p>completedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button className="btn btn-secondary" onClick={handleAllUsers}>
                Все пользователи
            </button>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;

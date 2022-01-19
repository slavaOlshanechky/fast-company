import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    // console.log(userId);
    console.log(JSON.stringify(api.users.getById(userId)));
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        })
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
            <button
                className="btn btn-secondary mt-2"
                onClick={handleAllUsers}
            >
                Все пользователи
            </button>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;

import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container">
            <div className="row gutters-sm">
                {/* left column */}
                <div className="col-md-4 mb-3">
                    <UserCard user={user}/>
                    <QualitiesCard qualities={user.qualities}/>
                    <MeetingsCard value={user.completedMeetings}/>
                </div>
                {/* right column */}
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;

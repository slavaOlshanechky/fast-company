import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage/";

const Users = () => {
    const { userId, userParam } = useParams();
    if (userId) {
        if (userParam === "edit") {
            return <UserEditPage userId={userId} />;
        } else {
            return <UserPage userId={userId} />;
        }
    } else {
        return <UsersListPage />;
    }
};

export default Users;

import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersListPage from "../components/usersListPage";

const Users = () => {
    const { userId, userParam } = useParams();

    return userId ? <UserPage userId={userId} /> : <UsersListPage />;
};

export default Users;

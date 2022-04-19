import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage/";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    const {
        userId,
        edit
    } = params;
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (userId === currentUser._id ? (
                            <UserEditPage userId={userId}/>
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`}/>)
                    ) : (
                        <UserPage userId={userId}/>
                    )
                ) : (
                    <UsersListPage/>
                )}
            </UserProvider>
        </>
    );
};

export default Users;

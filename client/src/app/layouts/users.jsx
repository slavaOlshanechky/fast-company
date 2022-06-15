import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const {
        userId,
        edit
    } = params;

    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (userId === currentUserId ? (
                            <UserEditPage userId={userId}/>
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`}/>)
                    ) : (
                        <UserPage userId={userId}/>
                    )
                ) : (
                    <UsersListPage/>
                )}
            </UsersLoader>
        </>
    );
};

export default Users;

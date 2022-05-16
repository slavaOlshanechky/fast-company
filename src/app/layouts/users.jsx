import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEditPage/";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";
import { getDataStatus, loadUsersList } from "../store/users";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
    const params = useParams();
    const {
        userId,
        edit
    } = params;
    const { currentUser } = useAuth();
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList());
        }
    }, []);

    if (!dataStatus) return "Loading...";

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

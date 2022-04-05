import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create({
    baseURL:"https://identitytoolkit.googleapis.com/v1/",
    params:{
        key:process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    async function signUp({
        email,
        password,
        ...rest
    }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });

            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const {
                code,
                message
            } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "User with this Email exists. Choose another one." };
                    throw errorObject;
                }
            }
        }
    };

    async function signIn({
        email,
        password
    }) {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const {
                code,
                message
            } = error.response.data.error;

            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "There is no user record corresponding to this identifier. The user may have been deleted." };
                    throw errorObject;
                } else if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "The password is invalid or the user does not have a password." };
                    throw errorObject;
                }
            }
        }
    };

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            currentUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getProfessions();
    }, [])

    async function getProfessions() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);

    }
    return (
        <ProfessionContext.Provider value={{isLoading,professions}}>
            {children}
        </ProfessionContext.Provider>
    );
};


ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

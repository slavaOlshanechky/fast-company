import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};
export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error != null) {
            toast(error);
            setError(error);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        getQualitiesList();
    }, []);
    return (
        <QualityContext.Provider value={{
            isLoading,
            qualities,
            getQuality
        }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
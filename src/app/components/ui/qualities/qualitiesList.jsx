import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading...";

    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} id={quality} />
            ))}
        </>
    );

};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;

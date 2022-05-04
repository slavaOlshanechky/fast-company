// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfessionsLoadingStatus, loadProfessionsList } from "../../store/professions";
//
// const Profession = ({ id }) => {
//     const {
//         isLoading,
//         getProfession
//     } = useProfession();
//     const dispatch = useDispatch();
//     const isLoading = useSelector(getProfessionsLoadingStatus());
//
//     useEffect(() => {
//         dispatch(loadProfessionsList());
//     }, []);
//
//     const prof = getProfession(id);
//     if (!isLoading) {
//         return <p>{prof.name}</p>;
//     } else {
//         return "loading...";
//     }
//
// };
//
// Profession.propTypes = {
//     id: PropTypes.string
// };
//
// export default Profession;

import React from "react";
import { useProfession } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const {
        isLoading,
        getProfession
    } = useProfession();

    const prof = getProfession(id);
    if (!isLoading) {
        return  <p>{prof.name}</p>
    } else return "loading...";

};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
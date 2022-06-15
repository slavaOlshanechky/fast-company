import React from "react";

const SearchStatus = (props) => {
    const { number } = props;
    const getBadgeClasses = () => {
        let classes = "badge rounded-pill ";
        classes += number === 0 ? "bg-warning" : "bg-primary";
        return classes;
    };

    const renderPhrase = (number) => {
        let suffix1 = null;
        let suffix2 = null;
        const n = number % 10;

        if (n === 1 || (number >= 5 && number <= 20) || n === 0) {
            suffix1 = "";
            suffix2 = "ет";
        } else if (n >= 2 && n <= 4) {
            suffix1 = "а";
            suffix2 = "ут";
        }
        const phrase =
            number + ` человек${suffix1} тусан${suffix2} с тобой сегодня`;
        return number === 0 ? "Никто с тобой не тусанет" : phrase;
    };


    return (
        <>
            {" "}
            <span className={getBadgeClasses()}>{renderPhrase(number)}</span>
        </>
    );
};

export default SearchStatus;

// import React from "react";
// import PropTypes from "prop-types";
// import declOfNum from "../../utils/declOfNum";
//
// const SearchStatus = ({ number }) => {
//     const variantsPhrases = [
//         "человек тусанет",
//         "человека тусанут",
//         "человек тусанут"
//     ];
//
//     let classes = "badge m-1 bg-";
//     classes += number === 0 ? "danger" : "primary";
//     let phrase;
//
//     //ToDO fix bug with 0 users quantity
//     if (number === 0) {
//         phrase = "Никто не тусанет";
//     } else {
//         phrase = `${number} ${declOfNum(number, variantsPhrases)}`;
//     }
//
//     return (
//         <h2>
//             <span className={classes}>{phrase} с тобой сегодня</span>
//         </h2>
//     );
// };
//
// SearchStatus.propTypes = {
//     number: PropTypes.number.isRequired
// };
//
// export default SearchStatus;
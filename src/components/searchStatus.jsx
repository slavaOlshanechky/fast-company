import React from "react";

const SearchStatus = (props) => {
    // eslint-disable-next-line react/prop-types
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

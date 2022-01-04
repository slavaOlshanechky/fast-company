import React from "react";
// eslint-disable-next-line react/prop-types
const Quality = ({ color, name, _id }) => {
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

export default Quality;

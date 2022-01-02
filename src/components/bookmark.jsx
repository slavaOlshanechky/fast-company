import React from "react";

const Bookmark = ({status, ...rest}) => {
    const isBookMarked = true
    return (
        (status === isBookMarked) ? (
            <i className="bi bi-bookmark-star-fill"/>
        ) : (
            <i className="bi bi-bookmark-star"/>
        )
    )
}

export default Bookmark
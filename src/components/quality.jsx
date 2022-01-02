import React from "react";

const Quality = (props) => {
    const {qualitiesArr} = props

    return (
        <>
            {qualitiesArr.map((item) => {
                const {_id, name, color} = item
                return (
                    <span key={_id} className={`badge bg-${color} m-1`}>
                        {name}
                    </span>
                )
            })}
        </>

    )
}

export default Quality
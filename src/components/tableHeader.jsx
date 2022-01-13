import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({onSort, selectedSort, columns}) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc"
                    : "asc"

            });
        } else {
            onSort({path: item, order: "asc"});
        }
    };

    function renderArrow(path, selectedSort) {
        if (selectedSort.path && selectedSort.path === path) {
            return selectedSort.order === "asc" ? (
                <i className="bi bi-caret-up-fill"/>
            ) : (
                <i className="bi bi-caret-down-fill"/>
            );
        }
        return null;
    }


    return (
        <thead className="head">
        <tr>
            {Object.keys(columns).map((column) => (
                <th
                    key={column}
                    onClick={
                        columns[column].path
                            ? () => handleSort(columns[column].path)

                            : undefined
                    }
                    {...{role: columns[column].path && "button"}}
                    scope="col"
                >
                    {(columns[column].name)}
                    {renderArrow(columns[column].path, selectedSort)}

                </th>
            ))}
        </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;

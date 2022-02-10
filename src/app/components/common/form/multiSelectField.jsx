import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    // const optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.keys(options).map((optionName) => ({
    //             label: options[optionName].name,
    //             value: options[optionName]._id
    //         })) :
    //         (options && options.map((option) => ({
    //                 label: option.name,
    //                 value: option._id
    //             }))
    //         );
    // const optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.keys(options).map((optionName) => ({
    //             label: options[optionName].name,
    //             value: options[optionName]._id
    //         }))
    //         : options;
    const formatData = (data) => {
        if (!Array.isArray(data) && typeof data === "object") {
            return Object.keys(options).map((key) => ({
                value: options[key]._id,
                label: options[key].name
            }));
        }
        if (Array.isArray(data)) {
            return data.map((item) => ({ value: item._id, label: item.name }));
        }
    };

    const handleChange = (value) => {
        onChange({
            name: name,
            value
        });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                // defaultValue={defaultValue}
                // options={optionsArray}

                defaultValue={formatData(defaultValue)}
                options={formatData(options)}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default MultiSelectField;

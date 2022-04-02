import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({
            name: target.name,
            value: target.value
        });
    };
    const getInputClasses = () => {
        return "form-select" + error ? " is-invalid" : "";
    };
    //My version
    // const optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.keys(options).map((optionName) => ({
    //             name: options[optionName].name,
    //             value: options[optionName]._id
    //         }))
    //         : options &&
    //         options.map((option) => ({
    //             name: option.name,
    //             value: option._id
    //         }));

    //Roman version
    // let optionsArray = [];
    // if (!Array.isArray(options) && typeof options === "object") {
    //     optionsArray = Object.keys(options).map((optionName) => ({
    //         name: options[optionName].name,
    //         value: options[optionName]._id
    //     }));
    // }
    // if (Array.isArray(options)) {
    //     optionsArray = options.map((option) => ({
    //         name: option.name,
    //         value: option._id
    //     }));
    // }

    //Vasiliy version
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                name: options[optionName].label,
                value: options[optionName].value
            }))
            : options;

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

// SelectField.defaultProps = {
//     defaultOption: "Выберите..."
// };

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default SelectField;

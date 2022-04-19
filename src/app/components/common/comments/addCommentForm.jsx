import React, { useState } from "react";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onAdd }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Fill the comment"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onAdd(data);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}></form>
            <div className="mb-4">
            </div>
            <TextAreaField
                label="Сообщение"
                name="content"
                value={data.content || ""}
                onChange={handleChange}
                error={errors.content}
            />
            <div className="d-flex justify-content-end" onClick={handleSubmit}>
                <button className="btn btn-primary">Опубликовать</button>
            </div>
        </div>
    );
};
export default AddCommentForm;
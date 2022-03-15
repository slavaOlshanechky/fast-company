import React, { useEffect, useState } from "react";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const initialData = {
    userId: "",
    content: ""
};

const AddCommentForm = ({ onAdd }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Choose user name"
            }
        },
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
        setData(initialData);
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
                <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    name="userId"
                    options={users}
                    error={errors.userId}
                    defaultOption="Choose user"
                />
            </div>
            <TextAreaField
                label="Сообщение"
                name="content"
                value={data.content}
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
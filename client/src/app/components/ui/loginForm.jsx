import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
import { useHistory } from "react-router-dom";
// import * as yup from 'yup'

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const loginError = useSelector(getAuthErrors());
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // let validateSchema = yup.object().shape({
    //     password: yup.string()
    //         .required('Enter your password')
    //         .matches(/(?=.*[A-Z])/,'Password must contain at least one capital letter')
    //         .matches(/(?=.*[0-9])/,'Password must contain at least one digit')
    //         .matches(/(?=.*[!@#$%^&*])/,'Password must contain at least one special symbol !@#$%^&*')
    //         .matches(/(?=.{8,})/,'Password must contain min 8 symbols'),
    //     email: yup.string().required('Enter your email').email('Incorrect email')
    // });

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateSchema.validate(data,{abortEarly:false}).then(()=>).catch((err)=>)
        // validateSchema.validate(data)
        //     .then(()=>setErrors({}))
        //     .catch((err)=>setErrors({[err.path]:err.message}))
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state ?
            history.location.state.from.pathname :
            "/";

        dispatch(login({
            payload: data,
            redirect
        }));

    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Stay logged in
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};
export default LoginForm;

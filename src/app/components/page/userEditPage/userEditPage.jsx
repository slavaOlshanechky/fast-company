import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backHistoryButton";

const UserEditPage = ({ userId }) => {
    // const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
        console.log(data);
    };
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;

// import React, { useEffect, useState } from "react";
// import TextField from "../../common/form/textField";
// import api from "../../../api";
// import SelectField from "../../common/form/selectField";
// import RadioField from "../../common/form/radioField";
// import MultiSelectField from "../../common/form/multiSelectField";
// import { validator } from "../../../utils/validator";
// import { useHistory, useParams } from "react-router-dom";
// import PropTypes from "prop-types";
// import BackHistoryButton from "../../common/backHistoryButton";
//
// const UserEditPage = () => {
//     const { userId } = useParams();
//     const [user, setUser] = useState();
//     const [qualities, setQualities] = useState();
//     const [professions, setProfession] = useState();
//     const [errors, setErrors] = useState();
//     const history = useHistory();
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         profession: "",
//         sex: "male",
//         qualities: []
//     });
//
//     useEffect(() => {
//         api.users.getById(userId).then((data) => {
//             setUser(data);
//         });
//         api.professions.fetchAll().then((data) => setProfession(data));
//         api.qualities.fetchAll().then((data) => setQualities(data));
//     }, []);
//
//     function handleChange(target) {
//         setUser((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     }
//
//     const validatorConfig = {
//         name: {
//             isRequired: {
//                 message: "Поле Имя обязательно для заполнения"
//             },
//             isNotADigit: {
//                 message: "Недопустимые символы в имени"
//             }
//         },
//         email: {
//             isRequired: {
//                 message: "Электронная почта обязательна для заполнения"
//             },
//             isEmail: {
//                 message: "Email введен не корректно"
//             }
//         },
//         profession: {
//             isRequired: {
//                 message: "Выберите свою профессию"
//             }
//         }
//     };
//     useEffect(() => {
//         validate();
//     }, [user]);
//
//     // const isValid = Object.keys(errors).length === 0;
//
//     function handleProfessionChange({ value }) {
//         const professionName =
//             professions[
//                 Object.keys(professions).find(
//                     (item) => professions[item]._id === value
//                 )
//             ].name;
//         setUser((prevState) => ({
//             ...prevState,
//             profession: {
//                 _id: value,
//                 name: professionName
//             }
//         }));
//     }
//     function handleQualitiesChange({ value }) {
//         const convertedQualities = value.map((item) => ({
//             ...qualities[
//                 Object.keys(qualities).find(
//                     (key) => qualities[key]._id === item.value
//                 )
//             ]
//         }));
//         setUser((prevState) => ({
//             ...prevState,
//             qualities: convertedQualities
//         }));
//     }
//
//     const validate = () => {
//         const errors = validator(user, validatorConfig);
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//
//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     const isValid = validate();
//     //     if (!isValid) return;
//     //     history.push(`/users/${userId}`);
//     //     api.users.update(user._id, user)
//     //         .then(history.push(`/users/${userId}`));
//     // };
//     const getProfessionById = (id) => {
//         for (const prof in professions) {
//             const profData = professions[prof];
//             if (profData._id === id) return profData;
//         }
//     };
//
//     const getQualities = (elements) => {
//         const qualitiesArray = [];
//         for (const elem of elements) {
//             for (const quality in qualities) {
//                 if (elem.value === qualities[quality]._id) {
//                     qualitiesArray.push(qualities[quality]);
//                 }
//             }
//         }
//         return qualitiesArray;
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const isValid = validate();
//         if (!isValid) return;
//         const { profession, qualities } = data;
//         api.users
//             .update(userId, {
//                 ...data,
//                 profession: getProfessionById(profession),
//                 qualities: getQualities(qualities)
//             })
//             .then((data) => history.push(`/users/${data._id}`));
//         console.log(data);
//     };
//     return (
//         <div className="container mt-5">
//             <BackHistoryButton />
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 shadow p-4">
//                     {user && qualities ? (
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 label="Имя"
//                                 name="name"
//                                 value={user.name}
//                                 onChange={handleChange}
//                                 error={errors.name}
//                             />
//                             <TextField
//                                 label="Электронная почта"
//                                 name="email"
//                                 value={user.email}
//                                 onChange={handleChange}
//                                 error={errors.email}
//                             />
//                             <SelectField
//                                 label="Choose your profession"
//                                 defaultOption="Choose..."
//                                 name="professions"
//                                 options={professions}
//                                 onChange={handleProfessionChange}
//                                 value={user.profession._id}
//                                 error={errors.profession}
//                             />
//                             <RadioField
//                                 options={[
//                                     {
//                                         name: "Male",
//                                         value: "male"
//                                     },
//                                     {
//                                         name: "Female",
//                                         value: "female"
//                                     },
//                                     {
//                                         name: "Other",
//                                         value: "other"
//                                     }
//                                 ]}
//                                 value={user.sex}
//                                 name="sex"
//                                 onChange={handleChange}
//                                 label="Choose your sex"
//                             />
//                             <MultiSelectField
//                                 options={qualities}
//                                 onChange={handleQualitiesChange}
//                                 value={user.qualities}
//                                 defaultValue={user.qualities}
//                                 name="qualities"
//                                 label="Choose your quality/ies"
//                             />
//                             <button
//                                 type="submit"
//                                 disabled={!validate}
//                                 className="btn btn-primary w-100 mx-auto"
//                             >
//                                 Обновить данные
//                             </button>
//                         </form>
//                     ) : (
//                         <h2>Loading...</h2>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
// UserEditPage.propTypes = {
//     userId: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     value: PropTypes.string,
//     onChange: PropTypes.func,
//     name: PropTypes.string,
//     options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
//     error: PropTypes.string,
//     defaultOption: PropTypes.string
// };
// export default UserEditPage;

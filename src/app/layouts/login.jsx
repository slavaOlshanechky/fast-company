import React, { useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const handleChange = ({ target }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <form action="">
            <TextField label='Электронная почта' name='email' value={data.email} onChange={handleChange}/>
            <TextField label='Пароль' type='password' name='password' value={data.password} onChange={handleChange}/>
            {/* <div> */}
            {/*     <label htmlFor="email">Email</label> */}
            {/*     <input type="text" id="email" value={data.email} name="email" onChange={handleChange}/> */}
            {/* </div> */}
            {/* <div> */}
            {/*     <label htmlFor="password">Password</label> */}
            {/*     <input type="password" id="password" value={data.password} name="password" onChange={handleChange}/> */}
            {/* </div> */}
        </form>
    );
};
export default Login;

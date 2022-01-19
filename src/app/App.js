import React from "react";
import Navbar from "./components/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={Users}/>
                <Redirect to="/"/>
            </Switch>
        </div>
    );
}

export default App;

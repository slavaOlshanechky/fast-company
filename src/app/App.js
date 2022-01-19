import React from "react";
import Navbar from "./components/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import Users from "./components/users";

function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" component={Login}/>
                {/* <Route path="/users" exact component={UsersListPage}/> */}
                {/* <Route path="/users/:userId?" component={UserPage}/> */}
                <Route path="/users/:userId?" component={Users}/>

                {/* <Route path="/404" component={NotFound}/> */}
                <Redirect to="/"/>
            </Switch>
        </div>

    );
};

export default App;

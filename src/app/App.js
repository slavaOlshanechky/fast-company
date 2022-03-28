import React from "react";
import Navbar from "./components/ui/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";

function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <ProfessionProvider>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/users/:userId?/:userParam?" component={Users}/>
                </ProfessionProvider>
                {/* <Route path="/users/:userId?" component={Users} /> */}
                <Redirect to="/"/>
            </Switch>
            <ToastContainer/>
        </div>
    );
}

export default App;

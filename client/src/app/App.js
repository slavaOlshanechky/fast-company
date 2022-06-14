import React from "react";
import Navbar from "./components/ui/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logout";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {

    return (
        <div>
            <AppLoader>
                <Navbar/>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/logout" component={LogOut}/>
                        <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                        <Redirect to="/"/>
                    </Switch>
                {/* <Route path="/users/:userId?" component={Users} /> */}
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;

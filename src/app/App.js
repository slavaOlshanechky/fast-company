import React from "react";
import Navbar from "./components/ui/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <div>
            <Navbar/>
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/users/:userId?/:userParam?" component={Users}/>
                        <Redirect to="/"/>
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            {/* <Route path="/users/:userId?" component={Users} /> */}
            <ToastContainer/>
        </div>
    );
}

export default App;

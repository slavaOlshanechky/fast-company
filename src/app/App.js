import React from "react";
import Navbar from "./components/ui/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
    return (
        <div>
            <AuthProvider>
            <Navbar/>
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/login/:type?" component={Login}/>
                        <ProtectedRoute path="/users/:userId?/:userParam?" component={Users}/>
                        <Redirect to="/"/>
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            {/* <Route path="/users/:userId?" component={Users} /> */}
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;

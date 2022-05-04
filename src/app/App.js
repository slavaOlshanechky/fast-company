import React, { useEffect } from "react";
import Navbar from "./components/ui/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logout";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        dispatch(loadUsersList());
    }, []);

    return (
        <div>
            <AuthProvider>
                <Navbar/>
                    <ProfessionProvider>
                        <Switch>
                            <Route path="/" exact component={Main}/>
                            <Route path="/login/:type?" component={Login}/>
                            <Route path="/logout" component={LogOut}/>
                            <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                            <Redirect to="/"/>
                        </Switch>
                    </ProfessionProvider>
                {/* <Route path="/users/:userId?" component={Users} /> */}
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;

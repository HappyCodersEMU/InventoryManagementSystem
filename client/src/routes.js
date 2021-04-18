import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import {AccountPage} from "./pages/AccountPage";
import {MainPage} from "./pages/MainPage";
import {DetailPage} from "./pages/DetailPage";
import {OrganizationPage} from "./pages/OrganizationPage";
import {LoginPage} from "./pages/Auth/LoginPage";
import {RegisterPage} from "./pages/Auth/RegisterPage";


export const useRoutes = isAuthenticated => {
    if (!isAuthenticated) {
        return (
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Redirect to="/login" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/main">
                <MainPage />
            </Route>
            <Redirect to="/main" />
        </Switch>
    )

}
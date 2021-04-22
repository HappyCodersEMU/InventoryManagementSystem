import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import {AccountPage} from "./pages/AccountPage";
import {MainPage} from "./pages/MainPage";
import {DetailPage} from "./pages/DetailPage";
import {OrganizationCreatePage} from "./pages/OrganizationCreatePage";
import {LoginPage} from "./pages/Auth/LoginPage";
import {RegisterPage} from "./pages/Auth/RegisterPage";


export const useRoutes = (isAuthenticated, hasCompany) => {
    if (!isAuthenticated) {
        return (
            <Switch>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/register" exact>
                    <RegisterPage />
                </Route>
                <Redirect to="/login" />
            </Switch>
        )
    }
    if (!hasCompany) {
        return (
            <Switch>
                <Route path="/organization/create" exact>
                    <OrganizationCreatePage />
                </Route>
                <Redirect to="/organization/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/main" exact>
                <MainPage />
            </Route>
            <Redirect to="/main" />
        </Switch>
    )

}
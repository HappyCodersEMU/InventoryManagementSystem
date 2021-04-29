import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import {OrganizationList} from "./pages/OrganizationList";
import {OrganizationCreatePage} from "./pages/OrganizationCreatePage";
import {LoginPage} from "./pages/Auth/LoginPage";
import {RegisterPage} from "./pages/Auth/RegisterPage";
import {Application} from "./pages/Application";


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
            <Route path="/orglist" exact>
                <OrganizationList />
            </Route>
            <Route path="/:id/home">
                <Application />
            </Route>
            <Redirect to="/orglist" />
        </Switch>
    )

}
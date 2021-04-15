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
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/auth/login">
                    <LoginPage />
                </Route>
                <Route path="/auth/register">
                    <RegisterPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Route path="/detail/:id">
                <DetailPage />
            </Route>
            <Route path="/account">
                <AccountPage />
            </Route>
            <Route path="/organization">
                <OrganizationPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
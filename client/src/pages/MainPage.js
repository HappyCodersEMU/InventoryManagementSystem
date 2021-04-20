import React, {useContext} from 'react'
import stylesheet from '../stylesheet.css'
import {AuthContext} from "../context/auth.context";

export const MainPage = () => {
    const auth = useContext(AuthContext)

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }

    return (
        <div>
            <div className="background">
                <header>
                    <div className="header-content">
                        <div className="logo-block">
                            Logo block
                        </div>
                        <div className="navbar">
                            Navbar
                        </div>
                        <div className="user-block">
                            User block
                            <div>
                                <button onClick={logoutHandler}>
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="main">
                    </div>
                </div>
            </div>
        </div>
    )
}
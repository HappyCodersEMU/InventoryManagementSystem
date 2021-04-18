import React from 'react'
import stylesheet from '../stylesheet.css'

export const MainPage = () => {
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
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="column">
                    </div>
                    <div className="main">
                    </div>
                    <div className="column">
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react'

export const RegisterPage = () => {
    return (
        <div>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-box">
                        <div className="login-logo-box">
                            Sign Up
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" for="hello">e-mail</label>
                            <input className="login-input-field" id="hello"/>
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="hello">username</label>
                            <input className="login-input-field" id="hello"/>
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="hello">name</label>
                            <input className="login-input-field" id="hello"/>
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="hello">password</label>
                            <input className="login-input-field" id="hello"/>
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="hello">confirm password</label>
                            <input className="login-input-field" id="hello"/>
                        </div>
                        <div className="login-input-group">
                            <button className="login-button">Sing Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
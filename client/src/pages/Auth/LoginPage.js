import React, {useContext, useState} from 'react'
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/auth.context';

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-box">
                        <div className="login-logo-box">
                            Sign Up
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="email">e-mail</label>
                            <input className="login-input-field"
                                   placeholder="Enter email"
                                   name="email"
                                   id="email"
                                   onChange={changeHandler}
                            />
                        </div>

                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="password">password</label>
                            <input className="login-input-field"
                                   placeholder="Enter password"
                                   name="password"
                                   type="password"
                                   id="password"
                                   onChange={changeHandler}
                            />
                        </div>

                        <div className="login-input-group">
                            <button className="login-button" onClick={loginHandler} >
                                Sing Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
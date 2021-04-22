import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/auth.context';

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request, message, clearMessage } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (message) {
            setErrMsg(message.message)
        }
        clearMessage()
    }, [message, clearMessage])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.hasCompany)
        } catch (e) {}
    }


    return (
        <div>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-box">
                        <div className="login-logo-box">
                            Log In
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
                        <div className="errorHandler">{errMsg}</div>
                        <div className="login-input-group">
                            <button className="login-button" disabled={loading} onClick={loginHandler} >
                                Log In</button>
                        </div>
                        <div>
                            <span>Don't have an account?<a href="/register">Create!</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
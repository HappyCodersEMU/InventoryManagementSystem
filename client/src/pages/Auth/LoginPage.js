import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/auth.context';
import './Login.css'

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
        <div className="login">
            <div className="login-background"></div>
            <div className="login-box">
                <div className="login-content-wrap">
                    <div className="login-logo-box">
                        Log In
                    </div>
                    <div className="login-input-group">
                        <label className="login-input-label" htmlFor="email" data-placeholder="">e-mail</label>
                        <input className="login-input-field"
                               placeholder="Enter email"
                               name="email"
                               id="email"
                               onChange={changeHandler}
                        />
                        <hr className="input-line" />
                    </div>

                    <div className="login-input-group">
                        <label className="login-input-label" htmlFor="password" data-placeholder="">Password</label>
                        <input className="login-input-field"
                               placeholder="Enter password"
                               name="password"
                               type="password"
                               id="password"
                               onChange={changeHandler}
                        />
                        <hr className="input-line" />
                    </div>
                    <div className="error-handler">{errMsg}</div>
                    <button className="login-button" disabled={loading} onClick={loginHandler} >
                        Log In
                    </button>
                    <div className="underbutton-link">
                        <span>Don't have an account?<a href="/register"> Create!</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
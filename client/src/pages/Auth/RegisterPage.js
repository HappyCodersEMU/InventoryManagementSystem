import React, { useEffect, useState } from 'react'
import { useHttp } from "../../hooks/http.hook"
import './Login.css'


export const RegisterPage = () => {

    const { loading, request, message, clearMessage } = useHttp()
    const [form, setForm] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        conPassword: ''
    })

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (message) {
            setErrMsg(message.message)
        }
        clearMessage()
    }, [message, clearMessage])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const confirmPassword = event => {
        if (event.target.value != form.password) {
            setErrMsg('Passwords do not match')
            return
        }
        setErrMsg('')
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
        } catch (e) { }
    }


    return (
        <div className="login">
            <div className="login-background"></div>
            <div className="login-box">
                <div className="login-content-wrap">
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
                        <hr className="input-line" />
                    </div>
                    <div className="login-input-group">
                        <label className="login-input-label" htmlFor="name">Name</label>
                        <input className="login-input-field"
                            placeholder="Enter name"
                            id="name"
                            name="name"
                            onChange={changeHandler}
                        />
                        <hr className="input-line" />
                    </div>
                    <div className="login-input-group">
                        <label className="login-input-label" htmlFor="surname">Surname</label>
                        <input className="login-input-field"
                            placeholder="Enter surname"
                            name="surname"
                            id="surname"
                            onChange={changeHandler}
                        />
                        <hr className="input-line" />
                    </div>
                    <div className="login-input-group">
                        <label className="login-input-label" htmlFor="password">Password</label>
                        <input className="login-input-field"
                            placeholder="Enter password"
                            name="password"
                            type="password"
                            id="password"
                            onChange={changeHandler}
                        />
                        <hr className="input-line" />
                    </div>
                    <div className="login-input-group">
                        <label className="login-input-label" htmlFor="conPassword">Confirm password</label>
                        <input className="login-input-field"
                            placeholder="Confirm password"
                            name="conPassword"
                            id="conPassword"
                            type="password"
                            onChange={(e) => {
                                changeHandler(e)
                                confirmPassword(e)
                            }}
                        />
                        <hr className="input-line" />
                    </div>
                    <div className="error-handler">{errMsg}</div>
                    <button className="login-button" disabled={loading} onClick={registerHandler} >
                        Sign Up
                    </button>
                    <div className="underbutton-link">
                        <span>Already have an account?<a href="/login"> Log In!</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
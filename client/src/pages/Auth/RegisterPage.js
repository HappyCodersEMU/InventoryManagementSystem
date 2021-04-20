import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook"
import {useMessage} from "../../hooks/message.hook"

export const RegisterPage = () => {

    const { loading, request, message, clearMessage } = useHttp()
    const [form, setForm] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        conPassword: ''
    })

    const alertMessage = useMessage()

    useEffect(() => {
        if (message) {
            alertMessage(message, document.querySelector('.errorHandler'))
        }
        clearMessage()
    }, [message, alertMessage, clearMessage])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
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
                            <label className="login-input-label" htmlFor="name">name</label>
                            <input className="login-input-field"
                                   placeholder="Enter name"
                                   id="name"
                                   name="name"
                                   onChange={changeHandler}
                            />
                        </div>
                        <div className="login-input-group">
                            <label className="login-input-label" htmlFor="surname">surname</label>
                            <input className="login-input-field"
                                   placeholder="Enter surname"
                                   name="surname"
                                   id="surname"
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
                            <label className="login-input-label" htmlFor="conPassword">confirm password</label>
                            <input className="login-input-field"
                                   placeholder="Confirm password"
                                   name="conPassword"
                                   id="conPassword"
                                   type="password"
                                   onChange={changeHandler}
                            />
                        </div>
                        <div className="errorHandler"></div>
                        <div className="login-input-group">
                            <button className="login-button" disabled={loading} onClick={registerHandler} >
                                Sing Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
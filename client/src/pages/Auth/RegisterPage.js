import React, {useState} from 'react'

export const RegisterPage = () => {

    const [form, setForm] = useState({
        email: '',
        name: '',
        surname: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const url = 'api/auth/register'
            const method = 'POST'
            const body = JSON.stringify({...form})
            const headers = {}
            headers['content-type'] = 'application/json'

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
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
                            <label className="login-input-label" for="email">e-mail</label>
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
                            />
                        </div>
                        <div className="login-input-group">
                            <button className="login-button" onClick={registerHandler} >
                                Sing Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
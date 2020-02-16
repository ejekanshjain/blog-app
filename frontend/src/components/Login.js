import React, { useRef, useState, useEffect } from 'react'

import { apiKey, baseUrl } from '../config'

const Login = ({ userState, setUserState }) => {
    const [error, setError] = useState({})
    useEffect(() => {
        setError({
            message: ''
        })
    }, [])
    const emailRef = useRef()
    const passwordRef = useRef()
    const submitHandle = e => {
        e.preventDefault()
        fetch(`${baseUrl}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status !== 200) {
                    passwordRef.current.value = ''
                    setError({
                        message: json.message
                    })
                } else {
                    setError({
                        message: ''
                    })
                    setUserState({
                        isLoggedIn: true,
                        user: json.results,
                        token: json.token
                    })
                }
            })
            .catch(err => alert('Internal Server Error'))
    }
    if (userState.isLoggedIn) {
        return (
            <div>LOL</div>
        )
    } else {
        return (
            <div className="container">
                <div className="row">
                    <form className="col-sm-12" onSubmit={submitHandle}>
                        <div className="row">
                            <div className="col-sm-6">
                                <span>{error.message}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Email</label>
                                <input type="text" ref={emailRef} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Password</label>
                                <input type="password" ref={passwordRef} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <button>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import Home from './components/Home'

const App = () => {
    const [userState, setUserState] = useState({})
    useEffect(() => {
        setUserState({
            isLoggedIn: false,
            user: {},
            token: ''
        })
    }, [])
    console.log(userState)
    if (userState.isLoggedIn) {
        return (
            <div className="container-fluid">
                <Home userState={userState} setUserState={setUserState} />
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <Login userState={userState} setUserState={setUserState} />
            </div>
        )
    }
}

export default App
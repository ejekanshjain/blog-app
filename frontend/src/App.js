import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import Home from './components/Home'

const App = () => {
    const [stateObj, setStateObj] = useState({})
    useEffect(() => {
        setStateObj({
            isLoggedIn: false,
            user: {},
            token: ''
        })
    }, [])
    console.log(stateObj)
    // TODO React Router
    if (stateObj.isLoggedIn) {
        return (
            <div className="container-fluid">
                <Home stateObj={stateObj} setStateObj={setStateObj} />
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <Login stateObj={stateObj} setStateObj={setStateObj} />
            </div>
        )
    }
}

export default App
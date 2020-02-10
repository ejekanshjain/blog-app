import React, { useState, useEffect } from 'react'

import Login from './components/Login'

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
                Hello {stateObj.user.name}!
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
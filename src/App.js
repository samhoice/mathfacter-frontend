import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import UserLogin from './pages/UserLogin'
import MathFact from './pages/MathFact'
import TextFact from './pages/TextFact'
import SetupPage from './pages/SetupPage'

import './App.css'

import MainHeader from './components/MainHeader'
import StatusSpace from './components/StatusSpace'

import { api_reconnect,
    api_get_user_info } from './api/index'


function App() {

    const [fact, setFact] = useState({
        // TODO: Probably move this out of fact state
        math_card: false,
    })

    const [networkState, setNetwork] = useState({
        username: '',
        password: '',
        loggedIn: false,
        error: '',
    })

    const onSubmitLogin = (u, p) => {
        setNetwork({
            ...networkState,
            username: u,
            password: p,
            loggedIn: false,
            error: ''
        })
    }


    // Reconnect effect
    useEffect(() => {
        // check state
        if(!networkState.error && !networkState.loggedIn){
            api_get_user_info()
            .then((r) => {
                setNetwork({
                    ...networkState, 
                    loggedIn: true,
                    username: r.data.username,
                    error: ''
                })
            }).catch((e) => {
                setNetwork({
                    ...networkState,
                    loggedIn: false,
                    error: e
                })
            })
        } else if(networkState.error && 
                networkState.error.response.status === 403 &&
                networkState.username && 
                !networkState.loggedIn){
            // API request
            
            api_reconnect(
                networkState.username,
                networkState.password
            )
            .then(() => {
                setNetwork({
                    ...networkState, loggedIn: true, error: ''})
                
            })
            .catch((e) => {
                setNetwork({
                    ...networkState,
                    loggedIn: false,
                    error: e})
            })
        }
    }, [networkState])
    

    var statusSpace = ( <StatusSpace
            user={ networkState.username }
            error={ networkState.error }
            score={ 3 }
        />
    )

    var linkSpace= (
        <nav>
            <ul>
                <Link className="App-link" to="/">
                    <li>Math Fact</li>
                </Link>
                <Link className="App-link" to="/fact">
                    <li>Flash Card</li>
                </Link>
                <Link className="App-link" to="/setup">
                    <li>Setup</li>
                </Link>
                <Link className="App-link" to="/login">
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    )

    return (
        <div>
        <Router>
            <MainHeader 
                links={ linkSpace }
                status={ statusSpace } />
            <Switch>
                <Route exact path="/">
                    <MathFact 
                        loggedIn={ networkState.loggedIn }
                    />
                </Route>
                <Route path="/fact">
                    <TextFact
                        loggedIn={ networkState.loggedIn }
                    />
                </Route>
                <Route path="/setup">
                    <SetupPage
                        loggedIn={ networkState.loggedIn }
                        onSubmit={ onSubmitLogin }
                    />
                </Route>
                <Route path="/login">
                    { networkState.loggedIn ? 
                        <Redirect to="/fact" /> :
                        <UserLogin 
                            onSubmit={ onSubmitLogin }
                        />
                    }
                </Route>
            </Switch>
        </Router>
        </div>
    )
}
        

export default App

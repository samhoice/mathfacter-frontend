import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import UserLogin from './pages/UserLogin'
import MathFact from './pages/MathFact'

import './App.css'
import Cookies from 'js-cookie'

import MainHeader from './components/MainHeader'

const axios = require("axios")

const StatusSpace = props => {
    var error_string = props.error ? "" + props.error : ''

    return (
        <div className="App-status-bar">
            <p>{ props.user || "not logged in" } | score: { props.score } <br/>{ error_string }</p>
        </div>
    )
}

function App() {

    const [fact, setFact] = useState({
        left: 0,
        right: 0,
        op: '+',
        result: 0,
        answer: '?',
        next: true,
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

    const onSubmitAnswer = answer => {
        if(answer != fact.result) {
            answer = '?'
        }
        
        setFact({
            ...fact,
            answer: answer,
        })
    }

    const onNextProblem = () => {
        setFact({
            ...fact,
            next: true,
        })
    }

    useEffect(() => {
        // check state
        if(!networkState.error && !networkState.loggedIn){
            // API request
            var csrftoken = Cookies.get('csrftoken')
            axios({
                method: 'post',
                url: 'http://localhost/api-auth/login/',
                headers: {'X-CSRFToken': csrftoken},
                data: {
                    username: networkState.username,
                    password: networkState.password,
                },
                withCredentials: true,
            }).then(() => {
                setNetwork({...networkState, loggedIn: true})
            })
            .catch((e) => {
                setNetwork({...networkState, loggedIn: false, error: e})
            })
        }
        if(networkState.loggedIn && fact.next) {
            axios({
                method: 'get',
                url: 'http://localhost/problems',
                withCredentials: true,
            }).then((r) => {
                console.log(r)
                setFact({
                    ...fact,
                    left: r.data.calculation.left_hand, 
                    right: r.data.calculation.right_hand, 
                    op: r.data.calculation.operation,
                    result: r.data.calculation.result,
                    answer: '?',

                    next: false,
                })
    
            }).catch((e) => {
                console.log(e)
            })
        }
        // not sure if fact should be here or not
    }, [fact, networkState])

    var statusSpace = ( <StatusSpace
                user={ networkState.username }
                error={ networkState.error }
                score={ 3 }
            />
    )

    var linkSpace= (
                <nav>
                    <ul>
                        <li><Link className="App-link" to="/main">Fact</Link></li>
                        <li><Link className="App-link" to="/login">Login</Link></li>
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
                <Route path="/main">
                    <MathFact 
                        fact={fact}
                        onSubmitAnswer={ onSubmitAnswer }
                        onNext={ onNextProblem }
                    />
                </Route>
                <Route path="/login">
                    <UserLogin 
                        onSubmit={ onSubmitLogin }
                    />
                </Route>
            </Switch>
        </Router>
        </div>
    )
}
        

export default App

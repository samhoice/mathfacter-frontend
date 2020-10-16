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

import './App.css'
import Cookies from 'js-cookie'

import MainHeader from './components/MainHeader'
import StatusSpace from './components/StatusSpace'

import { api_reconnect,
    api_get_problem,
    api_save_answer,
    api_get_text_card } from './api/index'

const axios = require("axios")


function App() {

    const [fact, setFact] = useState({
        problem_id: 0,
        left: 0,
        right: 0,
        op: '+',
        result: 0,
        answer: '?',
        next: true,
        correct: false,

        // TODO: Probably move this out of fact state
        math_card: false,
        front_text: '',
        back_text: '',
        category: '',
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
        setFact({
            ...fact,
            check: true,
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
            api_reconnect(
                networkState.username,
                networkState.password
            )
            .then(() => {
                setNetwork({
                    ...networkState, loggedIn: true})
                
            })
            .catch((e) => {
                setNetwork({
                    ...networkState,
                    loggedIn: false,
                    error: e})
            })
        }
        if(networkState.loggedIn && fact.check) {
            api_save_answer(fact.problem_id, fact.answer)
            .then((r) => {
                setFact({
                    ...fact,
                    answered: r.data.answered,
                    answer: r.data.value,
                    correct: r.data.correct,
                    check: false,
                    next: false,
                })
            }).catch((e) => {
                console.log(e)
            })
        }
        if(fact.math_card && networkState.loggedIn && fact.next) {
            api_get_problem()
            .then((r) => {
                setFact({
                    ...fact,
                    problem_id: r.data.pk,
                    left: r.data.calculation.left_hand, 
                    right: r.data.calculation.right_hand, 
                    op: r.data.calculation.operation,
                    result: r.data.calculation.result,
                    correct: r.data.calculation.correct,
                    answer: '?',
                    answered: false,
    
                    check: false,
                    next: false,
                })
            }).catch((e) => {
                console.log(e)
            })
        }
        else if(!fact.math_card 
            && networkState.loggedIn 
            && fact.next) {
            api_get_text_card()
            .then((r) => {
                setFact({
                    ...fact,
                    problem_id: r.data.pk,
                    next: false,
                    front_text: r.data.front_text,
                    back_text: r.data.back_text,
                    category: r.data.category,
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
                <Link className="App-link" to="/main">
                    <li>Fact</li>
                </Link>
                <Link className="App-link" to="/main">
                    <li>Quiz</li>
                </Link>
                <Link className="App-link" to="/fact">
                    <li>Flash Card</li>
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
                <Route path="/main">
                    <MathFact 
                        fact={fact}
                        onSubmitAnswer={ onSubmitAnswer }
                        onNext={ onNextProblem }
                    />
                </Route>
                <Route path="/fact">
                    <TextFact
                        front_text={ fact.front_text }
                        back_text={ fact.back_text }
                        category={ fact.category }
                        onNext={ onNextProblem }
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

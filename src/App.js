import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import UserLogin from './pages/UserLogin'

import './App.css'
import Cookies from 'js-cookie'

import MainHeader from './components/MainHeader'

const axios = require("axios")

const NavigationSpace = props => {
    var error_string = props.error ? "error: " + props.error : ''

    return (<p>Welcome: { props.user } your score: { props.score } { error_string }</p>)
}
const ProblemSpace = props => {

    return (<p>{ props.left } { props.operator } { props.right } = </p>)

}

function App() {

    const [fact, setFact] = useState({
        dirty: true,
        left: 0,
        right:0,
        op: '+',
        next: false,
    })

    const initialNetwork = {
        username: '',
        password: '',
        loggedIn: false,
        error: '',
    }

    const [networkState, setNetwork] = useState(initialNetwork)

    const onSubmitLogin = (u, p) => {
        setNetwork({...networkState, username: u, password: p, loggedIn: false, error: ''})
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
        if(networkState.loggedIn && fact.dirty) {
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
                    dirty: false,
                })
    
            }).catch((e) => {
                console.log(e)
            })
        }
        // not sure if fact should be here or not
    }, [fact, networkState])

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/main">Fact</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            <Switch>
                <Route path="/main">
                    <MathFact 
                        networkState={networkState}
                        fact={fact}
                    />
                </Route>
                <Route path="/login">
                    <UserLogin 
                        onSubmit={onSubmitLogin}
                    />
                </Route>
            </Switch>
            </div>
        </Router>
    )
}
        

function MathFact(props) {
    return (
        <div className="App">
            <MainHeader />
            <NavigationSpace
                user={ props.networkState.username }
                error={ props.networkState.error }
                score={ 3 }
            />
            <ProblemSpace 
                left={ props.fact.left }
                operator={ props.fact.op }
                right={ props.fact.right }
            />
        </div>
    )
}

export default App

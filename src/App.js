import React, { useState, useEffect } from 'react'
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
        if(networkState.loggedIn) {
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
                op: r.data.calculation.operation
            })

        }).catch((e) => {
            console.log(e)
        })
        }
    }, [networkState])

    return (
        <div className="App">
            <MainHeader />
            <NavigationSpace
                user={ networkState.username }
                error={ networkState.error }
                score={ 3 }
            />
            <ProblemSpace 
                left={ fact.left }
                operator={ fact.op }
                right={ fact.right }
            />
        </div>
    )
}

export default App

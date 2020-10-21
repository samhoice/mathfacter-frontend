import React, { useState } from 'react'

import SetupFact from '../components/SetupFact'
import SetupMath from '../components/SetupMath'

const SetupPage = (props) => {
    const [state, setState] = useState({
        showMath: true,
    })

    const onToggleMath = (e) => { 
        setState({...state, showMath: !state.showMath})
    }

    const onSubmit = (e) => { 
        e.preventDefault()
        props.onSubmit(state.username, state.password) 
    }


    return (
        <div className="App-container">
            <div className="card-container">
            <div className="outer-card">
            <div className="">
            <form onSubmit={ onSubmit }>
                <label>
                    Math:
                <input 
                    name='Math' 
                    type='checkbox' 
                    value={state.username} 
                    onChange={ onToggleMath }
                />
                <br/>
                <div>
                    { state.showMath ? 
                        <SetupMath /> : <SetupFact /> }
                </div>
                </label>
                <input name='submit' type='submit' value="Submit" />
            </form>
            </div>
            </div>
            </div>
            <div className="answer-continer">
            </div>
        </div>
    )
}

export default SetupPage

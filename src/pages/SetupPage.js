import React, { useState } from 'react'

const SetupPage = (props) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    })

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
                    onChange={ (e)=>setState({...state, username: e.target.value}) }
                />
                <br/>
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

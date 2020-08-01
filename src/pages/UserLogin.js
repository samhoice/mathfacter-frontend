import React, { useState } from 'react'

const UserLogin = (props) => {
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
                    Username:
                <input 
                    name='username' 
                    type='text' 
                    value={state.username} 
                    onChange={ (e)=>setState({...state, username: e.target.value}) }
                />
                <br/>
                </label>
                <label>
                    Password:
                <input name='password' 
                    type='password' 
                    value={state.password} 
                    onChange={ (e)=>setState({...state, password: e.target.value}) }
                />
                </label>
                <br />
                <input name='submit' type='submit' />
            </form>
            </div>
            </div>
            </div>
            <div className="answer-continer">
            </div>
        </div>
    )
}

export default UserLogin

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
            <div className="setup-container">
            <form onSubmit={ onSubmit }>
                <label for='username'>
                    Username:
                </label>
                <input 
                    name='username' 
                    type='text' 
                    value={state.username} 
                    onChange={ (e)=>setState({...state, username: e.target.value}) }
                />

                <label for='password'>
                    Password:
                </label>
                <input name='password' 
                    type='password' 
                    value={state.password} 
                    onChange={ (e)=>setState({...state, password: e.target.value}) }
                />
                <br />
                <input name='submit' type='submit' />
            </form>
            </div>
        </div>
    )
}

export default UserLogin

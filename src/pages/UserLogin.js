import React, { useState, useEffect } from 'react'

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
        <div>
            <h1>Login</h1>
            <form onSubmit={ onSubmit }>
                <label>
                    Username:
                <input 
                    name='username' 
                    type='text' 
                    value={state.username} 
                    onChange={ (e)=>setState({...state, username: e.target.value}) }/>
                </label>
                <label>
                    Password:
                <input name='password' 
                    type='password' 
                    value={state.password} 
                    onChange={ (e)=>setState({...state, password: e.target.value}) }/>
                </label>
                <input name='submit' type='submit' />
            </form>
        </div>
    )
}

export default UserLogin

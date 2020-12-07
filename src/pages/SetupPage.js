import React, { useState, useEffect } from 'react'

import SetupFact from '../components/SetupFact'
import SetupMath from '../components/SetupMath'

import { api_get_categories } from '../api/index'

const SetupPage = (props) => {
    const [state, setState] = useState({
        showMath: false,
        categories: [{"Uncategorized": 0}]
    })

    const [mathFact, setMathFact] = useState({
        left_side: 0,
        right_side: 0,
        op: '+',
    })

    useEffect(() => {
        if(props.loggedIn) {
            api_get_categories().then((res) => {
                setState({
                    ...state, 
                    categories: res.data
                })
            })
        }
    }, [props.loggedIn])

    const onToggleMath = (e) => { 
        setState({...state, showMath: !state.showMath})
    }

    const onSubmit = (e) => { 
        e.preventDefault()
    }


    return (
        <div className="App-container">
            <div className="setup-container">
                <label for='math'>
                    Math:
                </label>
                <input 
                    name='Math' 
                    id='math'
                    type='checkbox' 
                    onChange={ onToggleMath }
                    checked={ state.showMath ? 'checked' : '' }
                />
                <br/>
                <div>
                    {
                        state.showMath ? 
                        <SetupMath /> : 
                        <SetupFact 
                            categories={ state.categories } />
                    }
                </div>
            </div>
        </div>
    )
}

export default SetupPage

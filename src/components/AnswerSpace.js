import React, { useState, useEffect } from 'react'

const AnswerSpace = props => {
    const [state, setState] = useState({
        answer: '',
    })

    const onSubmit = e => {
        e.preventDefault()
        props.onSubmit(state.answer)
    }

    var answer_input = (
        <div className="answer">
        <form onSubmit={ onSubmit }>
            <input
                name='answer-field'
                type=''
                value={ state.answer }
                onChange={ e=>setState({...state, answer: e.target.value }) }
            />
            <input
                name='submit'
                type='submit'
                value='submit'
            />
        </form>
        </div>
    )

    var continue_input = (
        <div className="answer">
            <div>Correct!</div>
            <form onSubmit={ e => {
                e.preventDefault()
                props.onNext()
                setState({...state, answer: ''})
            }}>
            <button>Next</button>
            </form>
        </div>
    )

    return props.correct ? continue_input : answer_input
}

export default AnswerSpace

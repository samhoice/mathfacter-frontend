import React, { useState } from 'react'

import TextCard from "../components/TextCard"
import TextControls from "../components/TextControls"

const TextFact = props => {

    const [state, setState] = useState({
        flip: false,
    })

    const onFlip = e => {
        e.preventDefault()
        setState({...state, flip: !state.flip })
    }

    const onNext = () => {
        setState({...state, flip: false})
        props.onNext()
    }

    return (
        <div className="App-container">
			<div className="card-container">
				<div className="outer-card">
                    <TextCard 
                        { ...props }
                        flip={ state.flip }
                    />
				</div>
			</div>
			<div className="answer-container">
				<TextControls
                    onFlip = { onFlip }
                    onNext = { onNext }
				/>
			</div>
        </div>
    )
}

export default TextFact

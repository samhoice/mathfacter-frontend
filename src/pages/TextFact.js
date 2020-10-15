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

    return (
        <div className="App-container">
			<div className="card-container">
				<div className="outer-card">
                    <TextCard 
                        flip={ state.flip }
                        front_text={'Front text'}
                        back_text={'Back text'}
                    />
				</div>
			</div>
			<div className="answer-container">
				<TextControls
                    onFlip = { onFlip}
				/>
			</div>
        </div>
    )
}

export default TextFact

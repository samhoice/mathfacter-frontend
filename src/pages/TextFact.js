import React, { useState, useEffect } from 'react'

import TextCard from "../components/TextCard"
import TextControls from "../components/TextControls"
import {api_get_text_card,
    api_get_categories } from '../api/index'

const TextFact = props => {

    const [card, setState] = useState({
        card_id: 0,
        flip: false,
        front_text: '',
        back_text: '',
        category: '',
        next: true,
    })

    // next flashcard
    useEffect(()=> {
        if(props.loggedIn 
            && card.next) {
            api_get_text_card()
            .then((r) => {
                setState({
                    ...card,
                    card_id: r.data.pk,
                    next: false,
                    front_text: r.data.front_text,
                    back_text: r.data.back_text,
                    category: r.data.category.name,
                })
            }).catch((e) => {
                console.log(e)
            })

        }

        // not sure if fact should be here or not
    }, [card, props.loggedIn])

    const onFlip = e => {
        e.preventDefault()
        setState({...card, flip: !card.flip })
    }

    const onNext = () => {
        setState({...card, flip: false, next: true})
    }

    return (
        <div className="App-container">
			<div className="card-container">
				<div className="outer-card">
                    <TextCard 
                        { ...card }
                        flip={ card.flip }
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

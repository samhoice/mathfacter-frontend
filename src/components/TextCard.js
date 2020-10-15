import React from 'react'

const TextCard = props => {

    return (
        <div className="card">
            <p>{ props.flip ? props.back_text : props.front_text }</p>
        </div>
    )
}

export default TextCard

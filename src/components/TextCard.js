import React from 'react'

const TextCard = props => {

    return (
        <div className={ props.flip ? 'card back' : 'card front' }>
            <div className="category-section">
                { props.category }
            </div>
            <div className="text-section">
                { props.flip ? props.back_text : props.front_text }
            </div>
            <div className="footer-section">
            </div>
        </div>
    )
}

export default TextCard

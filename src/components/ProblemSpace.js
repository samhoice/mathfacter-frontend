import React from 'react'

const ProblemSpace = props => {

    return (
        <div className="card">
            <div className="numerator-section">{ props.left }</div>
            <div className="operator-section">{ props.operator }</div>
            <div className="denominator-section">{ props.right }</div>
            <div className="answer-section">{ props.answer }</div>
        </div>
    )
}

export default ProblemSpace

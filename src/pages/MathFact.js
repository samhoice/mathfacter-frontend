import React from 'react'
import AnswerSpace from '../components/AnswerSpace'
import ProblemSpace from '../components/ProblemSpace'

function MathFact(props) {
    return (
        <div className="App-container">
			<div className="card-container">
				<div className="outer-card">
				<ProblemSpace 
                    left={ props.fact.left }
                    operator={ props.fact.op }
                    right={ props.fact.right }
                    answer={ props.fact.answered ? props.fact.result : "?" }
                />
				</div>
			</div>
			<div className="answer-container">
				<AnswerSpace
                    fact={ props.fact }
                    onSubmit={ props.onSubmitAnswer }
                    onNext={ props.onNext }
				/>
			</div>
        </div>
    )
}

export default MathFact

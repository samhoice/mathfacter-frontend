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
                    answer={ props.fact.answer }
                />
				</div>
			</div>
			<div className="answer-container">
				<AnswerSpace
                    onSubmit={ props.onSubmitAnswer }
                    correct={ props.fact.answer != '?' }
                    onNext={ props.onNext }
				/>
			</div>
        </div>
    )
}

export default MathFact

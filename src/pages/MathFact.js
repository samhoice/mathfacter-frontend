import React, {useState, useEffect} from 'react'
import AnswerSpace from '../components/AnswerSpace'
import ProblemSpace from '../components/ProblemSpace'
import {api_get_problem,
    api_save_answer } from '../api/index'


function MathFact(props) {
    const [fact, setFact] = useState({
        problem_id: 0,
        left: 0,
        right: 0,
        op: '+',
        result: 0,
        answer: '?',
        next: true,
        correct: false,
    })

    // check/save answer effect
    useEffect(() => {
        if(props.loggedIn && fact.check) {
            api_save_answer(fact.problem_id, fact.answer)
            .then((r) => {
                setFact({
                    ...fact,
                    answered: r.data.answered,
                    answer: r.data.value,
                    correct: r.data.correct,
                    check: false,
                    next: false,
                })
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [fact, props.loggedIn])

    // Next math problem
    useEffect(() => {
        if(props.loggedIn && fact.next) {
            api_get_problem()
            .then((r) => {
                setFact({
                    ...fact,
                    problem_id: r.data.pk,
                    left: r.data.calculation.left_hand, 
                    right: r.data.calculation.right_hand, 
                    op: r.data.calculation.operation,
                    result: r.data.calculation.result,
                    correct: r.data.calculation.correct,
                    answer: '?',
                    answered: false,
    
                    check: false,
                    next: false,
                })
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [fact, props.loggedIn])


    return (
        <div className="App-container">
			<div className="card-container">
				<div className="outer-card">
				<ProblemSpace 
                    left={ fact.left }
                    operator={ fact.op }
                    right={ fact.right }
                    answer={ fact.answered ? fact.result : "?" }
                />
				</div>
			</div>
			<div className="answer-container">
				<AnswerSpace
                    fact={ fact }
                    onSubmit={
                        (answer) => {
                            setFact({...fact, check: true, answer: answer}) 
                        } 
                    }
                    onNext={ () => {setFact({...fact, next: true})} }
				/>
			</div>
        </div>
    )
}

export default MathFact

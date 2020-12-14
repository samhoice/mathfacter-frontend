import React, { useState } from 'react'

import { api_create_math_rule } from '../api/index'

const SetupMath = props => {
    const [mathRule, setMathRule] = useState({
        left_min: 0,
        left_max: 0,
        right_min: 0,
        right_max: 0,
        op: 'add'
    })


    const onSubmit = e => {
        e.preventDefault()

        api_create_math_rule(
            mathRule.left_min, 
            mathRule.left_max,
            mathRule.right_min,
            mathRule.right_max,
            mathRule.op
        ).then(res => {
            console.log("Math rule created");
            setMathRule({...mathRule,
                left_min: 0,
                left_max: 0,
                right_min: 0,
                right_max: 0,
            })
        }).catch(err => {
            console.log("Math rule failed")
        })
    }

    const radioChange = e => {
        if(e.target.checked) {
            setMathRule({...mathRule, op: e.target.value})
        }
    }

    return (
        <div className="setup-page">
            <form onSubmit={ onSubmit }>

            <h2>Create a Math Fact Rule</h2>

            <div>
                <input 
                    type="radio" 
                    name="operation" 
                    id="add" 
                    value="add" 
                    checked={ mathRule.op==='add' ? true : false }
                    onChange={ radioChange } />
                <label for='add' className="radio__label">Add</label>
                <input 
                    type="radio" 
                    name="operation" 
                    id="sub" 
                    value="sub"
                    checked={ mathRule.op==='sub' ? true : false }
                    onChange={ radioChange } />
                <label for='sub' className="radio__label">Subtract</label>
                <input
                    type="radio"
                    name="operation" 
                    id="mul" value="mul"
                    checked={ mathRule.op==='mul' ? true : false }
                    onChange={ radioChange } />
                <label for='mul' className="radio__label">Multiply</label>
                <input 
                    type="radio" 
                    name="operation" 
                    id="div" 
                    value="div"
                    checked={ mathRule.op==='div' ? true : false }
                    onChange={ radioChange } />
                <label for='div' className="radio__label">Divide</label>
            </div>
            
            <label for='lmin'>left side min</label>
            <input 
                type='number' 
                id='lmin' 
                value={ mathRule.left_min }
                onChange={ e =>
                    setMathRule({...mathRule, left_min: parseInt(e.target.value)})
                }
            />

            <label for='lmax'>left side max</label>
            <input 
                type='number' 
                id='lmax' 
                value={ mathRule.left_max }
                onChange={ e =>
                    setMathRule({...mathRule, left_max: parseInt(e.target.value)})
                }
            />

            <label for='rmin'>right side min</label>
            <input 
                type='number' 
                id='rmin' 
                value={ mathRule.right_min }
                onChange={ e =>
                    setMathRule({...mathRule, right_min: parseInt(e.target.value)})
                }
            />

            <label for='rmax'>right side max</label>
            <input 
                type='number' 
                id='rmax' 
                value={ mathRule.right_max }
                onChange={ e =>
                    setMathRule({...mathRule, right_max: parseInt(e.target.value)})
                }
            />

            <input name='submit' type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default SetupMath

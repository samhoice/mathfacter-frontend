import React from 'react'

const SetupMath = props => {
    
    return (

        <div className="setup-page">
            <h2>Math Fact</h2>
            <label for='top'>
                left side
            </label>
            <input type='number' id='top' />
            <br />
            <label for='bottom'>
                right side
            </label>
            <input type='number' id='bottom' />
        </div>
    )
}

export default SetupMath

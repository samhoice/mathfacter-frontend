import React from 'react'

const SetupFact = props => {
    
    return (
        <div className="setup-page">
            <h2>Flash Card</h2>
            <label for='fs'>
                Front Side
                <input type='text' name='fs' />

            </label>
            <br />
            <label for='bs'>
                Back Side
                <input type='text' name='bs' />
            </label>
        </div>
    )
}

export default SetupFact

import React from 'react'

const SetupFact = props => {
    
    return (
        <div className="setup-page">
            <h2>Flash Card</h2>
            <label for='fs'>
                Front Side
            </label>
            <input type='text' id='fs' />

            <br />
            <label for='bs'>
                Back Side
            </label>
            <input type='text' id='bs' />
        </div>
    )
}

export default SetupFact

import React from 'react'

const SetupFact = props => {
    
    return (
        <div className="setup-page">
            <h2>Flash Card</h2>
            <label for='category-select'>
                Category
            </label>
            <select name="category" id="category-select">
                {
                    props.categories.map((cat) => (
                        <option value={ cat.id }>{ cat.name }</option>
                    ))
                }
            </select>

            <br />
            <label for='fs'>
                Front Side
            </label>
            <textarea name='front-side' id='fs' rows='4' cols='80' />

            <br />
            <label for='bs'>
                Back Side
            </label>
            <textarea name='back-side' id='bs' rows='4' cols='80' />
        </div>
    )
}

export default SetupFact

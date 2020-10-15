import React from 'react'

const StatusSpace = props => {
    var error_string = props.error ? "" + props.error : ''

    return (
        <div className="App-status-bar">
            <p>
                { props.user || "not logged in" } | score: { props.score }
                <br/>
                { error_string }
            </p>
        </div>
    )
}

export default StatusSpace

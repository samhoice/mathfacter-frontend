import React from 'react'

const MainHeader = props => {
    return (
        <div className="App-header">
            <div className="App-brand">
            <p>Math Fact-er</p>
            </div>
            <div className="App-link-bar">
                { props.links }
            </div>
            <div>
                { props.status }
            </div>
        </div>
    )
}

export default MainHeader

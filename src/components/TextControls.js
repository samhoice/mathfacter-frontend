import React, { useState } from 'react'


const TextControls = props => {

    return (
        <div className="answer">
            <div>
                <p>Text</p>
            </div>
            <div>
                <button onClick={ 
                    (e)=>{
                        e.preventDefault()
                        props.onFlip(e) 
                    }
                }>
                    Flip
                </button>
                <button onClick={
                    (e)=> {
                        e.preventDefault()
                        props.onNext()
                    }
                }>
                    Next
                </button>
            </div>
        </div>
    )
}

export default TextControls

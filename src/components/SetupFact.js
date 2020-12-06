import React, {useState} from 'react'
import { api_create_flashcard } from '../api/index'


const SetupFact = props => {
    const [textFact, setTextFact] = useState({
        front_text: '',
        back_text: '',
        category: ''
    })

    
    const onSubmit = e => {
        e.preventDefault()

        api_create_flashcard(textFact.front_text, 
            textFact.back_text,
            textFact.category
        ).then(res => {
            setTextFact({...textFact, front_text: '', back_text: '' })
        }).catch(e => {

        })
    }

    return (
        <div className="setup-page">
            <form onSubmit={ onSubmit }>
                <h2>Create a Flash Card</h2>
                <label for='category-select'>
                    Category
                </label>
                <select
                    name="category" 
                    id="category-select"
                    onChange={ e =>
                        setTextFact({...textFact, category: e.target.value})
                    }>
                    {
                        props.categories.map((cat) => (
                            <option value={ cat.name }>{ cat.name }</option>
                        ))
                    }
                </select>
    
                <br />
                <label for='fs'>
                    Front Side
                </label>
                <textarea 
                    name='front-side' 
                    id='fs' 
                    onChange={ e => 
                        setTextFact({...textFact, front_text: e.target.value})
                    }
                    rows='4' 
                    cols='80'>
                    { textFact.front_text }
                </textarea>
    
                <br />
                <label for='bs'>
                    Back Side
                </label>
                <textarea 
                    name='back-side' 
                    id='bs' 
                    onChange={ e => 
                        setTextFact({...textFact, back_text: e.target.value})
                    }
                    rows='4' 
                    cols='80' />
                <input name='submit' type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default SetupFact

import React, {useState, useEvent} from 'react'
import { api_create_flashcard } from '../api/index'


const SetupFact = props => {
    const [textFact, setTextFact] = useState({
        front_text: '',
        back_text: '',
        category: props.categories[0].name
    })

    
    const onSubmit = e => {
        e.preventDefault()

        api_create_flashcard(textFact.front_text, 
            textFact.back_text,
            textFact.category
        ).then(res => {
            console.log("Flashcard Created")
            setTextFact({...textFact, front_text: '', back_text: '' })
        }).catch(e => {
            console.log("Flashcard Failed")
        })
    }

    // create category list for select
    var options_list = props.categories.map((cat, i) => (
        <option value={ cat.name }>{ cat.name }</option>
    ))

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
                    { options_list }
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
                    cols='80'
                    value={ textFact.front_text }
                />
    
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
                    cols='80' 
                    value={ textFact.back_text }
                />
                <input name='submit' type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default SetupFact

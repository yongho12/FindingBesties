import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function Single({queObj, index, handleIndex}) {

    const {question, category, examples} = queObj; 
    const questions = useSelector(state => state.questions);
    const [last, setLast] = useState(false);

    const numQuestion = questions.length;
    
    if (index === questions.length -1) {
        setLast(true);
        console.log("index", index)
        console.log("questions.length", questions.length)
    }

    console.log("indexxxxxxx", index);
    
    const handleNextQuestion = () => {
        if (index < questions.length-1) {
            index = index + 1;
            handleIndex(index);
        }    
    }

    const submitHandler = () => {
        console.log("Submit Handler")
    }

    if (last) return null
    return (
    <>
        <fieldset>
            <legend><h2>{question}</h2></legend>
            <br />
            <div>
                { examples.map((ex, index) => (
                    <div key={`${ex.id}-${index}`}>
                        <input type="checkbox" id={index} name={ex.id} />
                        <label htmlFor={index}>{ex.choice}</label><br /> <br />
                    </div>
                ))}
            </div>
            <div>
                 <button onClick={last?submitHandler:handleNextQuestion }>{last?'Submit':'Next Question'}</button>
            </div>    
        </fieldset>
     </>
    )
}


export default Single;
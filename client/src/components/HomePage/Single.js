import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function Single({queObj, index, handleIndex}) {

    const {question, category, examples} = queObj 
    
    // const submitHandler = () => {

    // }

    const handleNextQuestion = () => {
        index = index + 1;
        handleIndex(index);
    }

    return (
        <>
        <form>
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
                    <button type="submit" onClick={handleNextQuestion}>Next Question </button>
                </div>    
           </fieldset>
        </form>
     </>
    )
}


export default Single;
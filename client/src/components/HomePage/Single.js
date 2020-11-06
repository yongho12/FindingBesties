import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function Single({question, updateAnswer}) 
{
    return (
    <>
        <fieldset>
            <legend><h2>{question.question}</h2></legend>
            <br />
            <div>
                { question.examples.map((ex, index) => (
                    <div key={`${ex.ex_id}-${index}`}>
                        <input type="radio"  id={ex.ex_id} value={ex.ex_id} onClick={updateAnswer} name={question.id} />
                        <label htmlFor={ex.ex_id}>{ex.choice}</label><br /> <br />
                    </div>
                ))}
            </div>
             
        </fieldset>
     </>
    )
}


export default Single;
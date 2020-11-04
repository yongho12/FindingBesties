import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  fetchQuestions } from "../../actions/questionActions"; 



function Question() {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);
    
    console.log("AAAA", questions);

    if (!questions.length) return null;

    return (
        <>
            <div>
                <h1>From Question Component   -----------------</h1>
                
                 {/* <ul> { questions.map((que, index) =>(
                     <li key={que.id}>{que.choice}</li>
                 ))}
                 </ul> */}
            </div>
            
        </>
    ) 
}

export default Question;
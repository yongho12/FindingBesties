import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  fetchQuestions } from "../../actions/questionActions"; 
import Single from "./Single"

function Questions() {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    
    const handleIndex = (idx) => {
        setIndex(idx);
    }

     useEffect(() => {
       
    }, []);

    if (!questions.length || index >= questions.length) return null;
    
    return (
        <>
            <div>
                <h1>Questionnaire</h1>
                <Single queObj= { questions[index] } index={index} handleIndex={handleIndex}/>
            </div>     
        </>
    ) 
}

export default Questions;
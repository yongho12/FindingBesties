import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  fetchQuestions } from "../../actions/questionActions"; 
import {  setAnswers } from "../../actions/authActions"; 
import Single from "./Single"

function Questions() {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);
    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    
    const [index, setIndex] = useState(0);
    const [last, setLast] = useState(false);
    const [response, setResponse] = useState()
    // const [questionId, setQuesitonId] = useState();
    // const [choiceId, setChoiceId] = useState();
    const [answers, setAnswers] = useState([])
    
    
    console.log(user_id);
    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);
    
    const handleIndex = (idx) => {
        setIndex(idx);
    }
    
    const updateAnswer = (e) => {
        const {name, value} = e.target;
        setAnswers( previousState => [...previousState, value])
    }
    
    const handleNextQuestion = () => {
        if (index < questions.length-1) {
            handleIndex(index+1);
        }  
        else {
            setLast(true);
        }
    }
    
    async function submitHandler()  {
        const response = await fetchWithCSRF(`/api/home/answers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               answers,
               user_id
            }),
        })

        if (response.ok) {
            console.log("resp")            

        }
    }


  
    if (!questions.length) return null;
    
    return (
        <>
            <div>
                <h1>Questionnaire</h1>
                <Single question={questions[index]} updateAnswer={updateAnswer} />
            </div> 
            <div>
                 {/* <button onClick={handleNextQuestion}>'Next'</button>  */}
                 <button onClick={last?submitHandler:handleNextQuestion }>{last?'Submit':'Next'}</button>
            </div>      
        </>
    ) 
}

export default Questions;
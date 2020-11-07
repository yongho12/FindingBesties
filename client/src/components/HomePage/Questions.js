import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  fetchQuestions } from "../../actions/questionActions"; 
import {  setAnswers } from "../../actions/authActions"; 
import Single from "./Single"
import Match from "./Match"

function Questions() {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);
    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    
    const [index, setIndex] = useState(0);
    const [last, setLast] = useState(false);
    const [queSubmitted, setQueSubmitted] = useState(false);
    const [response, setResponse] = useState()
    // const [questionId, setQuesitonId] = useState();
    // const [choiceId, setChoiceId] = useState();
    const [answers, setAnswers] = useState([])
    const [recommends, setRecommends] = useState([]);
    const [top_bottom_3, setTop_bottom_3] = useState([]);
    let match = {};
   
    
    
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
        setQueSubmitted(true);
        const response = await fetchWithCSRF(`/api/home/answers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               answers,
               user_id
            }),
        })

        if (response.ok) {
            match= await response.json();
            // { top_bottom_3, recommends } = match
            console.log("recommends:::",match.recommends)
            console.log("top_bottom_3::::", match.top_bottom_3)
            setRecommends(match.recommends);
            setTop_bottom_3(match.top_bottom_3);
    

            console.log(match)
            console.log("resp")
            // console.log("top_bottom_3", AAAA)
            // console.log("top_bottom_3",top_bottom_3);
            // console.log("recommends::::", recommends);
                       
        }
    }


  
    if (!questions.length) return null;
    
    return (
        <>  
            { !queSubmitted && 
            <div><Single question={questions[index]} updateAnswer={updateAnswer} /></div> }

            { 
            <div>
                <button  onClick={last?submitHandler:handleNextQuestion }>{last?'Submit':'Next'}</button>
            </div>
            }
            {/* Results */}
            <div>
                <Match recommends={recommends} top_bottom_3={top_bottom_3}  />
            </div>
        </>
    ) 
}

export default Questions;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  fetchQuestions } from "../../actions/questionActions"; 
import {  setAnswers } from "../../actions/authActions"; 
import Single from "./Single"
import Match from "./Match"
import NavBar from "../NavBar/NavBar"

function Questions() {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);
    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    
    const [index, setIndex] = useState(0);
    const [last, setLast] = useState(false);
    const [queSubmitted, setQueSubmitted] = useState(false);
    const [response, setResponse] = useState(false)
    const [answers, setAnswers] = useState([])
    const [recommends, setRecommends] = useState([]);
    const [top_bottom_list, setTop_bottom_list] = useState([]);
    const [top_bottom_three, setTop_bottom_three] = useState({});
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [third, setThird] = useState([]);
    const [last_third, setLastThird] = useState([]);
    const [last_second, setLastSecond] = useState([]);
    const [last_first, setLastFirst] = useState([]);
   
    
    
    console.log(user_id);
    
    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);
    
    const handleIndex = (idx) => {
        setIndex(idx);
    }
    
    const updateAnswer = (e) => {
        const { value } = e.target;
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
            const match= await response.json();
            setResponse(true);

            setRecommends(match.recommends);
            setTop_bottom_list(match.top_bottom_3);
            setTop_bottom_three(match.top_bottom_three);
            setFirst(match.first);
            setSecond(match.second);
            setThird(match.third);
            setLastThird(match.last_third)
            setLastSecond(match.last_second);
            setLastFirst(match.last_first);
                
            console.log("resp")
                       
        }
    }


  
    if (!questions.length) return null;
    
    return (
        <>  
         <NavBar/>
            { !queSubmitted && 
            <div>
                <div><Single question={questions[index]} updateAnswer={updateAnswer} /></div> 
                <div><button  onClick={last?submitHandler:handleNextQuestion }>{last?'Submit':'Next'}</button></div>
            </div>
            }
            {/* Results */}
            { response &&
            <div>
                 <Match first={first} second={second} third={third} last_third={last_third} last_second={last_second} last_first={last_first} top_bottom_three={top_bottom_three} />
            </div>
            }
        </>
    ) 
}

export default Questions;
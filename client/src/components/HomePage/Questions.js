import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  fetchQuestions } from "../../actions/questionActions"; 
import Match from "./Match"


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
    const [top_bottom_three, setTop_bottom_three] = useState({});
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [third, setThird] = useState([]);
    const [last_third, setLastThird] = useState([]);
    const [last_second, setLastSecond] = useState([]);
    const [last_first, setLastFirst] = useState([]);
    const [friends, setFriends] = useState({});
    const [checked, setChecked] = useState(false);
    const [item, setItem] = useState();
   
    

    
    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);
    
    const handleIndex = (idx) => {
        setIndex(idx);
    }
    
    const updateAnswer = (e) => {
        setItem(e.target.value)
        setChecked(true);
      
    }
    
    // let progress;
    const handleNextQuestion = () => {
        if (checked) {
            if (index < questions.length-1) {
                handleIndex(index+1);
                // progress = (((index)/questions.length)*100).toString()+'%'
            }  
            else {
                // progress = '100%'
                setLast(true);
            }
            setAnswers( previousState => [...previousState, item])
            setChecked(false);
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
            setTop_bottom_three(match.top_bottom_three);
            setFirst(match.first);
            setSecond(match.second);
            setThird(match.third);
            setLastThird(match.last_third)
            setLastSecond(match.last_second);
            setLastFirst(match.last_first);
            setFriends(match.friends);
            
                       
        }
    }
  
    let progress = (((index)/questions.length)*100).toString()+'%'
    const divStyle = {
        width: progress
    };

  
    if (!questions.length) return null;
    
    return (
        <>  
            { !queSubmitted && 
            <div>
                 <div className="questions__container">
                    <fieldset>
                        <h2>{questions[index].question}</h2>
                        <br />
                        <div>
                            { questions[index].examples.map((ex, index) => (
                                <h3 key={`${ex.ex_id}-${index}`}>
                                    <input type="radio" id={ex.ex_id} value={ex.ex_id}  onClick={updateAnswer} name='radio' /> 
                                    <label  htmlFor={ex.ex_id}>{ex.choice}</label><br /> <br />
                                </h3>
                            ))}
                        </div> 
                    </fieldset>
                    <div className="status_bar">
                        { last?<div className="status_value" style={{width:'100%'}}></div>:
                            <div className="status_value" style={divStyle}></div>
                         }
                    </div>
                </div>
                <div><button  onClick={last?submitHandler:handleNextQuestion }>{last?'Submit':'Next'}</button></div>
                <br /> <br /><br />
            </div>
            }
            {/* Results */}
            { response &&
            <div>
                 <Match first={first} second={second} third={third} last_third={last_third} last_second={last_second} 
                 last_first={last_first} top_bottom_three={top_bottom_three} friends={friends}/>
            </div>
            }
        </>
    ) 
}

export default Questions;
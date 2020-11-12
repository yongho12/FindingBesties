import React, { useState} from 'react';
import { useSelector } from 'react-redux'
function Match({first, second, third, last_third, last_second, last_first,top_bottom_three, friends })
{   
    const [opposite, setOpposite] = useState(false)
    const requestor = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
  
   

    // console.log('[]::::::',recommends[top_bottom_list[0]].name);
    console.log("top_bottom_three in Match::::",top_bottom_three )

    function oppositeHandler() {
        console.log('opposite::', opposite)
        setOpposite(true);
    }

    const connectHandler = async (e) => {
        console.log("e.target.value",e.target.value)
        
        const recipient = e.target.value
        const status = "asking"
        const response = await fetchWithCSRF(`/api/home/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            requestor,
            recipient,
            status
            }),
        })

        if (response.ok) {
            console.log("connect working")
        }

        
    }
// https://www.w3schools.com/howto/howto_js_alert.asp
    function alertSucess(e) {
        console.log(e.target.parentElement)

        
    }

    return (
        <>
         <div className="match__container">

            { (first.length) &&
            <div className="match__similar">
                <h2> The friends are recommended based on your answers to the questionnaire.
                     <br />You guys have in the commons. 
                     <br />
                     However, people attractive to opposite. <br />click below if you want to find out. 
                     <button onClick={oppositeHandler}>opposite</button>
                </h2>
               
                <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo_1" />
                    {first.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>  
                    {/* <div class="alert success">
                        <span class="closebtn" onclick={alertSucess}>&times;</span>  
                        <strong>Success!</strong> Indicates a successful or positive action.
                    </div> */}
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {second.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button value={person.id} onClick={connectHandler}>be Bestie!</button> }</div> 
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {third.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button value={person.id} onClick={connectHandler}>be Bestie!</button> }</div> 
                    </div>))}
                </div>
                
            </div>
            // {/* <h1> However you might attract friends opposite you.</h1>
            //     <button>Click here </button> */}
            }

            { opposite &&
             <div className="match__opposite">
                <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {last_first.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {last_second.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                   <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {last_third.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                   <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>
                    </div>))}
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default Match;
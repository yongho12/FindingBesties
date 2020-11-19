import React, { useState} from 'react';
import { useSelector } from 'react-redux'
function Match({first, second, third, last_third, last_second, last_first,top_bottom_three, friends })
{   
    const [opposite, setOpposite] = useState(false);
    const requestor = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
  
   

    
    function oppositeHandler() {

        setOpposite(true);
    }

    const connectHandler = async (e) => {

        let bestiebutton = document.getElementById(e.target.id);
        const recipient = e.target.value
        const status = "asking"
        const match_rate = top_bottom_three[recipient]
        
        const response = await fetchWithCSRF(`/api/home/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                requestor,
                recipient,
                match_rate, 
                status
            }),
        })
        
        if (response.ok) {
            bestiebutton.innerHTML="Just Asked!"
            bestiebutton.disabled = true
        }
        
    }


    return (
        <>
         <div className="match__container">

            { (first.length) &&
            <div className="match__similar">
                <div>
                <h2> Besties are recommended based on your answers to the questionnaire.
                     <br />You guys have stuff in common. 
                     <br />
                     However, opposites also attract! <br />click below if you want to find out. <br />
                </h2>
                     <button onClick={oppositeHandler} >Opposite</button>
                </div>
                <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo_1" />
                    {first.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button id="bestieButton_1" value={person.id}  onClick={connectHandler}>be Bestie!</button> }</div> 
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {second.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button id="bestieButton_2" value={person.id}  onClick={connectHandler}>be Bestie!</button> }</div> 
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {third.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button id="bestieButton_3" value={person.id} onClick={connectHandler}>be Bestie!</button> }</div> 
                    </div>))}
                </div>
                
            </div>
            }

            { opposite &&
             <div className="match__opposite">
                <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {last_first.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button id="bestieButton_4" value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {last_second.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                   <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button id="bestieButton_5" value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>
                    </div>))}
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="match_photo" />
                    {last_third.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                   <div> {top_bottom_three[person.id]}% Match</div>
                    <div>{ friends[person.id] ? "We are already Bestie!" : 
                        <button id="bestieButton_6" value={person.id} onClick={connectHandler}>be Bestie!</button> }</div>
                    </div>))}
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default Match;
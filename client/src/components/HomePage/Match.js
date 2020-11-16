import React, { useState} from 'react';
import { useSelector } from 'react-redux'
function Match({first, second, third, last_third, last_second, last_first,top_bottom_three, friends })
{   
    const [opposite, setOpposite] = useState(false);
    const requestor = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
  
   

    // console.log('[]::::::',recommends[top_bottom_list[0]].name);
    // console.log("top_bottom_three in Match::::",top_bottom_three )

    function oppositeHandler() {
        console.log('opposite::', opposite)
        setOpposite(true);
    }

    const connectHandler = async (e) => {

        // trying to hide the button
        console.log("e.target.value",e.target.value)
        console.log("e.target.id", e.target.id)
        let bestiebutton = document.getElementById(e.target.id);
        console.log("bestiebutton:::", bestiebutton)
        // bestiebutton.disabled = true
        // bestiebutton.color="#fe918d"
        // bestID.style.disply="block"
        // bestiebutton.style.disply="none"
        
        
        
        const recipient = e.target.value
        const status = "asking"
        const match_rate = top_bottom_three[recipient]
        console.log(match_rate)
        
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
            // setConnect(true);
            console.log("recipient", recipient)
            console.log("connect working")
            bestiebutton.innerHTML="Just Asked!"
            bestiebutton.disabled = true
        }
        
    }


    return (
        <>
         <div className="match__container">

            { (first.length) &&
            <div className="match__similar">
                <h2> The friends are recommended based on your answers to the questionnaire.
                     <br />You guys have in the commons. 
                     <br />
                     However, people attractive to opposite. <br />click below if you want to find out. <br />
                     <button onClick={oppositeHandler}>Different</button>
                </h2>
               
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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Profile() {

    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [ beingAsked, setBeingAsked ] = useState([]);
    const [ askId, setAskId ] = useState(0);
    const [ askingStatus, setAskingStatus ] = useState([]);
    const [ askingList, setAskingList ] = useState([])
    let status_msg = "";
  

    useEffect(() => {
        async function asked() {
            const response = await fetch(`/api/home/beingasked/${user_id}`)
            const data = await response.json();
            setBeingAsked(data.beingAsked);
        }
        asked(); 
    }, [askId]);

    useEffect(() => {
        async function askingStatus() {
            const response = await fetch(`/api/home/askingstatus/${user_id}`)
            const data = await response.json();
            setAskingStatus(data.askingStatus);
            setAskingList(data.askingList);
            console.log("askingStatus", data.askingStatus);
            console.log("askingList", data.askingList)
        }
        askingStatus(); 
    }, []);

    

    
    async function acceptHandle(e) {
        const id = e.target.value;
        status_msg = "friend"
        const response = await fetchWithCSRF(`/api/home/yesforask/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status_msg,
                user_id,
            }),
        })

         if(response.ok) {
            setAskId(id)
        }
       
    }

    async function rejectHandle(e) {
        const id = e.target.value;
        status_msg = "reject"
        const response = await fetchWithCSRF(`/api/home/noforask/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status_msg,
                user_id,
            }),
        })

         if(response.ok) {
            setAskId(id)
        }
       
    }
// {1: 0, 2: 0, 3: 50, 4: 25, 5: 25, 6: 25}
// [{…}, {…}, {…}, {…}, {…}]

    return (
    <>
        <h1>My Page</h1>
        <div className="profile__container--left">
            <h2>You've asked</h2>
             {askingStatus.map((asking, index)=>(<>
                <div key={`${asking.id}-${index}`} >
                <div>{askingList[asking.recipient]}</div>
                <div>{asking.status}</div> 
                </div> 
               </> ))}
        </div>
        <div className="profile__container--right">
            <h2>Besties request</h2>
            {beingAsked.map((asked, index)=>(<>
            <h3 key={`${asked.id}-${index}`} >
                {asked.requestor_name} wants to be your bestie. 
                <br /> Do you want to accept it?</h3> 
                <div>
                    <button value={asked.id} onClick={acceptHandle}>Accept</button>
                    <button value={asked.id} onClick={rejectHandle}>Reject</button>
                </div>
               </> ))}
        </div>           
    </>
    )
}


export default Profile;
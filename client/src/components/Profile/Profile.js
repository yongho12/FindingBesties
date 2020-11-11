import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Profile() {

    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [beingAsked, setBeingAsked] = useState([])
    const [askId, setAskId] = useState(0)
    let status_msg = "";
  

    useEffect(() => {
        async function asked() {
            const response = await fetch(`/api/home/beingasked/${user_id}`)
            const data = await response.json();
            setBeingAsked(data.beingAsked)
            console.log("data", data.beingAsked)
        }
        asked(); 
    }, [askId]);

    
    async function acceptHandle(e) {
        const id = e.target.value;
        status_msg = "bestie"
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


    return (
    <>
        <h1>Profile</h1>
        <div>
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
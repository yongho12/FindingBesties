import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Profile() {

    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [beingAsked, setBeingAsked] = useState([])
  

    useEffect(() => {
        async function asked() {
            const response = await fetch(`/api/home/beingasked/${user_id}`)
            const data = await response.json();
            setBeingAsked(data.beingAsked)
            console.log("data", data.beingAsked)
        }
        asked(); 
    }, [user_id]);

    async function acceptHandle() {
        const response = await fetchWithCSRF(`/api/home/answers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            //    answers,
            //    user_id
            }),
        })

    }

    async function rejectHandle() {
        console.log("reject Handle")
    }


    return (
    <>
        <h1>Profile</h1>
        <div>
            {beingAsked.map((asked, index)=>(<>
            <h3 key={`${asked.id}-${index}`}>
                {asked.requestor_name} wants to be your bestie. 
                <br /> Do you accept it?</h3> 
                <div>
                    <button onClick={acceptHandle}>Accept</button>
                    <button onClick={rejectHandle}>Reject</button>
                </div>
               </> ))}
        </div>           
    </>
    )
}


export default Profile;
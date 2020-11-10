import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Profile() {

    const user_id = useSelector(state => state.authReducer.id);
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


    return (
    <>
        <h1>Profile</h1>
        {/* <div>{beingAsked.map((asked, index)=>({}))}</div> */}
    </>
    )
}


export default Profile;
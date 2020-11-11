
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Friends() 
{
    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [friends, setFriends] = useState([])
    const [askId, setAskId] = useState(0)
   
    
    useEffect(() => {
        async function friendslist() {
            const response = await fetch(`/api/home/friendslist/${user_id}`)
            const data = await response.json();
            setFriends(data.friends)
            console.log("data", data.friends)
        }
        friendslist(); 
    },[]);




    return (
    <>
    <h1>My Besties</h1>
        <div>
            {friends.map((friend, index)=>(<>
            <h3 key={`${friend.id}-${index}`} >
                {friend.friend_name} </h3> 
                <div>
                    {/* <button value={friend.id} onClick={acceptHandle}>Accept</button>
                    <button value={friend.id} onClick={rejectHandle}>Reject</button> */}
                </div>
               </> ))}
        </div>    
    </>
    )
}


export default Friends;
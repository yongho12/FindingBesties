
import React, { useEffect, useState } from 'react';
import ReactDom, { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';


function Friends() 
{
    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [friends, setFriends] = useState([]);
    const [msgButton, setMsgButton] = useState(false);
    const [to_user, setTo_user] = useState(0)
   
    
    useEffect(() => {
        async function friendslist() {
            const response = await fetch(`/api/home/friendslist/${user_id}`)
            const data = await response.json();
            setFriends(data.friends)
            console.log("data", data.friends)
        }
        friendslist(); 
    },[]);

    const messageHandle = (e) => { 
        setMsgButton(true);
        setTo_user(e.target.value);
        console.log("e.target.value:::::::", e.target.value)

    }

    const messageSendHandle = async (e) => {
        e.preventDefault();
        console.log("message send e target value::::", e.target.value)
        const message = 'this is the message'
        const response = await fetchWithCSRF(`/api/home/friendsmessage/${user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               to_user,
               message
            }),
        })

    }




    return (
    <>
    <h1>My Besties List</h1>
        <div>
            {friends.map((f, index)=>(<>
             <div key={`${f.id}-${index}`} >{f.friend_name} </div>
             {/* <img className = "aaaa" src={f.friend_avatar} alt="friend photo" />    */}
             <div>{f.friend_email}</div>
             <div>{f.status}</div> 
            <div>
                <button value={f.id} onClick={messageHandle}>Message</button>
            </div>
               </> ))}
            {msgButton && <>
            <form onSubmit={messageSendHandle}>
                <label>
                    Message:
                    {/* <textarea value={} onChange={}/> */}
                </label>
                <input type="submit" value="Submit" />
            </form>

      
      
            {/* <textarea>Leave a message here</textarea>
            <button onClick={messageSendHandle}>send!</button>  */}      
            </>}
  
        </div>    
    </>
    )
}


export default Friends;
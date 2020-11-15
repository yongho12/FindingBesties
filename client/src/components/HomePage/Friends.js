
import React, { useEffect, useState } from 'react';
import ReactDom, { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Email from "https://smtpjs.com/v3/smtp.js"


function Friends() 
{
    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [ friends, setFriends ] = useState([]);
    const [ msgButton, setMsgButton ] = useState(false);
    const [ to_user, setTo_user ] = useState();
    const [ to_name, setTo_name ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ receivedMsg, setReceivedMsg] = useState([])

    useEffect(() => {
        async function friendslist() {
            const response = await fetch(`/api/home/friendslist/${user_id}`)
            const data = await response.json();
            setFriends(data.friends)
            console.log("data", data.friends)
        }
        friendslist(); 
    },[]);

    useEffect(() => {
        async function messagelist() {
            const response = await fetch(`/api/home/messagereceived/${user_id}`)
            const data = await response.json();
            setReceivedMsg(data.msgreceived)
            console.log("received mssage", data.msgreceived)
          
        }
        messagelist(); 
    },[]);


    const messageHandle = (e) => { 
        setMsgButton(true);
        setTo_user(e.target.value);
        setTo_name(e.target.name);
    }

    
    const messageChange = (e) => {
        setMessage(e.target.value)
        
    }

    
    const messageSendHandle = async (e) => {
        e.preventDefault();
        if (!to_user) return ;
        console.log("message send e target value::::", e.target.value)
        // const message = 'this is the message'
        console.log("message", message)
        const response = await fetchWithCSRF(`/api/home/friendsmessage/${user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               to_user,
               message
            }),
        })
        if (response.ok) {
            window.alert("Message has sent successfully.")
            setMessage('')
        }

    }



    return (
    <>
    <div className="friends__container">
        <div className="friend__left__container">
            <h2>My Besties</h2>
            <div className = 'friends__list__container'>
                {friends.map((f, index)=>(<div>
                <div key={`${f.id}-${index}`} >{f.friend_name} </div>
                <img className = "friends__photo" src={f.friend_avatar} alt="friend photo" />   
                <div>{f.friend_email}</div>
                <div>{f.match_rate}% Match</div>
                <div>{f.status}</div> 
                    <button value={f.friend_id} name={f.friend_name} onClick={messageHandle}>Message</button>
                </div> ))}
            </div>
        </div> 
        <div className="friends__right__container">
            { msgButton &&
            <div className="friends__right__top">
                {/* <h1>Messaging to Bestie</h1> */}
                
                <h2>Sending a message to {to_name}</h2>
                <div className="friends__right--message">
                    <input className="friends__message" value={message}  type="text" placeholder="leave a message.." onChange={messageChange}></input>
                    <button className="message--sent" onClick={messageSendHandle}>send</button>
                </div>
            </div>
            }
            <div className="friends__right__bottom">
                <h2>Received Messages</h2>
                <div>
                    {receivedMsg.map((m, index)=>(
                    <div className='friends__message--card'>
                        <h3 key={`${m.id}-${index}`} >{m.message}</h3>   
                        <br />
                        <h3>from: {m.from_user_name}  {new Date(m.created_at).toLocaleString()} </h3>
                    </div> ))}
                        
                </div>
            </div>

        </div>   
    </div>
    </>
    )
}
{/* <form onSubmit={messageSendHandle}>
    <label>
        Message:
        <textarea onChange={messageChange}/>
    </label>
    <button type="submit">send</button>
</form> */}



{/* <textarea>Leave a message here</textarea>
<button onClick={messageSendHandle}>send!</button>  */}      


export default Friends;
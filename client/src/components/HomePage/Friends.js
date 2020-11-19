
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const [ readMsg, setReadMsg ] = useState(0);

    useEffect(() => {
        async function friendslist() {
            const response = await fetch(`/api/home/friendslist/${user_id}`)
            const data = await response.json();
            setFriends(data.friends)
        }
        friendslist(); 
    },[]);

    useEffect(() => {
        async function messagelist() {
            const response = await fetch(`/api/home/messagereceived/${user_id}`)
            const data = await response.json();
            setReceivedMsg(data.msgreceived)
          
        }
        messagelist(); 
    },[readMsg]);


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

    const readHandler = async(e) => {
        const message_id = e.target.value;

         const response = await fetchWithCSRF(`/api/home/messageread/${message_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message_id,
            }),
        })
        if (response.ok) {
            setReadMsg(message_id)
        }

    }



    return (
    <>
    <div className="friends__container">
        <div className="friends__left__container">
            <h2>My Besties</h2>
            <div className = 'friends__list__container'>
                {friends.map((f, index)=>(<div>
                <h2 key={`${f.id}-${index}-list`} >{f.friend_name} </h2>
                <img className = "friends__photo" src={f.friend_avatar} alt={`${f.friend_avatar}-${index}`}/>   
                <div>{f.friend_email}</div>
                <div>{f.match_rate}% Match</div>
                <div className="friends__match--bar">
                    <div className="friends__match--value" style={{width:f.match_rate.toString()+'%'}}/> 
                </div>
                <div>since {new Date(f.created_at).toLocaleDateString('en-US')} </div>
                    <button value={f.friend_id} name={f.friend_name} onClick={messageHandle}>Message</button>
                </div> ))}    
            </div>
        </div> 
        <div className="friends__right__container">
            { msgButton &&
            <div className="friends__right__top">         
                <h2>Sending a message to {to_name}</h2>
                <div className="friends__right--message">
                    <input className="friends__message" value={message}  type="text" placeholder="leave a message.." onChange={messageChange}></input>
                    <button className="message--sent" onClick={messageSendHandle}>send</button>
                </div>
            </div>
            }
            <div className="friends__right__bottom">
                <div>
                    {/* <h2>Received Messages</h2> */}
                    {}
                    {receivedMsg.map((m, index)=>(    
                    <div className='friends__message--card'>
                        <h3 key={`${m.id}-${index}-message`} >{m.message}</h3>   
                        <p>from: {m.from_user_name}  {new Date(m.created_at).toLocaleString()} </p>
                        <button className="button smallButton" value={m.id} onClick={readHandler}>read</button>
                    </div>
                     ))}     
                </div>
            </div>

        </div>   
    </div>
    </>
    )
}



export default Friends;
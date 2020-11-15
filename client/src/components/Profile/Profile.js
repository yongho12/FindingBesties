import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Profile() {

    const user_id = useSelector(state => state.authReducer.id);
    const fetchWithCSRF = useSelector(state => state.authReducer.csrf);
    const [ beingAsked, setBeingAsked ] = useState([]);
    const [ askId, setAskId ] = useState(0);
    const [ askingStatus, setAskingStatus ] = useState([]);
    const [ askingList, setAskingList ] = useState([]);
    const [ aboutMe, setAboutMe ] = useState([]);
    const [ photos, setPhotos ] = useState([]);
    const [ changeBtn, setChangeBtn ] = useState(false);
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

    useEffect(() => {
        async function aboutMe() {
            const response = await fetch(`/api/home/aboutme/${user_id}`)
            const data = await response.json();
            setAboutMe(data.aboutme);
            setPhotos(data.avartars);
            console.log('data.avartars', data.avartars)
            console.log("aboutMe", data.aboutme);
            console.log("avartar:::", photos)
         
        }
        aboutMe(); 
    }, []);


    
    const photoChange = async (e) => {
        console.log("photo Change")
        setChangeBtn(true);
   
        
    }
    
    // console.log("samples", samples);

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

    return (
    <div className="profile__container">
        {/* <h1>My Page</h1> */}
        <div className="profile__container--left">
            <h2>my profile</h2>
               <div className="profile__left__top"> {aboutMe.map((me, index)=>(
                 <div key={`${me.id}-${index}-profile`} >
                       <div> {me.name}</div>
                       <img className = "profile__photo" src={me.avatar} alt={`${me.avartar}-${index}`} />  
                       <div> {me.email}</div>
                       <div> Finding Besties member since {new Date(me.created_at).toLocaleDateString('en-US')}</div>
                 </div>
                 ))}
                 <button onClick={photoChange} >Photo Change</button> 
               </div>
               <div className="profile__left__bottom--photochange"> 
                { changeBtn &&
                   photos.map((sa, index)=>(
                   <div key={`${sa.id}-${index}-change`}> 
                        <div>{sa.id}</div>
                        <img className="profile__photo--sample" src={sa.avartar_file} alt={`${sa.avartar}-${index}-sample`}/>
                   </div>
                    ))}
                   

               </div>
            



            
        </div>
        <div className="profile__container--right">
            <div>
                <h2>You've asked</h2>
                {askingStatus.map((asking, index)=>(<>
                    <div key={`${asking.id}-${index}-ask`} >
                    <div>{askingList[asking.recipient]}</div>
                    <div>{asking.status}</div> 
                    </div> 
                </> ))}
            </div>
            <div>
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
        </div>           
    </div>
    )
}


export default Profile;
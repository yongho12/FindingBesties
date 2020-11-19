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
    const [ changedPhoto, SetChangedPhoto] = useState(0);
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
       
        }
        askingStatus(); 
    }, []);

    useEffect(() => {
        async function aboutMe() {
            const response = await fetch(`/api/home/aboutme/${user_id}`)
            const data = await response.json();
            setAboutMe(data.aboutme);
            setPhotos(data.avartars);
         
        }
        aboutMe(); 
    }, [changedPhoto]);

    const chgbtn = document.getElementById("photoChange")

    const photoChange = async (e) => {
        setChangeBtn(true);
        // let chgButton = document.getElementById(e.target.id);
        chgbtn.innerHTML="select below"
        chgbtn.disabled = true;
        
    }

    const selectPhoto = async (e) => {
        let res = window.confirm("Do you want to change the photo you've selected?")
        if (res === false) {
            chgbtn.disabled = false;
            chgbtn.innerHTML = "photo change"
            setChangeBtn(false);
            return;
        }

        const id = e.target.id;
        const avatar_file = e.target.value
        const response = await fetchWithCSRF(`/api/home/selectphoto/${user_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                avatar_file
            }),
        })
         if(response.ok) {
          SetChangedPhoto(id)
          chgbtn.disabled = false;
          chgbtn.innerHTML = "photo change"
          setChangeBtn(false);
        }
       
    }
    
  

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
        <div className="profile__container--left">
            {/* <h2>my profile</h2> */}
               <div className="profile__left__top"> {aboutMe.map((me, index)=>(
                 <div key={`${me.id}-${index}-profile`} >
                       <h2> {me.name}</h2>
                       <img className = "profile__photo" src={me.avatar} alt={`${me.avartar}-${index}`} />  
                       <h3> {me.email}</h3>
                       <h3> Finding Besties member since {new Date(me.created_at).toLocaleDateString('en-US')}</h3>
                 </div>
                 ))}
                 <button id="photoChange" onClick={photoChange}>Photo Change</button> 
               </div>
               <div className="profile__left__bottom--photochange"> 
                { changeBtn && 
                   photos.map((sa, index)=>
                   (
                    <div className="profile__left__bottom--photo" key={`${sa.id}-${index}-change`}> 
                        <img className="profile__photo--sample" src={`${sa.avartar_file}`} alt={`${sa.avartar}-${index}-sample`}/>
                        <button id={sa.id} value = {sa.avartar_file} onClick={selectPhoto}>select</button>
                    </div> 
                    ))}
                   
               </div>
            
        </div>
        <div className="profile__container--right">
            <div className="profile__right__top">
                {/* <h2>Besties requests</h2> */}
                {beingAsked.map((asked, index)=>(
                <div className='profile__right--accept'>
                <h3 key={`${asked.id}-${index}`} >
                    <h2>{asked.requestor_name}</h2> wants to be your bestie. 
                    <br /> Do you want to accept it?</h3> 
                    <div className="profile__right__button" >
                        <button value={asked.id} onClick={acceptHandle}>Accept</button>
                        <button value={asked.id} onClick={rejectHandle}>Reject</button>
                    </div>
                </div> ))}
            </div>
            <div className="profile__right__bottom">
                {/* <h2>You've asked to be a Bestie to persons below</h2> */}
                {askingStatus.map((asking, index)=>(<>
                    <div className='profile__asking--card' key={`${asking.id}-${index}-ask`} >
                    <h3>{askingList[asking.recipient]}</h3>
                    <h3>status: waiting for acceptance</h3>
                    </div> 
                </> ))}
            </div>
        </div>           
    </div>
    )
}


export default Profile;
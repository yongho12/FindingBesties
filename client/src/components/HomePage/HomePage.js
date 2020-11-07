import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Questions from './Questions'

function HomePage() {
    
    const [queSubmitted, setQueSubmitted] = useState(false);
    const [findSubmitted, setFindSubmitted] = useState(false);

    const buttonHandler = () => {
        setQueSubmitted(true);
        setFindSubmitted(true);
        console.log("HOME PAGE")
    }

    return (
        <>
            <NavBar/>
            <div className="finding-butoon">
                <button disabled ={findSubmitted} onClick={buttonHandler}>Finding Besties</button>
            </div>
            {  queSubmitted && 
               <div><Questions /></div> }
        </>
    ) 
}

export default HomePage;
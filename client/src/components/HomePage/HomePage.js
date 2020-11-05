import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Questions from './Questions'

function HomePage() {
    
    const [submitted, setSubmitted] = useState(false);

    const buttonHandler = () => {
        setSubmitted(true);
        console.log("HOME PAGE")
    }

    return (
        <>
            <NavBar/>
            <div className="finding-butoon">
                <button onClick={buttonHandler}>Finding Besties</button>
            </div>
            {  submitted && 
               <div><Questions /></div> }
        </>
    ) 
}

export default HomePage;
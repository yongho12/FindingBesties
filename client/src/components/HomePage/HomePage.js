import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Questions from './Questions'

function HomePage() {
    
    const [submitted, setSubmitted] = useState(false);

    const buttonHandler = () => {
        setSubmitted(true);
    }

    return (
        <>
            <NavBar/>
            <div className="finding-butoon">
                <button type="submit" onClick={buttonHandler}>Finding Besties</button>
            </div>
            {  submitted && 
               <div><Questions /></div> }
        </>
    ) 
}

export default HomePage;
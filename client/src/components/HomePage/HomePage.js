import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Question from './Question'

function HomePage() {

    return (
        <>
            <NavBar/>
            <div>
                <Question />
            </div>
        </>
    ) 
}

export default HomePage;
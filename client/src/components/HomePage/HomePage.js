import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Questions from './Questions'

function HomePage() {
 
    return (
        <>
            <NavBar/>
            <section id="about" className="section section_container">
                <h1>About Finding Besties</h1>
                <img className = "home__photo" src="/images/friends.png" alt="friendshipt photo" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure possimus
                    rem sequi? Nihil, est impedit dignissimos consequatur totam, odit
                    deserunt doloremque laudantium similique corrupti, iusto optio rerum in
                    deleniti officia.
                </p>
                <div>
                <div>Do you want to find out your potential best friends?</div>
                    <a href="/questionnaire">questionnaire</a>
               </div>
            </section>
        </>
    ) 
}

export default HomePage;
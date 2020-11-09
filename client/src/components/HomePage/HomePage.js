import React from 'react';
import {  NavLink } from 'react-router-dom';


function HomePage() {
 
    return (
        <>
            <section id="about" className="section section_container">
                <h1>About Finding Besties</h1>
                <img className = "home__photo" src="/images/friends.png" alt="home_photo" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure possimus
                    rem sequi? Nihil, est impedit dignissimos consequatur totam, odit
                    deserunt doloremque laudantium similique corrupti, iusto optio rerum in
                    deleniti officia.
                </p>
                <div>
                <div>Do you want to find out your potential best friends?</div>
                    <NavLink to="/questionnaire" activeClassName="active">
                        Questionnaire
                    </NavLink>
               </div>
            </section>
        </>
    ) 
}

export default HomePage;
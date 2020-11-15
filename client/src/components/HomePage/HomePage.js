import React from 'react';
import {  NavLink } from 'react-router-dom';


function HomePage() {
 
    return (
        <>
            <section id="about" className="section section_container">
                <h1>About Finding Besties</h1>
                <img className = "home__photo" src="/images/friends.png" alt="home_photo" />
                <p>
                    Having friends fullfils your life. 
                    When you meet people at work, school, or online, even before you talk to them, you might get judged on appearance, sex, age, ethnicity, or lifestyle behavior. 
                    Those thoughts can prevent us from making friends ... so ...
                    Finding Besties matches you and your new friends based on non-judgemental questions related to your personality and behaviors, not your wealth or beauty.                    
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
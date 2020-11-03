import React from 'react';
// import styles from './navbar.module.css';
import  './navbar.module.css'



const NavBar = () => {

    return (
        <>
        <div className="navbar">
        <div className="navbar__logo">
            {/* <link rel="icon" type="image/png" href="../favicon.png" /> */}
            <i class="fab fa-diaspora" source="../favicon.png"></i>
            <a href="#">Finding Besties</a>
        </div>
        <div>
            <ul className="navbar__menu">
                <li className="navbar__menu_item">Home</li>
                <li className="navbar__menu_item">About Us</li>
                <li className="navbar__menu_item">Log In</li>
                <li className="navbar__menu_item">Profile</li>
            </ul>
        </div>
        </div>
        </>
    )

}

export default NavBar;
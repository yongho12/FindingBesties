import React from 'react';
import { NavLink, Switch, Route,} from 'react-router-dom'; 
import styles from './navbar.module.css';
import  './navbar.module.css'
import Login from '../LoginPannel'

const LoginHandler = () => {
    console.log("Login Handler")

    return (
        <>
        <h1>  hahahah </h1>
        </>
    )

}



const NavBar = () => {

    return (
        <>
        <nav className={styles.navbar} >
            <div className={styles.logo}>
                <img className={styles.image} src="/images/favicon.png" alt="logo"></img>
                <h1 className={styles.title}>Finding Besties</h1>
            </div>

            <ul className={styles.navbarMenu} >
                <li className={styles.navbarMenuItem}>Home</li>
                <li className={styles.navbarMenuItem}>
                    <NavLink to="/aboutus" activeClassName="active">
                        About Us
                    </NavLink>
                </li>
                <li className={styles.navbarMenuItem}>  
                    <NavLink to="/login" activeClassName="active">
                        Log In
                    </NavLink></li>
                <li className={styles.navbarMenuItem}>Profile</li>
            </ul>
            {/* <button onClick={LoginHandler}>Log in</button> */}
       
        </nav>
         <Switch>
            <Route path="/aboutus"  />
        </Switch>
        </>
    )

}

export default NavBar;
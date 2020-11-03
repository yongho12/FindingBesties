import React from 'react';
import { NavLink, Switch, Route,} from 'react-router-dom'; 
import styles from './navbar.module.css';
import  './navbar.module.css'



const NavBar = () => {

    return (
        <>
        <nav className={styles.navbar} >
            <div className={styles.logo}>
                <img className={styles.image} src="/images/favicon.png" alt="logo"></img>
                <h1 className={styles.title}>FidingBesties</h1>
            </div>

            <ul className={styles.navbarMenu} >
                <li className={styles.navbarMenuItem}>Home</li>
                <li className={styles.navbarMenuItem}>
                    <NavLink to="/aboutus" activeClassName="active">
                        About Us
                    </NavLink>
                </li>
                <li className={styles.navbarMenuItem}>Log In</li>
                <li className={styles.navbarMenuItem}>Profile</li>
            </ul>
       
        </nav>
         <Switch>
            <Route path="/aboutus"  />
        </Switch>
        </>
    )

}

export default NavBar;
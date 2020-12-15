import React from 'react';
import { NavLink, Switch, Route, Redirect} from 'react-router-dom'; 
import styles from './navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';


const NavBar = () => {

    const authSelector = useSelector(state => state.authReducer);
    const loggedOut = authSelector.id;
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        dispatch(logout());
    }

    if (!loggedOut) {
        return <Redirect to="/login"/>;
    }

    return (
        <>
        <nav className={styles.navbar} >
            <div className={styles.logo}>
                <img className={styles.yongho_logo} src="/images/favicon.png" alt="favicon"></img>
                <a href= "https://github.com/yongho12/FindingBesties" target="_blank" className={styles.title}> Finding Besties</a>
            </div>

            <ul className={styles.navbarMenu}  >
                <li className={styles.navbarMenuItem}>
                    <NavLink to="/" activeClassName="active" >
                        Home
                    </NavLink>
                </li>
                <li className={styles.navbarMenuItem}>
                    <NavLink to="/questionnaire" activeClassName="active">
                        Questionnaire
                    </NavLink>
                </li>
                 <li className={styles.navbarMenuItem}>
                    <NavLink to="/friends" activeClassName="active">
                        MyBesties
                    </NavLink>
                </li>
                {/* <li className={styles.navbarMenuItem}>  
                    <NavLink to="/login" activeClassName="active">
                        LogIn
                    </NavLink></li> */}
                {/* <li className={styles.navbarMenuItem} onClick={logoutHandler} activeClassName="active">LogOut</li> */}
                <li className={styles.navbarMenuItem} onClick={logoutHandler}>
                    <NavLink to="/login" activeClassName="active">
                    LogOut
                    </NavLink>
                </li>

                <li className={styles.navbarMenuItem}>
                    <NavLink to="/profile" activeClassName="active">
                        Profile
                    </NavLink></li>
            </ul>
       
        </nav>
         <Switch>
            <Route path="/aboutus"  />
        </Switch>
        </>
    )

}

export default NavBar;
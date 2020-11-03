import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
// import LoginPanel from './components/LoginPanel';
import HomePage from './components/HomePage/HomePage'
import UserList from './components/UsersList';
import styles from './app.module.css';


function App() {

  return (
    <div className={styles.app}>
    <Switch>
        <Route path="/users">
            <UserList />
        </Route>

        <Route path="/" exact={true} component={HomePage}/>
    </Switch>
    </div>
  );
}

export default App;

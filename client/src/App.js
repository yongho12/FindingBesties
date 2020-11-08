import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
// import LoginPanel from './components/LoginPanel';
import HomePage from './components/HomePage/HomePage'
import Questions from './components/HomePage/Questions'
import LoginPanel from './components/LoginPannel'
import UserList from './components/UsersList';
import styles from './app.module.css';


function App() {

  return (
    <div className={styles.app}>
    <Switch>
        <Route path="/login" component={LoginPanel} />
        <Route path="/questionnaire" exact={true} component={Questions} />
        <Route path="/" exact={true} component={HomePage}/>
    </Switch>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Questions from './components/HomePage/Questions';
import Friends from './components/HomePage/Friends';
import LoginPanel from './components/LoginPannel';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import { setCsrfFunc } from './actions/authActions';

// const PrivateRoute = ({ component: Component, ...rest }) => { 
//   let needLogin = useSelector(state => !state.authReducer.id);
//   return (
//         <Route {...rest} render={(props) => (
//             needLogin
//                 ? <Redirect to='/login' />
//                 : <Component {...props} />
//         )} />
//     )

// }

function App() {
  let location = useLocation();
  let dispatch = useDispatch();
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);

  useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
            }
        }
        restoreCSRF();
    }, []);


    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);


  return (
    <div>
     {location.pathname !== '/login' && location.pathname !== '/signup' ?
                <NavBar />
                : null}
    <Switch>
        <Route path="/login" component={LoginPanel} />
        <Route path="/questionnaire" exact={true} component={Questions} />
        <Route path="/profile" exact={true} component={Profile}/>
        <Route path="/signup" exact={true} component={SignUp}/>
        <Route path="/friends" exact={true} component={Friends}/>
        <Route path="/" exact={true} component={HomePage}/>
    </Switch>
    </div>
  );
}

export default App;

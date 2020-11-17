import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/authActions';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const currentUserId = useSelector(state => state.authReducer.id);
     const error_msg = useSelector(state => state.authReducer.error);

    const handleLogIn = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (email && password) {
          dispatch(login(email, password));
        }
    }

    const handleDemoLogIn = (e) => {
        e.preventDefault();
        const demoEmail = 'demo@example.com';
        const demoPassword = 'password';
        dispatch(login(demoEmail, demoPassword));
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "email":
                setEmail(value);
                return;
            case "password":
                setPassword(value);
                return;
            default:
                return;
        }
    }

    if (currentUserId) {
        return <Redirect to="/" />;
    }



    return (

        <div className="loginandsignup">
            {/* <img className='login__image' src='https://unsplash.com/photos/tvc5imO5pXk' alt='log in image' /> */}
            {/* <LoginFormWrapper> */}
                <div className="login">
                    <h1>Log in to Finding Besties</h1>
                    <form onSubmit={handleLogIn}>
                        <fieldset>
                            <div className="input-fields">
                                <label htmlFor="email">Email address</label>
                                <input type="email"
                                    id="email"
                                    placeholder="Please enter Email"
                                    onChange={handleChange} />
                                    {submitted && !email &&
                                     <div className="invalid-feedback">Email is required</div>}
                            </div>
                            <div className="input-fields">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    placeholder="Please enter password"
                                    onChange={handleChange} />
                                 {submitted && !password &&
                                  <div className="invalid-feedback">Password is required</div>}    
                            </div>
                            <div className="login-spacer"></div>
                            <div className="login-submit">
                                <div className="login-buttons">
                                    <button type="submit">Sign in</button>
                                    <button className="demouser" onClick={handleDemoLogIn}>Demo User</button>
                                </div>
                                <div className="login-signup">
                                    <span>
                                        <span>Not a member?</span>
                                        <a href="/signup">Sign up</a>
                                    </span>
                                </div>
                            </div>
                            <div id="error">{error_msg}</div>
                        </fieldset>
                    </form>
                </div>
            <div>
              <img className='login__image' src='/static/images/6friends.jpg' alt='login_image'/>
            </div>
            {/* </LoginFormWrapper> */}

        </div>
    );
}

export default Login;

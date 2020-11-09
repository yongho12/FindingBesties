import React, { useState } from "react";
import { signup } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import styled from "styled-components";
// import back_img from "../foodie-apps.jpg";
import './LoginPanel.css';


function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.authReducer.id);
  const error_msg = useSelector(state => state.authReducer.error);


  function handleChange(e) {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        return;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (password && email && name) {
          dispatch(signup(name, email, password));
        }
    }

  if (currentUserId) {
    return <Redirect to="/" />;
  }

  

  return (

    <div className="loginandsignup">
      {/* <img className='login__image' src={back_img} alt="" /> */}
  
        <h1>Welcome To Finding Besties!</h1>
        <form name='form' onSubmit={handleSubmit}>
          <fieldset>
            <div className="input-fields">
              <label htmlFor="name">Name</label>
              <input type="txt"
                id="name"
                value={name}
                placeholder="Please enter your name"
                onChange={handleChange} />
              {submitted && !name &&
                <div className="invalid-feedback">Name is required</div>}
            </div>
            <div className="input-fields">
              <label htmlFor="email">Email</label>
              <input type="email"
                id="email"
                value={email}
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
                value={password}
                onChange={handleChange} />
              {submitted && !password &&
                <div className="invalid-feedback">Password is required</div>}
            </div>
            <br />
            <div className="login-buttons">
              <button type="submit">Register</button>
              <div>
                <h3>Already a member?</h3>
                <a href="/login">Log In</a>
              </div>

            </div>
            <div id="error">{error_msg}</div>
          </fieldset>
        </form>
  
    </div>
  )
}

export default SignUp;

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <div className="login-header">
      <span>Log in or sign up</span>
      </div>

      <div className="welcome-airbnb">
      <h2> Welcome to Airbnb</h2>
      </div>

      <div className="login-form-container"> 
    <form onSubmit={handleSubmit} className='login__form'>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
        <h5>We’ll call or text you to confirm your number. Standard message. Privacy Policy</h5>
        </div>
      </label>

      <div className="login-btn">
      <button className='login__btn' type="submit">Log In</button>
      </div>

    </form>

    </div>


    </>
  );

  
}

export default LoginForm;
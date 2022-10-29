// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] =useState("")
  const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName,lastName,image }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };


  return (

    <form onSubmit={handleSubmit} className='signup__form'>
      <ul>
        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

        <label>
            First name
            <input
            type ="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </label>

        <label>
        Last name
        <input
        type ="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        />
        </label>

      <label>
        Email
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button className='signup__btn' type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGlobe,faUser,faBars} from '@fortawesome/free-solid-svg-icons'
import CreateSpotForm from "../SpotBrowser/CreateSpotForm";
import {NavLink, Route} from 'react-router-dom'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);

  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profile-dropdown" onClick={openMenu}> {user.username}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName}</li>
          <li>{user.email}</li>
          <li>
          <NavLink to='/spots/form'>
          Create A Spot
          </NavLink>
         
          
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
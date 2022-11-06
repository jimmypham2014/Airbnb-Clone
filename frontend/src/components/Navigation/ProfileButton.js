// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGlobe,faUser,faBars} from '@fortawesome/free-solid-svg-icons'
import CreateSpotForm from "../SpotBrowser/CreateSpotForm";
import {NavLink, Route, useHistory} from 'react-router-dom'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  
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
    history.push('/')
    dispatch(sessionActions.logout());
    
  };

  return (
    <>
      <button className="profile-dropdown-btn" onClick={openMenu}> <h4>{user.username}</h4>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <h4> Welcome {user.firstName}!</h4>
          <div>---------------------------</div>
          <h4>{user.email}</h4>
          <li id="create">
          <NavLink to='/spots/form'>
          <h4> Create A Spot</h4>
          </NavLink>
          </li>
          <li>
           <NavLink to ='/spots/myspots'>
           <h4>All My Spots</h4>
           
           </NavLink>
          
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
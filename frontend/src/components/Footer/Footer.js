import React from "react";
import "./Footer.css";
import globeIcon from '../../icons/globe.svg'
import arrowUp from '../../icons/arrowup.png'

function Footer() {
  return (
    <div className="main-footer">
      <div className="right-side">

      <div>
      © 2022 Airbnb, Inc. · Privacy · Terms · Sitemap
      </div>
    
      </div>

      <div className="center">
      <a href="https://github.com/jimmypham2014/API-Project"> About Me</a>
      
      </div>

      <div className="left-side">
      
           <div className="globe__icon"> <img src={globeIcon} /> <p>English (US)</p> </div> 
            
            <span>$ USD</span>

            <div className="suppport">
            <span>Support & Resources</span>
            <img src={arrowUp} alt=''/>
            </div>

      </div>
    </div>
  );
}

export default Footer;
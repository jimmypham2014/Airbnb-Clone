import '../Footer/Footer.css'
import globeIcon from '../../icons/globe.svg'
import account from '../../icons/account.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

const Footer = ()=>{
return(

    <div className="footer-container">
     <div className='footer-box'>
     
     <div className='right-side'>© 2022 Airbnb, Inc.·Privacy·Terms·Sitemap·Destinations</div>
     
     <div className='about-me'> <FontAwesomeIcon icon={faAddressCard}/><a href='https://github.com/jimmypham2014/API-Project'> About Me</a></div>
     

    <div className='left-side'> <div className='globe-icon'><a href=""> <img src={globeIcon}/>English</a></div> <a href=''>$ USD</a>  <a href=''>Support & Resources</a></div>
   
    </div>

    </div>

)
}

export default Footer
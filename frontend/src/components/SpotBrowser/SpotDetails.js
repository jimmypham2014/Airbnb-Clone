import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleSpotDetail} from '../../store/spot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare,faHeart, faDoorOpen, faChevronRight, faBed, faWifi,faKitchenSet, faCar, faTv , faGamepad, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import './SpotBrowser.css'
import './SpotDetails.css'
import EditSpotForm from './EditSpotForm';
import EditFormModal from './EditFormModal';
import { deleteSpot } from '../../store/spot';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateAReview from '../SpotReviews/CreateAReview';
import {faStar} from '@fortawesome/free-solid-svg-icons'
import aircoverImg from '../../images/aircover.png'
import { getReviews } from '../../store/reviews';
import UpdateReview from '../SpotReviews/EditAReview';
import SpotImages from '../SpotImages/SpotImages';
import CreateAImage from '../SpotImages/CreateImages';


const SpotDetails =()=>{

  const dispatch = useDispatch()

  const [showEditForm,setShowEditForm] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const history =useHistory()
  const reviews = useSelector(state =>state.reviews)
    
    
    const allReviews = Object.values(reviews)


const {spotId} = useParams()

const spots = useSelector(state =>{
    return state.spots
  })



  const spot = spots[spotId]


useEffect(()=>{
    dispatch(getSingleSpotDetail(spotId))
    dispatch(getReviews(spotId))
    setShowEditForm(false)
},[dispatch,spotId])



const specificReview = allReviews.filter(review =>review.spotId === spot.id)

let allStars =specificReview.map(review => review.stars)


let rate = allStars.reduce(function(sum, star){
    const avg = (sum+star)
    return avg
},0)

let averageRating = Number(rate/specificReview.length).toFixed(2)





if(!spot) return null



if(showEditForm){
  <EditSpotForm spot={spot}/>
}

return(
   <div className='spot-detail-lists'>
    
   <div className='spot_name'>
    <h1><b>{spot.name}</b></h1>
    
    </div> 

   <div className='details'>

    <div className='details_left'>
      
       
         
      <h3>  <FontAwesomeIcon icon={faStar}/>{!Number(averageRating) ? null :averageRating }
      · {specificReview.length <=1 ? `${specificReview.length} Review`: `${specificReview.length} Reviews`}
      · {spot.city}, {spot.state}, {spot.country}</h3>
    </div>
    
    <div className='details_right'>
    <div id='share'>
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /><span>Share</span>
    </div>
    <div id='save'>
    <FontAwesomeIcon icon={faHeart}/><span>Save</span>
    </div>
    </div>
  
 
   </div>

   <div className='spot_detail_img'>
   <img src={spot.previewImage} alt=''/>

  

   <div className='price-box'>

   <div className='price-box-content'>

      <h2>${spot.pricePerNight}/Night</h2>
  
      <p>{specificReview.length <=1 ? `${specificReview.length} Review`: `${specificReview.length} Reviews`}</p>
   </div>

   <div className='check-in-container'>
    <div className='check-in-out'>
    <div id='in'>
    <h5>Check In</h5>
    <span>12/14/2022</span>
    </div>
    <div id='out'>
    <h5>Check Out</h5>
     <span>12/19/2022</span>
    </div>
    </div>

   <div className='check-in-guest'>
    <span>Guests</span>
    <div className='guest-option'>
    <span><b> 1 Guest</b></span>
    <FontAwesomeIcon icon={faArrowDown} className='arrow-down'/>
    </div>
   </div>
   
   </div>

   <div><h4></h4></div>
   
      <button className='reserve_btn'>Reserve</button>
   
      
      <div className='price-details'>
      <span>Don't book, you're too poor</span>
      
      </div>

      <div className='booking-price-details'>
     
        <div className='total-price-per-night'>
        <span>${spot.pricePerNight} x 5 nights</span>
         <span>${spot.pricePerNight * 5}</span> 
       </div>

        <div className='clearning-fee'>
        <span>Cleaning fee</span>
        <span>$390</span>
        </div>

        <div className='service-fee'>
        <span>Service fee</span>
        <span>$716</span>
        </div>

        <div className='total-before-tax'>
        <h2>Total before taxes</h2>
         <span>${(spot.pricePerNight*5)+390+716}</span>
        </div>

      </div>

   </div>


   </div>

   <div className='tesinggg'></div>

    <div className='spot_detail-owner'>
    {spot.User &&(
      <h2><b>Entire Home is hosted by {spot.User.firstName} </b></h2>
      )}
    <p>6 guests · 3 bedrooms · 5 beds · 2 baths</p>
    
    </div>  

    <div className='spot_detail-check-in'>
    
    <FontAwesomeIcon icon={faDoorOpen} />
      <div className='spot_detail-check-in-detail'>
      <p><b>Self check-in</b></p>
      <h5>Check yourself in with the lockbox</h5>
      </div>
    </div>

      <div className='spot-detail-check-in-air-cover'>
      
      <img src={aircoverImg} alt=''/>
      
      <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
      <a href=''>Learn more</a>
      </div>



    
   <div className='spot_details_description'>
   <p>Description:</p>
   <p>{spot.description}</p>
   </div>

    <div className='spot-detail-bedrooms'>
    <h2>Where you'll sleep</h2>
        <div className='number_of_beds'>
          <div id='bed'>
          <FontAwesomeIcon icon={faBed} className='bed_icon'/>
          <p>Bedroom 1</p>
          <h5>1 king bed</h5>
          </div>

          <div id='bed'>
          <FontAwesomeIcon icon={faBed} className='bed_icon'/>
          <p>Bedroom 2</p>
          <h5>2 queen bed</h5>
         
          </div>

          <div id= 'bed'>
          <FontAwesomeIcon icon={faBed} className='bed_icon'/>
          <FontAwesomeIcon icon={faBed} className='bed_icon'/>
          <FontAwesomeIcon icon={faBed} className='bed_icon'/>
          <p>Bedroom 3</p>
          <h5>3 double beds</h5>
          </div>

        </div>
    </div>

    <div className='amentities'>
        <h2>What this place offers</h2>
         <ul>
         <li>
          <FontAwesomeIcon icon={faWifi}/> Wifi
         </li>
         
         <li>
          <FontAwesomeIcon icon={faKitchenSet}/> Kitchen
         </li>

         <li>
         <FontAwesomeIcon icon={faCar}/> Free parking on premises
         </li>

         <li>
         <FontAwesomeIcon icon={faTv}/> Netflix and Chill
         </li>
         <li>
         <FontAwesomeIcon icon={faGamepad}/> All video games
         </li>
         </ul>
        
      </div>





   
     <div className='spot_reivew_container'>
   <SpotReviews spot={spot}/>
   
    </div>

  <CreateAReview spot={spot}/>
  
   </div>


)



}

export default SpotDetails
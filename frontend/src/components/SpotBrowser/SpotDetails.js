import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleSpotDetail} from '../../store/spot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare,faHeart } from '@fortawesome/free-solid-svg-icons';
import './SpotBrowser.css'
import './SpotDetails.css'
import EditSpotForm from './EditSpotForm';
import EditFormModal from './EditFormModal';
import { deleteSpot } from '../../store/spot';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateAReview from '../SpotReviews/CreateAReview';


const SpotDetails =()=>{
  const [showEditForm,setShowEditForm] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const history =useHistory()
  console.log(sessionUser)


const dispatch = useDispatch()
const {spotId} = useParams()

const spots = useSelector(state =>{
    return state.spots
  })

  const spot = spots[spotId]

useEffect(()=>{
    dispatch(getSingleSpotDetail(spotId))
    setShowEditForm(false)
},[dispatch,spotId])


if(!spot) return null



if(showEditForm){
  <EditSpotForm spot={spot}/>
}

return(
   <div className='spot-detail-lists'>
    
   <div className='spot_name'>
    <h1><b>{spot.name}</b></h1>
    {spot.User &&(
    <h2><b>This Amazing Home is hosted by {spot.User.firstName} </b></h2>
    )}
    </div> 

   <div className='details'>

    <div className='details_left'>
      <h3> {spot.numReviews} {spot.avgRating} {spot.city}, {spot.state}</h3>
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
   </div>




   <div>{spot.address}</div>

   <div className='price-box'>

   <h2>${spot.pricePerNight}/Night</h2>
   <h4>{spot.numReviews}</h4>

   </div>

   <div>{spot.avgRating}</div>
   
     <div className='spot_reivew_container'>
   <SpotReviews spot={spot}/>
    </div>

  <CreateAReview/>
   </div>


)



}

export default SpotDetails
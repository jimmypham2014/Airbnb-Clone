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
    <h1>{spot.name}</h1>
    </div>

   <div className='details'>

    <div className='details_left'>
      <h2> {spot.numReviews} {spot.avgRating} {spot.city}, {spot.state}</h2>
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

   <div>{spot.pricePerNight}</div>

   <div>{spot.avgRating}</div>
   
     <div>
   <SpotReviews spot={spot}/>
    </div>

  
   </div>


)



}

export default SpotDetails
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleSpotDetail} from '../../store/spot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare,faHeart } from '@fortawesome/free-solid-svg-icons';
import './SpotBrowser.css'


const SpotDetails =()=>{

const dispatch = useDispatch()
const {spotId} = useParams()

const spot = useSelector(state =>{
    return state.spots[spotId]
  })


useEffect(()=>{
    dispatch(getSingleSpotDetail(spotId))
},[dispatch,spotId])

if(!spot) return null

return(
   <div className='spot-detail-lists'>
    
   <div>
    <h1>{spot?.name}</h1>
    </div>
   <div className='details'>
   {spot.avgRating} {spot.city}, {spot.state}
   <FontAwesomeIcon icon={faArrowUpRightFromSquare} />Share
   <FontAwesomeIcon icon={faHeart}/>Save
 
   </div>

   <div>
   <img src={spot.previewImage} alt=''/>
   </div>




   <div>{spot?.address}</div>

   <div>{spot?.pricePerNight}</div>

   <div>{spot?.avgRating}</div>
   
   
   </div>


)



}

export default SpotDetails
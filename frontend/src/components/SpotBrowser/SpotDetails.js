import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleSpotDetail} from '../../store/spot'


const SpotDetails =()=>{
const dispatch = useDispatch()
const {spotId} = useParams()

const spot = useSelector(state =>{
    return state.spots[spotId]
  })
  
  console.log(spot)


useEffect(()=>{
    dispatch(getSingleSpotDetail(spotId))
},[dispatch,spotId])

if(!spot) return null

return(
   <div className='spot-detail-lists'>
    
   <div>
    <h1>{spot.name}</h1>
   
    <p>{spot.name} hosted by owner's name</p>
   </div>

   <div>{spot.address}</div>

   <div>{spot.pricePerNight}</div>

   <div>{spot.avgRating}</div>
   
   
   </div>


)



}

export default SpotDetails
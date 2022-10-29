import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,Link, Route } from "react-router-dom";
import testImage from '../../images/testing.jpg'
import { getAllSpots } from "../../store/spot";
import GetSpotsOfCurrentUser from "./GetSpotsOfCurrentUser";
import './SpotBrowser.css'
import SpotDetails from "./SpotDetails";

const SpotBrowser = ()=>{
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser)


useEffect(()=>{
dispatch(getAllSpots())

},[dispatch])

const spot = useSelector(state =>{
  return state.spots
})

const allSpots = Object.values(spot)

console.log(sessionUser.id)

const currentSpots = allSpots.find(spot => spot.owerId == sessionUser.id)

console.log(currentSpots)

return(
 <main className="spot__display">
 {allSpots.map((spot)=>{
  return (
   <div >
    <Link key={spot.id} to={`/spots/${spot.id}`}>
    <div className="spot-image"
     
    >
   <img src={spot.previewImage} alt=''/>
    </div>
    <h4>{spot.city},{spot.state}</h4>
    <div className="primary-text">{spot.name}</div>
    <div className="price">{spot.pricePerNight}</div>
    
    
    </Link>
    </div>
  )
 })}

 
 </main>

)

}

export default SpotBrowser
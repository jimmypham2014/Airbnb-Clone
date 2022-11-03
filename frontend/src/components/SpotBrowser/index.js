import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,Link, Route } from "react-router-dom";
import { getAllSpots } from "../../store/spot";
import LoginFormModal from "../LoginFormModal";
import GetSpotsOfCurrentUser from "./GetSpotsOfCurrentUser";
import './SpotBrowser.css'

const SpotBrowser = ()=>{
  const dispatch = useDispatch()


useEffect(()=>{
dispatch(getAllSpots())
},[dispatch])

const spot = useSelector(state =>{
  return state.spots
})

const allSpots = Object.values(spot)
console.log(allSpots,'hello')






return(
 <main className="spot__display">

 {allSpots.map((spot)=>{
  return (
   <div >
    <Link key={spot.id} to={`/spots/${spot.id}`}>


    <div className="spot-image">
   <img src={spot.previewImage} alt=''/>
    </div>

    <div className="secondary-text">
    <h4>{spot.city}, {spot.state}</h4>
    </div>


    <div className="primary-text">{spot.name}</div>
    <div className="price">${spot.pricePerNight} Night</div>
    
    
    </Link>
    </div>
  )
 })}

 
 </main>

)

}

export default SpotBrowser
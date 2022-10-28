import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,Link, Route } from "react-router-dom";
import testImage from '../../images/testing.jpg'
import { getAllSpots } from "../../store/spot";
import './SpotBrowser.css'
import SpotDetails from "./SpotDetails";

const SpotBrowser = ()=>{
  const dispatch = useDispatch()

useEffect(()=>{
dispatch(getAllSpots())

},[dispatch])

const spot = useSelector(state =>{
  return state.spots
})

const allSpots = Object.values(spot)

return(
 <main className="spot__display">
 {allSpots.map((spot)=>{
  return (
   <div >
    <Link key={spot.id} to={`/spots/${spot.id}`}>
    <div className="=nav-spot-image"
      style={{backgroundImage: `url('${spot.previewImage})`}}
    >
    </div>
    <div className="primary-text">{spot.name}</div>
    <div className="rating">{spot.pricePerNight}</div>
    
    
    </Link>
    </div>
  )
 })}

 
 </main>

)

}

export default SpotBrowser
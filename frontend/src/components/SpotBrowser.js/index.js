import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import testImage from '../../images/testing.jpg'
import { getAllSpots } from "../../store/spot";
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
console.log(allSpots, 'sdfdsfds')

return(
 <main className="spot__display">
 {allSpots.map((spot)=>{
  return (
   <div >
    <NavLink key={spot.id} to={`/`}>
    <div className="=nav-spot-image"
      style={{backgroundImage: `url('${testImage})`}}
    >
    </div>
    <div className="primary-text">{spot.name}</div>
    <div className="rating">{spot.pricePerNight}</div>
    
    
    </NavLink>
    </div>
  )
 })}
 
 </main>

)

}

export default SpotBrowser
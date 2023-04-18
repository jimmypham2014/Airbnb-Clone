
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link } from "react-router-dom";
import { getAllSpots } from "../../store/spot";
import './SpotBrowser.css'
import Footer from "../Footer/Footer";
import '../../fonts/AirbnbCereal_W_Md.otf'

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
<div className="page-container mx-auto py-13 ">

  <div className="content-wrap flex justify-center">
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 gap-[50px] max-w-sm max-auto md:max-w-none md:mx-0 gap-y-8 h-[100px]">

      {allSpots.map((spot)=>{
  return (
   <div className="spot_each_display ">
    <Link key={spot.id} to={`/spots/${spot.id}`}>


    <div className="spot-image">
   <img src={spot.previewImage} alt=''/>
    </div>

    <div className="secondary-text">
    <h4>{spot.city}, {spot.state}</h4>
    </div>

    
    <div className="primary-text">{spot.name}</div>
    <div className="price text-2x">${spot.pricePerNight} Night</div>
    
    
    </Link>
    </div>
  )
 })}
 </main>
 </div>

 <Footer/>

 </div>
)

}

export default SpotBrowser
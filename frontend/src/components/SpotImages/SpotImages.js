import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,Link, Route, useParams } from "react-router-dom";
import { getImages } from "../../store/images";
import { getAllSpots, getSingleSpotDetail } from "../../store/spot";
import CreateAImage from "./CreateImages";

const SpotImages= ()=>{

 
  const dispatch = useDispatch()
const {spotId} = useParams
useEffect(()=>{
    dispatch(getImages(spotId))
    dispatch(getAllSpots())
},[dispatch])

const spots = useSelector(state => Object.values(state.spots))
 const spot =spots[spotId]
console.log(spot,'undefined')


 console.log(spotId)



  console.log(spots)

return(


 <main className="">
  {spot.previewImage}


 </main>

)

}

export default SpotImages
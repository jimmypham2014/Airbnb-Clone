import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,Link, Route } from "react-router-dom";
import { getImages } from "../../store/images";

const SpotImages= ()=>{
  const dispatch = useDispatch()


useEffect(()=>{
dispatch(getImages())
},[dispatch])

const image = useSelector(state =>{
  return state.images
})

const allImages = Object.values(image)
console.log(allImages,'hello')



return(


 <main className="">

 {allImages.map((image)=>{
  return (
   <div className="">
    {image.url}
    </div>
  )
 })}
 </main>

)

}

export default SpotImages
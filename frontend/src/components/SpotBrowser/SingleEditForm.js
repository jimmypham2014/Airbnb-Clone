import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink,Link, useParams,Route } from 'react-router-dom';
import { deleteSpot } from "../../store/spot";
import EditSpotForm from "./EditSpotForm";


const SingleEditForm = ({spot})=>{
    console.log(spot)
    const dispatch =useDispatch()
const [showEditSpotForm,setShowEditSpotForm] = useState(false)


useEffect(()=>{
    setShowEditSpotForm(false)
},[])

const deletedSpot = (e) =>{
    dispatch(deleteSpot(spot.id))
}

    return(

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
        <Link to={`/spots/${spot.id}/editspot`}>
        <button >Update</button>
        </Link>

        <button onClick ={deletedSpot}>Delete</button>
        </div>
    )

}

export default SingleEditForm
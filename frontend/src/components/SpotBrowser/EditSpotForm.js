import { useState,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSpot} from "../../store/spot"
import { ValidationError } from "../../utils/validationError"
import ErrorMessage from "./ErrorMessage"
import './CreateSpotForm.css'
import { useHistory, useParams } from "react-router-dom"

const EditSpotForm =()=>{
 const {spotId} =useParams()
const dispatch = useDispatch()
const history =useHistory()
const spot = useSelector(state => state.spots[spotId])

const [id, setId] = useState(spot.id) 
const [address, setAddress] = useState(spot.address)
const [city, setCity] = useState(spot.city)
const [state,setState] = useState(spot.state)
const [lat, setLat] = useState(spot.lat)
const [lng,setLng] = useState(spot.lng)
const [name,setName] = useState(spot.name)
const [description,setDescription] = useState(spot.description)
const [pricePerNight, setPricePerNight] =useState(spot.pricePerNight)
const [previewImage, setPreviewImage] = useState(spot.previewImage);
const [country, setCountry] = useState(spot.country)
const [errorMessages, setErrorMessages] = useState({});
const [errors, setErrors] = useState([]);



const handleSubmit= async (e)=>{

e.preventDefault();

const payload ={
        ...spot,
        id,
        address,
        city,
        state,
        country,
        previewImage,
        lat,
        lng,
        name,
        description,
        pricePerNight
    }
    
  
    //!!START SILENT
    try {
     await dispatch(updateSpot(spotId,payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) })
    }
    //!!END
   
    history.push(`/spots/${spotId}`);

}
const handleCancel = ()=>{
    history.push(`/spots/myspots`);
}


    return(
        
        <section className='new-form'>
        
            <div className="hello">
            <form className='create-spot-form' onSubmit={handleSubmit}>
          
            <input
            type='text'
            placeholder="Address"
            required
            value={address}
            onChange={(e) =>setAddress(e.target.value)}
            />
            

            <input
            type='text'
            placeholder="City"
            required
            value={city}
            onChange={(e) =>setCity(e.target.value)}
            />
            
            <input
            type='text'
            placeholder="State"
            required
            value={state}
            onChange={(e) =>setState(e.target.value)}
            />
            <input
            type='text'
            placeholder="Country"
            required
            value={country}
            onChange={(e) =>setCountry(e.target.value)}
            />
      

            <input
            type='number'
            placeholder="Lat"
            required
            value={lat}
            onChange={(e) =>setLat(e.target.value)}
            />
        

            <input
            type='number'
            placeholder="Lng"
            required
            value={lng}
            onChange={(e) =>setLng(e.target.value)}
            />
           

            <input
            type='text'
            placeholder="Name"
            required
            value={name}
            onChange={(e) =>setName(e.target.value)}
            />
         

            <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            />

          <input
            type='number'
            placeholder="Price Per Night"
            required
            value={pricePerNight}
            onChange={(e) =>setPricePerNight(e.target.value)}
            />
    
            <button type="submit" >Update Your Spot</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        </div>
        </section>
    )

}

export default EditSpotForm
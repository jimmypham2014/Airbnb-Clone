import { useState,useEffect} from "react"
import { addOneSpot } from "../../store/spot"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { createASpot } from "../../store/spot"
import { ValidationError } from "../../utils/validationError"
import ErrorMessage from "./ErrorMessage"
import './CreateSpotForm.css'

const CreateSpotForm =()=>{
const history = useHistory();
const dispatch = useDispatch()
const [address, setAddress] = useState('')
const [city, setCity] = useState('')
const [state,setState] = useState('')
const [lat, setLat] = useState(0)
const [lng,setLng] = useState(0)
const [name,setName] = useState('')
const [description,setDescription] = useState('')
const [pricePerNight, setPricePerNight] =useState(0)
const [previewImage, setPreviewImage] = useState(null);
const [country, setCountry] = useState('')
const [errorMessages, setErrorMessages] = useState({});
const [errors, setErrors] = useState([]);



const handleSubmit= async (e)=>{

e.preventDefault();

const payload ={
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
    
   
    let createdSpot;
    //!!START SILENT
    try {
       createdSpot =await dispatch(createASpot(payload));
    } catch (error) {
      const data = await error.json()
      setErrors([...Object.values(data.errors)])
    }
    //!!END
    history.push(`/spots/${createdSpot.id}`);
  
     

  
  };
    


const updateFile = (e) => {
  const file = e.target.files[0];
  if (file) setPreviewImage(file);
};

const handleCancelClick=(e)=>{
    e.preventDefault()
}


    return(
        
        <section className='new-form'>
        
            <div className="hello">
            <form className='create-spot-form' onSubmit={handleSubmit}>
            
            <label>Address</label>
            <input
            type='text'
            placeholder="Address"
            required
            value={address}
            onChange={(e) =>setAddress(e.target.value)}
            />
            
            <label>City</label>
            <input
            type='text'
            placeholder="City"
            required
            value={city}
            onChange={(e) =>setCity(e.target.value)}
            />
            <label>State</label>
            <input
            type='text'
            placeholder="State"
            required
            value={state}
            onChange={(e) =>setState(e.target.value)}
            />
            <label>Country</label>
            <input
            type='text'
            placeholder="Country"
            required
            value={country}
            onChange={(e) =>setCountry(e.target.value)}
            />
      
            <label>Latitude</label>
            <input
            type='number'
            placeholder="Lat"
            required
            value={lat}
            onChange={(e) =>setLat(e.target.value)}
            />
        
            <label>Longitude</label>
            <input
            type='number'
            placeholder="Lng"
            required
            value={lng}
            onChange={(e) =>setLng(e.target.value)}
            />
           
            <label>Name of the place</label>
            <input
            type='text'
            placeholder="Name"
            required
            value={name}
            onChange={(e) =>setName(e.target.value)}
            />
         
          <label> What is place so special?</label>
            <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            />
        
            <label htmlFor="files">Upload a picture of your place</label>
            <input
          type="file"
          title ="Upload a picture of your place"
          name="previewImage"
          placeholder="Image URL"
          onChange={updateFile} 
          />

         
          <label>Price Per Night</label>
          <input
            type='number'
            placeholder="Price Per Night"
            required
            value={pricePerNight}
            onChange={(e) =>setPricePerNight(e.target.value)}
            />
    
            <button type="submit" >Create new Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
        </div>
        </section>
    )

}

export default CreateSpotForm
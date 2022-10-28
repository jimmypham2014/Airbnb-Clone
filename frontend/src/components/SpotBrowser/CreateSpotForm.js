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
const [imageUrl, setImageUrl] = useState('');
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
        imageUrl,
        lat,
        lng,
        name,
        description,
        pricePerNight
    }
    setErrors([]);
    return dispatch(createASpot(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
}



const handleCancelClick=(e)=>{
    e.preventDefault()
}


    return(
        
        <section className='new-form'>
            <h1> Enter Your Information Below</h1>
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
          type="file"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e)=>setImageUrl(e.target.value)} 
          />
         

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
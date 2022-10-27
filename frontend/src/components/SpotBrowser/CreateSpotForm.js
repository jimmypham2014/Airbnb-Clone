import { useState,useEffect} from "react"
import { addOneSpot } from "../../store/spot"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { createASpot } from "../../store/spot"
import { ValidationError } from "../../utils/validationError"
import ErrorMessage from "./ErrorMessage"

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
const [errorMessages, setErrorMessages] = useState({});
const [errors, setErrors] = useState([]);



const handleSubmit= async (e)=>{

e.preventDefault();

   
const payload ={
        address,
        city,
        state,
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
    setErrorMessages({})
}

    return(
        
        <section className='new-form'>
            <h1> Enter Your Information Below</h1>
            <ErrorMessage message={errorMessages.overall} />
            <form className='create-spot-form' onClick={handleSubmit}>
   
            <input
            type='text'
            placeholder="Address"
            required
            value={address}
            onChange={(e) =>setAddress(e.target.value)}
            />
            <ErrorMessage label={"Address"} message={errorMessages.address} />

            <input
            type='text'
            placeholder="City"
            required
            value={city}
            onChange={(e) =>setCity(e.target.value)}
            />
            <ErrorMessage label={"City"} message={errorMessages.city} />

            <input
            type='text'
            placeholder="State"
            required
            value={state}
            onChange={(e) =>setState(e.target.value)}
            />
            <ErrorMessage label={"State"} message={errorMessages.state} />

            <input
            type='number'
            placeholder="Lat"
            required
            value={lat}
            onChange={(e) =>setLat(e.target.value)}
            />
            <ErrorMessage label={"Lat"} message={errorMessages.lat} />

            <input
            type='number'
            placeholder="Lng"
            required
            value={lng}
            onChange={(e) =>setLng(e.target.value)}
            />
            <ErrorMessage label={"Lng"} message={errorMessages.lng} />

            <input
            type='text'
            placeholder="Name"
            required
            value={name}
            onChange={(e) =>setName(e.target.value)}
            />
            <ErrorMessage label={"Name"} message={errorMessages.name} />

            <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            />
            <ErrorMessage label={"Description"} message={errorMessages.description} />

            <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e)=>setImageUrl(e.target.value)} 
          />
          <ErrorMessage label={"Imageg Url"} message={errorMessages.imageUrl} />

          <input
            type='number'
            placeholder="Price Per Night"
            required
            value={pricePerNight}
            onChange={(e) =>setPricePerNight(e.target.value)}
            />
            <ErrorMessage label={"Price Per Night"} message={errorMessages.pricePerNight} />
            <button type="submit" >Create new Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
        
        </section>
    )

}

export default CreateSpotForm
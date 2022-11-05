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
const [formErrors, setFormErrors] = useState({});
const [isSubmit , setIsSubmit] = useState(false)



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
    setFormErrors(validate(payload))
    setIsSubmit(true)
   
    let createdSpot;
    if(Object.keys(formErrors).length === 0 && isSubmit){
      createdSpot =await dispatch(createASpot(payload));
      history.push(`/spots/${createdSpot.id}`);
    
    }
  
  };

  const validate = (values) =>{
  console.log(values, 'helloo')
    const errors ={}
     const regex = /^[^\s@]+@[^\s@]+\/[^\s@]{2,}$/i
     if(!values.address){
      errors.address = "Address is required"
     }
     if(!values.city){
      errors.city = "City is required"
     }
     if(!values.state){
      errors.state= "State is required"
     }
     if(!values.country){
      errors.country = "Country is required"
     }
     if(!values.lat){
      errors.lat = "Latitude is required"
     }
     if(!values.previewImage){
      errors.previewImage = 'Please upload a photo'
     }
     if(!values.lng){
      errors.lng = "Longitude is required"
     }
     if(values.name.length >= 50){
      errors.name = 'Name must be less than 50 characters'
     }
     if(!values.description){
      errors.description = "Description is required"
     }
     if(!values.pricePerNight){
      errors.pricePerNight = "Price is required"
     }
     return errors
  }
    


const updateFile = (e) => {
  const file = e.target.files[0];
  if (file) setPreviewImage(file);
};

const handleCancelClick=(e)=>{
    e.preventDefault()
    history.push('/')
}


    return(
        
        <section className='new-form'>
        
            <div className="hello">
            <form className='create-spot-form' onSubmit={handleSubmit}>
            <div className="form-values">
            <label>Address</label>
            <p>{formErrors.address}</p>
            <input
            type='text'
            placeholder="Address"
            required
            value={address}
            onChange={(e) =>setAddress(e.target.value)}
            />
            </div>

           <div className="form-values">
            <label>City</label>
            <p>{formErrors.city}</p>
            <input
            type='text'
            placeholder="City"
            required
            value={city}
            onChange={(e) =>setCity(e.target.value)}
            />
            </div>
            <div className="form-values">
            <label>State</label>
            <p>{formErrors.state}</p>
            <input
            type='text'
            placeholder="State"
            required
            value={state}
            onChange={(e) =>setState(e.target.value)}
            />
            </div>
            <div className="form-values">
            <label>Country</label>
            <p>{formErrors.country}</p>
            <input
            type='text'
            placeholder="Country"
            required
            value={country}
            onChange={(e) =>setCountry(e.target.value)}
            />
            </div>
            <div className="form-values">
            <label>Latitude</label>
            <p>{formErrors.lat}</p>
            <input
            type='number'
            placeholder="Lat"
            required
            value={lat}
            onChange={(e) =>setLat(e.target.value)}
            />
            </div>
            <div className="form-values">
            <label>Longitude</label>
            <p>{formErrors.lng}</p>
            <input
            type='number'
            placeholder="Lng"
            required
            value={lng}
            onChange={(e) =>setLng(e.target.value)}
            />
            </div>
            <div className="form-values">
            <label>What's the name </label>
            <p>{formErrors.name}</p>
            <input
            type='text'
            placeholder="Name"
            required
            value={name}
            onChange={(e) =>setName(e.target.value)}
            />
            </div>

            <div className="form-values">
          <label> What is place so special?</label>
          <p>{formErrors.description}</p>
            <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            />
            </div>

            <div className="form-values">
            <label htmlFor="files">Upload a picture of your place</label>
            <p>{formErrors.previewImage}</p>
            <input
          type="file"
          title ="Upload a picture of your place"
          name="previewImage"
          placeholder="Image URL"
          onChange={updateFile} 
          />
          </div>
         
          <div className="form-values">
          <label>Price Per Night</label>
          <p>{formErrors.pricePerNight}</p>
          <input
            type='number'
            placeholder="Price Per Night"
            required
            value={pricePerNight}
            onChange={(e) =>setPricePerNight(e.target.value)}
            />
            </div>
            <button type="submit" >Create new Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>

        </form>
        </div>
        </section>
    )

}

export default CreateSpotForm
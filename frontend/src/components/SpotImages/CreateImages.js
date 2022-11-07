
import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { addImage} from "../../store/images";

const CreateAImage= ()=>{

    const {spotId} = useParams()
    console.log(spotId)

    const dispatch = useDispatch()
    const [url, setUrl] = useState('')
    const[errors, setErrors] = useState([])
    const sessionUser = useSelector(state =>state.session.user)
    const spots = useSelector(state => state.spots)
    console.log(sessionUser)

const spot =spots[spotId]

console.log(sessionUser)
console.log(spot, 'spotssss')


const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setUrl(file);
  };

const handleSubmit = async(e)=>{
    e.preventDefault()

    const payload ={
        url
    }
    console.log(payload, 'payloddd')


        await dispatch(addImage(spot.id,payload))
}


return (

<>
 
<form onSubmit={handleSubmit} className='image-form'>
  
<label htmlFor="files">Upload a picture of your place</label>
            <input
          type="file"
          title ="Upload more pictures"
          name="url"
          placeholder="Image URL"
          onChange={updateFile} 
          />


 <button type='submit'>Submit</button>

</form>



</>

)
}

export default CreateAImage
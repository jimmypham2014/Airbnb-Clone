
import { useState,useEffect} from "react"
import { addOneSpot } from "../../store/spot"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom';
import { addReview } from "../../store/reviews";
import './CreateReview.css'

const CreateAReview = ({spot})=>{
    const history = useHistory();
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const[errors, setErrors] = useState([])
    const sessionUser = useSelector(state =>state.session.user)
    console.log(sessionUser)

const handleSubmit = async(e)=>{
    e.preventDefault()

    const payload ={
        review,
        stars
    }
    console.log(payload, 'payloddd')

    try{
        await dispatch(addReview(spot.id,payload))
    } catch(error){
        const data = await error.json()
        setErrors([...Object.values(data.errors)])
    }
   
    setReview('')
    setStars('')
}
console.log(errors)


return (

<>

<form onSubmit={handleSubmit} className='review-form'>
  
<input
id="comment"
type='text'
placeholder="Your Comment Here"
value={review}
required
onChange={(e) =>setReview(e.target.value)}
/>
<label> <b>Rate this place from 1-5</b></label>
<input
id='star'
type='select'
min={0}
max={5}
placeholder="Your Rating"
value={stars}
required
onChange={(e) =>setStars(e.target.value)}
/>


{errors.map((error)=>{
    return(
       
       <div className="error_message">{error}</div> 
       
        
    )
})}
<button type='submit'>Submit</button>
</form>


</>

)
}

export default CreateAReview
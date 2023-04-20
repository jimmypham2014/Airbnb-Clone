
import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReview } from "../../store/reviews";
import './CreateReview.css'
import { Rate } from "antd";


const CreateAReview = ({spot})=>{
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const[errors, setErrors] = useState([])
    const sessionUser = useSelector(state =>state.session.user)
    console.log(sessionUser)

console.log(sessionUser)
console.log(spot, 'spotssss')

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

<Rate
onChange={(e)=> setStars(e) }
tooltips={["Terrible","Bad", "Normal", "Good", "Excellent"]}
/>

{errors.map((error)=>{
    return(
       
       <div className="error_message text-red-400">{error}</div> 
       
        
    )
})}

 { spot.User && spot.User.id !== sessionUser.id ?<button type='submit'>Submit</button>: <span> You cannot review your own place</span> }

</form>



</>

)
}

export default CreateAReview
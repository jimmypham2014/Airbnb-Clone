import { useHistory, useParams } from "react-router-dom"
import { useState,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSpot} from "../../store/spot"
import { ValidationError } from "../../utils/validationError"
import { updateReview } from "../../store/reviews"


const EditAReview = ({reviews})=>{
const dispatch = useDispatch()
const [review, setReview] = useState(reviews.review)
const [stars, setStars] = useState(reviews.stars)
const [errors, setErrors] =useState([])
const sessionUser = useSelector(state =>state.session.user)
console.log(sessionUser)


const handleSubmit = async(e)=>{
e.preventDefault()

const payload ={
    review,
    stars


}
try{
    await dispatch(updateReview(reviews.id,payload))
}catch(error){
    const data = await error.json()
    setErrors([...Object.values(data.errors)])
}
console.log(errors, 'errors')

}
 
    return (

        <>
        {errors.map((error)=>{
            return(
                <ul>
                <li>
                {error}
                </li>
                </ul>
            )
        })}
        <form onSubmit={handleSubmit} className='review-form'>
          
        <input
        id="comment"
        type='text'
        placeholder="Your Comment Here"
        value={review}
        onChange={(e) =>setReview(e.target.value)}
        />
        
        <input
        type='number'
        min={0}
        max={5}
        placeholder="Your Rating"
        value={stars}
        onChange={(e) =>setStars(e.target.value)}
        />
        
        {sessionUser&&(
            <button type='submit'>Submit</button>
        )}
       
        </form>
        
        
        </>
        )
        
}

export default EditAReview
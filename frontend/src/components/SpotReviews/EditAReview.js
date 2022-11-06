import { useHistory, useParams } from "react-router-dom"
import { useState,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSpot} from "../../store/spot"
import { ValidationError } from "../../utils/validationError"
import { updateReview } from "../../store/reviews"
import { Modal } from "../../context/Modal"
import './EditReview.css'


const EditAReview = ({reviews})=>{
const dispatch = useDispatch()
const [review, setReview] = useState(reviews.review)
const [stars, setStars] = useState(reviews.stars)
const [errors, setErrors] =useState([])
const [showModal, setShowModal] = useState(false);
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

        <div className="edit-form-container">
        <form onSubmit={handleSubmit} className='review-form'>
        
        <div className="comment">
        <label>Comment: </label>
        <input
        id="comment"
        type='text'
        placeholder="Your Comment Here"
        value={review}
        onChange={(e) =>setReview(e.target.value)}
        />
        </div>

        <div className="stars">
        <label>Rate from 1-5:</label>
        <input
        type='number'
        min={0}
        max={5}
        placeholder="Your Rating"
        value={stars}
        onChange={(e) =>setStars(e.target.value)}
        />
        </div>
        {sessionUser&&(
            <button type='submit' className="review-btn">Submit</button>
        )}
       
        </form>
        
        </div>
        </>
        )
        
}

export default EditAReview
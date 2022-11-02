
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


const handleSubmit = (e)=>{
    e.preventDefault()

    const payload ={
        review,
        stars
    }
    console.log(payload, 'payloddd')

    dispatch(addReview(spot.id,payload))
    setReview('')
    setStars('')
}


return (

<>
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
<button type='submit'>Submit</button>
</form>


</>

)
}

export default CreateAReview
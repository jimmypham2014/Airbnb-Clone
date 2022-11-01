
import { useState,useEffect} from "react"
import { addOneSpot } from "../../store/spot"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom';
import { addReiew } from "../../store/reviews";

const CreateAReview = ()=>{
    const history = useHistory();
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [star, setStar] = useState(0)
    const {spotId} = useParams()


const handleSubmit = (e)=>{
    e.preventDefault()

    const payload ={
        comment,
        star
    }
console.log('working')
    dispatch(addReiew(spotId,payload))
}


return (

<>
<form onSubmit={handleSubmit}>
  
<input
type='text'
placeholder="Your Comment Here"
required
value={comment}
onChange={(e) =>setComment(e.target.value)}
/>

<input
type='number'
min={0}
max={5}
placeholder="Your Rating"
required
value={star}
onChange={(e) =>setStar(e.target.value)}
/>

</form>
<button type='submit'>Submit</button>

</>

)
}

export default CreateAReview
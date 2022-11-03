//!!START SILENT
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, removeReview } from "../../store/reviews";
import profimg  from '../../images/pngwing.com.png'
import './SpotReviews.css'
import threeDot from '../../images/more.png'
import { useParams } from "react-router-dom";

//!!ADD
// import { useSelector } from "react-redux";
//!!END_ADD

const SpotReviews = ({ spot }) => {
 
    const {spotId} = useParams()
    const [open, setOpen] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    const reviews = useSelector(state =>state.reviews)
    console.log(sessionUser,'user')
    
    const allReviews = Object.values(reviews)
    console.log(allReviews,'helloo232')
//   const reviews = useSelector((state) => {
//     if (!spot.Reviews) return null;
//     return spot.reviews.map(reviewId => state.reviews[reviewId]);
//   });
  //!!START SILENT
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch,spotId]);


  const deletedReview = (e) =>{
    allReviews.forEach(review =>{
        if(review.userId === sessionUser.id){
            dispatch(removeReview(review.id))
        }
    })

  }
  const specificReview = allReviews.filter(review =>review.spotId === spot.id)
 


  //!!END
  return (specificReview.map(review =>{
    return <div className="review-box">
            <div className="comment-user">
            <div>
             <img src={profimg} alt=''/>
             {review.User&&(
             <span>{review.User.firstName}:</span>
             )}
             </div>
       
            {sessionUser&&(
             <button onClick={deletedReview} ><img src={threeDot} alt=''/>Delete</button>
             )}

             </div>
            <h5>{review.createdAt.slice(0, 10)}</h5>
            <h4>{review.review} </h4>
            
    
            
             </div>
  })
    
  )
};

export default SpotReviews;
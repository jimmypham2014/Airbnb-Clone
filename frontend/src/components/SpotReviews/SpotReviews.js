//!!START SILENT
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import profimg  from '../../images/pngwing.com.png'
import './SpotReviews.css'
//!!ADD
// import { useSelector } from "react-redux";
//!!END_ADD

const SpotReviews = ({ spot }) => {
 
    const reviews = useSelector(state =>state.reviews)
    
    
    const allReviews = Object.values(reviews)
    console.log(allReviews)
//   const reviews = useSelector((state) => {
//     if (!spot.Reviews) return null;
//     return spot.reviews.map(reviewId => state.reviews[reviewId]);
//   });
  //!!START SILENT
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(spot.id));
  }, [dispatch, spot.id]);
  //!!END
  return (allReviews.map(review =>{
    return <div className="review-box">
            <div className="comment-user"> <img src={profimg} alt=''/><span>{review.User.firstName}:</span></div>
            <h5>{review.createdAt.slice(0, 10)}</h5>
            <h4>{review.review} </h4>
            
    
    
             </div>
  })
    
  )
};

export default SpotReviews;
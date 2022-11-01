//!!START SILENT
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
//!!ADD
// import { useSelector } from "react-redux";
//!!END_ADD

const SpotReviews = ({ spot }) => {
 
    console.log(spot.reviews)
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
  return (spot.reviews && spot.reviews.map(review =>{
    return <div>{review.review}</div>
  })
    
  )
};

export default SpotReviews;
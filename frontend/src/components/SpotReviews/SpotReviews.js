//!!START SILENT
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviews, removeReview } from "../../store/reviews";
import profimg  from '../../images/pngwing.com.png'
import './SpotReviews.css'
import threeDot from '../../images/more.png'
import { useParams } from "react-router-dom";
import UpdateReview from "./EditAReview";
import EditReviewModal from "./EditReviewModal";

//!!ADD
// import { useSelector } from "react-redux";
//!!END_ADD

const SpotReviews = ({ spot }) => {
 
    const {spotId} = useParams()
    const [open, setOpen] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false);


    const sessionUser = useSelector(state => state.session.user);

    const reviews = useSelector(state =>state.reviews)
    console.log(reviews,'reviewwss')
    
    const allReviews = Object.values(reviews)
    console.log(allReviews,'helloo232')



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(spotId));
    setShowEditForm(false)
  }, [dispatch,spotId]);


  const deletedReview = (e) =>{
    allReviews.forEach(review =>{
        if(review.userId === sessionUser.id){
            dispatch(removeReview(review.id))
        }
    })

  }


  
  const specificReview = allReviews.filter(review =>review.spotId === spot.id)
 
  console.log(specificReview, 'specific review')


  //!!END
  return (specificReview.map(review =>{
    return <div className="review-box">
            <div className="comment-user">

            <div className="prof-user-name">
             <img src={profimg} alt=''/>
            
            {review.User&&(
              <span>{review.User.firstName}:</span>
      
            )}
             
             </div>
                
            {sessionUser && sessionUser.id === review.userId ?
             <button onClick={deletedReview} ><img src={threeDot} alt=''/>Delete</button>: null
             }

             {sessionUser &&sessionUser.id === review.userId ?
              <EditReviewModal review={review}/>: null
              }
              

             </div>
            
            <h4>{review.review} </h4>
            
            <h5>{review.createdAt.slice(0, 10)} </h5>
             </div>
  })
    
  )
};

export default SpotReviews;
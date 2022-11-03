import { csrfFetch } from "./csrf"

export const LOAD_REVIEWS = 'spot/loadReviews';
export const ADD_REVIEWS= 'spot/addReviews';
const REMOVE_REVIEW = 'review/removeReview'

const load = (reviews, spotId) => ({
    type: LOAD_REVIEWS,
    reviews,
    spotId
  });

export const addOneReview = (review) =>({
    type: ADD_REVIEWS,
    review

})

const remove = (reviewId) =>({
    type: REMOVE_REVIEW,
    reviewId
})
export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
  console.log(response, 'hellooo')
    if (response.ok) {
      const reviews= await response.json();
      dispatch(load(reviews, spotId));
    }
  };


export const addReview = (spotId,review) => async(dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review)
    })

    if(response.ok){
        const data = await response.json()
        console.log(data, 'reducer34534543535')
        dispatch(addOneReview(data))
        return data
    }
}

export const removeReview = (reviewId) => async (dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        }
    })
    if(response.ok){
 
        dispatch(remove(reviewId))
    }
}

export const updateReview = (reviewId,data) => async (dispatch)=>{
 
      
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
      method:"PUT",
      headers:{
          "Content-Type": "application/json",
      },
         body: JSON.stringify(data)
    })
    
    if(response.ok){
      const review = await response.json()
      console.log(review,'update reducer')
      dispatch(addOneReview(review))

      return review
    }
  }


const initialState ={}

export const reviewReducer = (state = initialState, action)=>{
    let newState1 ={...state}
 switch(action.type){
    case LOAD_REVIEWS: 
    const newReviews = {};
    action.reviews.Review.forEach(review => {
      newReviews[review.id] = review;
    })
    return {
      ...state,
      ...newReviews
    }
    case ADD_REVIEWS:
        const newState = {...state}
        action.review.forEach(review=>{
            newState[review.id]= review
        })
        return newState

    case REMOVE_REVIEW:
            delete newState1[action.reviewId]
            return newState1

    default:
        return state
 }


}
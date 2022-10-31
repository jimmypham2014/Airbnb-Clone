import { csrfFetch } from "./csrf"

export const LOAD_REVIEWS = 'spot/loadReviews';
export const ADD_REIVEWS= 'spot/addReviews';


const load = (reviews, spotId) => ({
    type: LOAD_REVIEWS,
    reviews,
    spotId
  });

export const addOneReview = spot =>({
    type: ADD_REIVEWS,
    spot
})


export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
  console.log(response, 'hellooo')
    if (response.ok) {
      const reviews= await response.json();
      dispatch(load(reviews, spotId));
    }
  };


export const addReiew = (review) => async(dispatch) =>{
    const response = await csrfFetch('/api/reviews',{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(addOneReview(data))
        return data
    }
}
const initialState ={}
export const reviewReducer = (state = initialState, action)=>{
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
    case ADD_REIVEWS:
    return{
        ...state,

    }
    default:
        return state
 }


}
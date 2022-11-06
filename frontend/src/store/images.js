import { csrfFetch } from "./csrf"

export const LOAD_IMAGES = 'spot/loadImages';
export const ADD_IMAGE= 'spot/addImage';
const REMOVE_IMAGE = 'review/removeImage'

const load = (reviews, spotId) => ({
    type: LOAD_IMAGES,
    reviews,
    spotId
  });

export const addOneReview = (image) =>({
    type: ADD_IMAGE,
    image

})

const remove = (imageId) =>({
    type: REMOVE_IMAGE,
    imageId
})
export const getImages = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/images`);
  console.log(response, 'hellooo')
    if (response.ok) {
      const images= await response.json();
      dispatch(load(images, spotId));
    }
  };


export const addImage= (spotId,review) => async(dispatch) =>{
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

export const imageReducer = (state = initialState, action)=>{
    let newState1 ={...state}
 switch(action.type){
    case LOAD_IMAGES: 
    const newImages = {};
    action.images.Images.forEach(image => {
        newImages[image.id] = image;
    })
    return {
      ...state,
      ...newImages
    }
    case ADD_IMAGE:
        const newState = {...state}
        action.image.forEach(image=>{
            newState[image.id]= image
        })
        return newState

    case REMOVE_IMAGE:
            delete newState1[action.imageId]
            return newState1

    default:
        return state
 }


}
import { csrfFetch } from "./csrf"

export const LOAD_IMAGES = 'spot/loadImages';
export const ADD_IMAGE= 'spot/addImage';
const REMOVE_IMAGE = 'review/removeImage'

const load = (reviews, spotId) => ({
    type: LOAD_IMAGES,
    reviews,
    spotId
  });

export const addOneImage = (image) =>({
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


export const addImage= (spotId,data) => async(dispatch) =>{
    const{ url} = data

    const formData = new FormData()
   formData.append("url", url);


    for(const dataFiles of formData.entries()){
        console.log(dataFiles)
      }
 

  const response = await csrfFetch(`/api/spots/${spotId}/images`,{
    method:"POST",
    headers:{
        "Content-Type": "multipart/form-data",
    },
       body: formData,
  })
  if(response.ok){
    const image = await response.json()
    dispatch(addOneImage(image))
    return image
  }
}

export const removeReview = (reviewId) => async (dispatch)=>{
    const response = await csrfFetch(`/api/images/${reviewId}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        }
    })
    if(response.ok){
 
        dispatch(remove(reviewId))
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
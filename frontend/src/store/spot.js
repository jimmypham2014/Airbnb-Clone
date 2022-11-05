import { csrfFetch } from "./csrf"
import { LOAD_REVIEWS, ADD_REVIEWS } from "./reviews"
const ADD_SPOT = 'spots/addSpots'
const LOAD = 'spots/LOAD'
const REMOVE_SPOT = 'spots/REMOVE'


const load = list =>({
    type:LOAD,
    list
})


export const addOneSpot = spot =>({
    type: ADD_SPOT,
    spot
})

const remove = (spotId) =>({
    type: REMOVE_SPOT,
    spotId
})

export const createASpot =(data) => async (dispatch) =>{
    
    const{ address,city,state,country,previewImage,lat,lng,name, description, pricePerNight} = data

    const formData = new FormData()
    formData.append("address",address)
    formData.append("city",city)
    formData.append("state",state)
    formData.append("name",name)
    formData.append("country",country)
    formData.append("lat",lat)
    formData.append("lng",lng)
    formData.append("description",description)
    formData.append("pricePerNight",pricePerNight)


    if (previewImage) formData.append("previewImage", previewImage);
    for(const dataFiles of formData.entries()){
        console.log(dataFiles)
      }
 

  const response = await csrfFetch(`/api/spots`,{
    method:"POST",
    headers:{
        "Content-Type": "multipart/form-data",
    },
       body: formData,
  })
  if(response.ok){
    const spot = await response.json()
    dispatch(addOneSpot(spot))
    return spot
  }
}

export const updateSpot = (id,data) => async (dispatch)=>{
 
      
  const response = await csrfFetch(`/api/spots/${id}`,{
    method:"PUT",
    headers:{
        "Content-Type": "application/json",
    },
       body: JSON.stringify(data)
  })
  
  console.log(response, 'hello 3')
  if(response.ok){
    const spot = await response.json()
    dispatch(addOneSpot(spot))
    console.log(spot, 'hello 2')
    return spot
  }
}


const initialState = {};

export const getAllSpots  = () => async dispatch =>{
    const response = await fetch(`/api/spots`)
    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}

export const getSingleSpotDetail = (id,data) => async dispatch =>{
    const response = await fetch(`/api/spots/${id}`)

    if(response.ok){
        const {Spot}= await response.json()
        console.log(Spot,'hello4')
        dispatch(addOneSpot(Spot))
        return Spot
    }
}

export const deleteSpot = (spotId) =>async dispatch =>{
    console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        }
    })
    if(response.ok){
 
        dispatch(remove(spotId))

    }
}


export const spotReducer =(state = initialState, action)=>{
    let newState;
    switch(action.type){
        case LOAD:
             newState ={...state}
        action.list.spotList.forEach(spot =>{
            newState[spot.id] = spot
        });
        return newState
        
        case ADD_SPOT:
             newState = {...state}
            
            newState[action.spot.id] = action.spot
             return newState

        case REMOVE_SPOT:
            newState ={...state}
            delete newState[action.spotId]
            return newState

            case LOAD_REVIEWS:
                return {
                    ...state,
                    [action.spotId]: {
                        ...state[action.spotId],
                       reviews: action.reviews.Review.map((review) => review),
                    },
                };
            


        default:
      return state;
    }
}
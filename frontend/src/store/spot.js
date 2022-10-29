import { csrfFetch } from "./csrf"
const ADD_SPOT = 'spots/addSpots'
const LOAD = 'spots/LOAD'


const load = list =>({
    type:LOAD,
    list
})


export const addOneSpot = spot =>({
    type: ADD_SPOT,
    spot
})

export const createASpot =(data) => async (dispatch) =>{
    const{ address,city,state,country,previewImage,lat,lng,name, description, pricePerNight} = data
    console.log(data)

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
       body: formData
  })
  if(response.ok){
    const spot = await response.json()
    dispatch(addOneSpot(spot))
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

export const getSingleSpotDetail = (id) => async dispatch =>{
    const response = await fetch(`/api/spots/${id}`)

    if(response.ok){
        const detail = await response.json()
        dispatch(addOneSpot(detail))
        return detail
    }
}



export const spotReducer =(state = initialState, action)=>{
    switch(action.type){
        case LOAD:
        action.list.spotList.forEach(spot =>{
            initialState[spot.id] = spot
        });
        return{
            ...initialState,
            
        };
        case ADD_SPOT:
            const newState = {...state}
            newState[action.spot.id] = action.spot
             return newState


        default:
      return state;
    }
}
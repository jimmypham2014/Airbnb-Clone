
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
  const response = await fetch(`/api/spots`,{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(data)
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

        default:
      return state;
    }
}

const ADD_SPOT = 'spots/addSpots'
const LOAD = 'spots/LOAD'

const load = list =>({
    type:LOAD,
    list
})


const initialState = {};

export const getAllSpots  = () => async dispatch =>{
    const response = await fetch(`/api/spots`)
    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}



export const spotReducer =(state = initialState, action)=>{
    switch(action.type){
        case LOAD:
        const allSpots ={};
        action.list.spotList.forEach(spot =>{
            allSpots[spot.id] = spot
        })
        return{
            ...state,
            ...allSpots
        }
        default:
      return state;
    }
}
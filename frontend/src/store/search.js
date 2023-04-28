const SEARCH = 'searching'

export const searching = spot =>({
    type: SEARCH,
    spot
})


const initialState = {};

export const searchReducer =(state = initialState, action)=>{
    let newState;
    switch(action.type){
        case SEARCH:
             newState = {...state}
            
            newState = action.spot
             return newState


        default:
      return state;
    }
}
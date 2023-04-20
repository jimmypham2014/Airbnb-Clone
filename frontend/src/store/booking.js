
const LOAD_BOOKING = '/bookings/LOAD_BOOKING'
const ADD_BOOKING = '/bookings/ADD_BOOKING'

const load = (bookings)=>({
    type:LOAD_BOOKING,
    paylod:bookings

})

const add_booking = (booking)=>({
    type:ADD_BOOKING,
    payload:booking
})


export const loadBookings = ()=> async(dispatch)=>{
    const res = await fetch('/api/bookings')
    if(res.ok){
        const bookings = await res.json();
        dispatch(load(bookings))
    }
}


export const addBooking = (spotId,booking) => async(dispatch)=>{
    const res = await fetch(`/api/spots/${spotId}/bookings`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify( booking)

    })
    if(res.ok){
        const data = await res.json()
        dispatch(add_booking(data))
        return data
    }
    else{
        const errors = await res.json()
        return errors
    }
}

const defaultState = {}

const bookingReducer = (state = defaultState, action) =>{
    let newState={...state}
    switch(action.type){
        case ADD_BOOKING:
            newState[action.payload.id] = action.payload
            return newState

        case LOAD_BOOKING:
            action.payload.forEach(booking=>{
                newState[booking.id] = booking
            })
            return newState


        default:
            return state
    }
}
export default bookingReducer
import { csrfFetch } from "./csrf"
const LOAD_BOOKING = '/bookings/LOAD_BOOKING'
const ADD_BOOKING = '/bookings/ADD_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

const load = (bookings)=>({
    type:LOAD_BOOKING,
    payload:bookings

})

const add_booking = (booking)=>({
    type:ADD_BOOKING,
    payload:booking
})
const remove_booking = (booking) =>({
    type: DELETE_BOOKING,
    payload: booking
})


export const loadBookings = ()=> async(dispatch)=>{
    const res = await csrfFetch('/api/bookings/current')
    if(res.ok){
        const bookings = await res.json();
        dispatch(load(bookings))
    }
}


export const addBooking = (spotId,booking) => async(dispatch)=>{
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`,{
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

export const deleteBooking = (bookingId)=> async(dispatch) =>{
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
    method:"DELETE",
    headers:{
        "Content-Type": "application/json"
    }
    })
    if(res.ok){
        dispatch(remove_booking(bookingId))
    }else{
        const error = await res.json()
        return error
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
            action.payload.bookings.forEach(booking=>{
                newState[booking.id] = booking
            })
            console.log(typeof action.payload, 'helloooooo')
            return newState

        case DELETE_BOOKING:
            delete newState[action.payload]
            return {...newState}


        default:
            return state
    }
}
export default bookingReducer
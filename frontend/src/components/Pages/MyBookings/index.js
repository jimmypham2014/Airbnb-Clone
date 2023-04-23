import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBooking, loadBookings } from '../../../store/booking'

function MyBookings(){

 const bookings = useSelector(state=>Object.values(state.bookings))
 const currentUser = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
 useEffect(()=>{
    dispatch(loadBookings())

 },[dispatch])

 console.log(bookings)
 console.log(currentUser)
 return(
     <div className='content-wrap flex items-center justify-center '>

     <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 gap-[50px] max-w-sm max-auto md:max-w-none md:mx-0 gap-y-8 h-[100px]'>
      {bookings.map(booking => booking.userId === currentUser.id &&
         (<div className='p-3'>
         
            <div>
            <img className='w-[300px] h-[250px] rounded-t-lg' src={booking.Spot.previewImage}/>
            </div>

            <h4>Booking Info:</h4>

            <div className='flex'>
            <span>From:</span>
            <div className='pl-2'>{booking.startDate}</div>
            
            <span className='pl-2'>To:</span>
            <div className='pl-2'>{booking.endDate}</div> 
            </div>

            <div className='flex items-center '>
            <div><button>Update</button></div>
            <div className='pl-2'><button onClick={()=> dispatch(deleteBooking(booking.id))}>Delete</button></div>
            </div>
            

         </div>)
      
      )}
      </div>
        
    
     
     
     </div>

 )

}

export default MyBookings
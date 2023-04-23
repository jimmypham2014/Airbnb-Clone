import React, { useState } from 'react'
import './CreateBooking.css'
import { DatePicker } from 'antd'
import { addBooking } from '../../store/booking'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function BookingForm({spotId}){
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [numGuests, setNumGuests] = useState(1)
    const [errors, setErrors] = useState([])
    const dispatch  = useDispatch()
    const history = useHistory()


    const handleSubmit = async (e)=>{
        e.preventDefault()

        const payload ={
            startDate,
            endDate,
            numGuests
        }

       try{
         await dispatch(addBooking(spotId,payload))
         alert('You have successfully booked this place!')
         history.push('/myBookings')


       } catch(error){
           const data= await error.json()
           setErrors([...Object.values(data.errors)])
       }
        


    }
     console.log(errors)

return(

    <>

    {errors.map((error)=>{
        return(
           
           <div className="error_message text-red-400">{error}</div> 
           
            
        )
    })}
    <form className='w-[30rem]' onSubmit={handleSubmit}>
    <div className='check-in-container'>
    <div className='check-in-out'>
    <div id='in'>
    <label>Check In</label>
    <input
    type ='date'
    required
    value={startDate}
    onChange={(e) =>setStartDate(e.target.value)}
    />
    </div>
    <div id='out'>
    <label>Check Out</label>
    <input
    type ='date'
    required
    value={endDate}        
    onChange={(e) =>setEndDate(e.target.value)}
    />
    </div>
    </div>

   <div className='check-in-guest'>
    <label>Guests</label>
    <div className='guest-option'>
    <select value={numGuests} onChange={(e) =>setNumGuests(e.target.value)}>
    <option value={1}> 1 Guest</option>
    <option value={2}> 2 Guests</option>
    <option value={3}> 3 Guests</option>
    <option value={4}> 4 Guests</option>
    <option value={5}> 5 Guests</option>
    <option value={6}> 6 Guests</option>
    <option value={7}> 7 Guests</option>
    <option value={8}> 8 Guests</option>
    <option value={9}> 9 Guests</option>
    <option value={10}> 10 Guests</option>
    
    </select>
    </div>
   </div>
   
  
    </div>
    <button className='reserve_btn mt-3' type='submit'>Reserve</button>
    </form>

  

    </>
)




}


export default BookingForm
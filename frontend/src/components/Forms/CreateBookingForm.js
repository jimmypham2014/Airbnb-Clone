import React, { useState } from 'react'
import './CreateBooking.css'
import { DatePicker } from 'antd'
import { addBooking } from '../../store/booking'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function BookingForm({spotId}){
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [numGuests, setNumGuests] = useState(1)
    const [errors, setErrors] = useState([])
    const dispatch  = useDispatch()
    const history = useHistory()
    const spots = useSelector(state =>{
        return state.spots
      })
    
    
    
      const spot = spots[spotId]



    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    const diff_in_time = date2.getTime() - date1.getTime()
    const diff_in_days = diff_in_time/ (1000 *3600 *24)

    console.log(diff_in_time, 'helllo')
    console.log(diff_in_days)

    const cleaningFee = spot.pricePerNight * (diff_in_days ? diff_in_days:0) * .10
    const totalPricePerNight = spot.pricePerNight * (diff_in_days ? diff_in_days:0)
    const serviceFee= Math.round((spot.pricePerNight * (diff_in_days ? diff_in_days:0) * .03) *100)/100

    const totalBeforeTax = cleaningFee + totalPricePerNight +serviceFee



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


       } catch(error){
           const data= await error.json()
           setErrors([...Object.values(data.errors)])
       }
        


    }
     console.log(errors)

return(

    <div className='flex flex-col items-center justify-center '>

    {errors.map((error)=>{
        return(
           
           <div className="error_message text-red-400">{error}</div> 
           
            
        )
    })}


    <div className='flex items-center justify-center'>
    <form className='w-[30rem] pl-[100px]' onSubmit={handleSubmit}>
    <div className='check-in-container'>
    <div className='check-in-out'>
    <div id='in' className='w-[100px]'>
    <label>Check In</label>
    <input
    className='w-[120px]'
    type ='date'
    required
    value={startDate}
    onChange={(e) =>setStartDate(e.target.value)}
    />
    </div>
    <div id='out'>
    <label>Check Out</label>
    <input
    className='w-[130px]'
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

    </div>


    <div className='booking-price-details flex flex-col justify-center items-center w-6'>
     
    <div className='total-price-per-night'>
    <span>${spot.pricePerNight} x {diff_in_days ? `${diff_in_days} nights`  : `0 night`} </span>
     <span>${totalPricePerNight }</span> 
   </div>

    <div className='clearning-fee'>
    <span>Cleaning fee</span>
    <span>${cleaningFee}</span>
    </div>

    <div className='service-fee'>
    <span>Service fee</span>
    <span>${serviceFee}</span>
    </div>

    <div className='total-before-tax'>
    <h2>Total before taxes</h2>
     <span>${totalBeforeTax}</span>
    </div>

  </div>
  

  </div>
)




}


export default BookingForm
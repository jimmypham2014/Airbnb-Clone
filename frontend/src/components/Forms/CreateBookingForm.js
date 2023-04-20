import React, { useState } from 'react'
import './CreateBooking.css'

function BookingForm(){
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [guest, setGuest] = useState(1)


return(

    <>
    <form>
    <div className='check-in-container'>
    <div className='check-in-out'>
    <div id='in'>
    <label>Check In</label>
    <input
    type ='date'
    required
    value={checkInDate}
    onChange={(e) =>setCheckInDate(e.target.value)}
    />
    </div>
    <div id='out'>
    <label>Check Out</label>
    <input
    type ='date'
    required
    value={checkOutDate}        
    onChange={(e) =>setCheckOutDate(e.target.value)}
    />
    </div>
    </div>

   <div className='check-in-guest'>
    <label>Guests</label>
    <div className='guest-option'>
    <select value={guest} onChange={(e) =>setGuest(e.target.value)}>
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
    <button className='reserve_btn' type='submit'>Reserve</button>
    </form>



    </>
)




}


export default BookingForm
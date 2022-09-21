const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {User,Spot,Image,Review,Booking} =require('../../db/models');
const { validateReview, validateBooking } = require('../../utils/validation');
const { validationResult } = require('express-validator');
const database = require('../../config/database');


router.get('/current', requireAuth, async (req,res)=>{
    const bookings = await Booking.findAll({
        include:{
            model:Spot,
            attributes:['id','address','city','state','country','lat','lng','name','description', 'previewImage','createdAt', 'updatedAt']
        }
    })
    if(!bookings){
        res.status(404).json({
            message: "You don't have any bookings",
            statusCode: 404
        })
    }
    res.json({currentUser:bookings})
})

router.put('/:id', requireAuth,validateBooking,async (req,res)=>{
    const bookingId = req.params.id
    const{startDate,endDate} = req.body
    let todayDate = new Date();
    

    const existingBook = await Booking.findOne({
        where:{
            id:bookingId,
        }})
        if(!existingBook){
            return res.status(404).json({
                message: "Booking couldn't be found",
                statusCode: 404
            })
        }

    const spotId = existingBook.spotId
    const existingBookingSpot = await Booking.findAll({
        where:{
            spotId
        }})
 /* --------------------------------------------- */
 let dates = []
 const getDatesBetweenDates = (startDate, endDate) => {

    //to avoid modifying the original date
    const theDate = new Date(startDate)
    while (theDate <= endDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, endDate]
    console.log(dates)
  }

const d1 = new Date(existingBook.startDate)
const d2 = new Date(existingBook.endDate)

getDatesBetweenDates(d1, d2)

dates.forEach(date=>{
    console.log(new Date(startDate),date)
    if(new Date(startDate) === date){
        res.json({message:'thers a conflict'})
    }
})
      
        

/* --------------------------------------------- */

            /* this spot is already booked for the specified dates*/
            existingBookingSpot.map(eachSpot =>{
                if(startDate === eachSpot.startDate && endDate === eachSpot.endDate){
                    return res.status(403).json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        statusCode: 403,
                        errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                                }
                            })
                            } 
                    })

    
          /*Past bookings can't be modified */              
        let existingBookingEndDate = new Date(existingBook.endDate)

        if(todayDate > existingBookingEndDate){
            return res.status(403).json({
                message: "Past bookings can't be modified",
                statusCode: 403
            })
        }

        const errors = validationResult(req)
         if(!errors.isEmpty()){
        let errorObject = {}
        let errorArray = errors.errors.map(e=> {
            let key = e.param
            let value = e.msg
            return {
                [key] : value
            }
        })
        errorArray.forEach(error =>{
            errorObject = {...errorObject,...error} 
        })
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors:errorObject
        })
        }
        existingBook.update({
            startDate,
            endDate
        })
       return res.json(existingBook) 

    })

    /*  Delete BOOKING*/

    router.delete('/:id', requireAuth,async (req,res)=>{
        const bookingId = req.params.id
        const existingBooking = await Booking.findOne({where:{id:bookingId}})
        if(!existingBooking){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        } else{
        await existingBooking.destroy();
        return res.json({
            message: "Successfully deleted",
          statusCode: 200
        })
        }
    })

module.exports = router;
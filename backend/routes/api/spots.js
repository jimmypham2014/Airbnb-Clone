const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {validateSpot, validateReview, validateBooking} = require('../../utils/validation')
const {Op} = require('sequelize')
const {User,Spot,Image,Review,Booking, sequelize} =require('../../db/models');
const { body,validationResult } = require('express-validator');
router.get(
    '/',
    async (req,res)=>{
        let page = parseInt(req.query.page, 10)
        let size = parseInt(req.query.size,25)
    const allSpots = await Spot.findAll({
        include:{
            model:Image,
        },
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','pricePerNight','previewImage','createdAt','updatedAt'],

    });

    
    
let spotList = []
allSpots.forEach(spot=>{
    spotList.push(spot.toJSON())
})

spotList.forEach(spot=>{
        spot.Images.forEach(image=>{
            if(image.preview === true){
                spot.previewImage = image.url
            } else if(!spot.previewImage){
                spot.previewImage = 'There is no preview image right now'
                }
            })
                 delete spot.Images
        })


  res.json(spotList)
})


//CREATE A SPOT --------------------------------------------------
router.post('/',requireAuth, 
  validateSpot,
async (req,res,next)=>{
    const ownerId = req.user.id
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        //putting objects together
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
  
    const {address,city,state,country,lat,lng,name,description,pricePerNight} = req.body
  
    const newSpot = await Spot.create({ownerId, address,city,state,country,lat,lng,name,description,pricePerNight})
  
    res.json(newSpot)
  })
  
// ...

//add an image to a spot based on the spot'id ----------------------------------------------------
router.post('/:id/images',restoreUser,requireAuth,async (req,res)=>{
const spotId = req.params.id
const{url,preview} = req.body
//find owerID in the spot
    const spot = await Spot.findOne({
        include:{
            model:Image
        },
        where:{
            id:spotId
        }})
    if(!spot){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } 
        const addImage = await spot.createImage({
            url,
            preview
        })
    



res.json(addImage)

})
/*---------------------------------------------------------------------------------- */
//get all spots of current user
router.get('/current',restoreUser, requireAuth,async (req,res)=>{
    const { user } = req;

     
    const allSpots = await Spot.findAll({
        include:[{
            model:Image,

        }],
        where:{ownerId:user.id},
    
    })


    let spotList = []

allSpots.forEach(spot=>{
    spotList.push(spot.toJSON())
})


 //add preview image
 let newArr =[]
    spotList.forEach( async (spot,i)=>{
                //addding preview image
        spot.Images.forEach(image =>{
            if(image.preview === true){
                spot.previewImage = image.url
            } else if(!spot.previewImage){
                spot.previewImage = 'There is no preview image right now'
            }
        })

        const AvgRatingAndnumReviews = await Spot.findOne({
            where:{
                id:spot.id,   
            },
            attributes:{
                include:[
                    [
                        sequelize.fn("COUNT",sequelize.col('Reviews.id')),'numReviews',
                    ],
                    [
                        sequelize.fn("AVG",sequelize.col('Reviews.stars')),'avgRating'
                    ],
                ]
            },
            include:{ model:Review,attributes:[] }
        })

        spot.avgRating = AvgRatingAndnumReviews.avgRating
        spot.numReviews = AvgRatingAndnumReviews.numReviews

        delete spot.Images

        newArr.push(spot)
        // this condition makes sure that the function reaches the last index before res.json because of async function
        if(i === spotList.length -1) res.json({Spots:newArr}) 

    })
   
    
})

//Get details of spot from an id

router.get('/:id',requireAuth,async(req,res)=>{
    const spotId = req.params.id
    const existingSpot = await Spot.findByPk(spotId,{
        include:[{
            model:Image
        },{
            model:User,
            attributes:['id','firstName','lastName']
        }],
    })
    if(!existingSpot){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } 

    const findNumOfReviewsAndAverageRating = await Spot.findOne({
        where:{
            id:spotId,
        },
        attributes:{
            include:[
                [
                    sequelize.fn("COUNT",sequelize.col('Reviews.id')),'numReviews',
                ],
                [
                    sequelize.fn("AVG",sequelize.col('Reviews.stars')),'avgRating'
                ],
               
            ]
        },
        include:{
            model:Review,
            attributes:[]
            
        }
    })


existingSpot.numReviews = findNumOfReviewsAndAverageRating.numReviews
existingSpot.avgRating =findNumOfReviewsAndAverageRating.avgRating


/* Adding preview image in the details of spot*/
existingSpot.Images.forEach(image =>{
     if( image.preview === true){
        existingSpot.previewImage = image.url
     } 
})
if(!existingSpot.previewImage){
    existingSpot.previewImage = "There is no preview image right now"
 } 
 
if(!existingSpot.avgRating){
    existingSpot.avgRating = " There is no review currently"
 }
// let newExistingSpot = {}
// for (let key in existingSpot) {
//     if (key === "Images") {
//         newExistingSpot["SpotImages"] = existingSpot[key]
//     } else if (key === "User") {
//         newExistingSpot["Owner"] = existingSpot[key]
//     } else {
//         newExistingSpot[key] = existingSpot[key]
//     }
// }
//     console.log(newExistingSpot)
       return res.json({Spot:existingSpot})
    
    
})


// find a spot with their associated reviews
// router.get('/:id/reviews',requireAuth,async (req,res) =>{
//     const spotReviewAggData = await Spot.findByPk(req.params.id,{
//         include:{
//             model:Review,
//             attributes: []
//         },
//         attributes: [
//             sequelize.fn("COUNT",sequelize.col('id')),
//             'numReviews',

//             sequelize.fn("AVG",sequelize.col('stars')),
//             'avgRating',
//         ],
//         raw:true
//     })
// })



// edit a spot

router.put('/:id',requireAuth,
validateSpot
,
async (req,res,next)=>{
    const spotId = req.params.id
    const spot = await Spot.findOne({
        where:{
            id:spotId,
        },
        attributes:['id','address','city','state','country','lat','lng','name','description','pricePerNight','createdAt','updatedAt']
    })
    const {address,city, state,country,lat,lng,name,description,pricePerNight} = req.body
        
    if(!spot)[
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    ]

    
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
    spot.update(
        {address,city, state,country,lat,lng,name,description,pricePerNight},
        
    )

    return res.json(spot)
})


//delete a spot
router.delete('/:id', requireAuth,async (req,res)=>{
    const spotId = req.params.id
    const spot = await Spot.findOne({where:{id:spotId}})
    if(!spot){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } else{
    await spot.destroy();
    return res.json({
        message: "Successfully deleted",
      statusCode: 200
    })
    }
})



//Create a review for a spot based on the spot's id
router.post('/:id/reviews/',requireAuth,validateReview,async (req,res,next)=>{
    const spotId = req.params.id
    const userId = req.user.id

    const existingReview = await Review.findOne({
        where:{
            spotId
        }})

    const spot = await Spot.findOne({
        include:{
            model: Review
        },
        
        where:{id:spotId}})

    if(existingReview){
        const err = new Error('User already has a review for this spot')
        err.status = 403
        res.json({
            message: err.message,
            statusCode: err.status
        })
        next(err)
    }else if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.json({
            message: err.message,
            statusCode: err.status
        })
        next(err)

    }else{

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
    const {review,stars} = req.body
    const addReview = await spot.createReview({
        userId,
        spotId,
        review,
        stars

    })

        res.json(addReview)
}


})

//get reviews by spot Id

router.get('/:id/reviews',requireAuth, async(req,res)=>{
    const spotId = req.params.id
    const userId = req.user.id
    const spot = await Spot.findByPk(req.params.id)

    if(spot){
        const existingReviews = await Review.findAll({where:{spotId:spot.id}})
        res.json(existingReviews)
    }else {
        res.status(404).json({
            message:"Spot couldn't be found",
            statusCode: 404
        })
    }

})


/* CREATE A BOOKING FRMOA SPOT BASED on SPOT ID*/

router.post('/:id/bookings', requireAuth,validateBooking,async (req,res) =>{
    const spotId = req.params.id
    const userId = req.user.id
    const spot =await Spot.findOne({
        include:{
            model:Booking
        },
        where:{id:spotId}
    })
    const {startDate,endDate} =req.body

    const booking = await Booking.findOne({
        where:{
            startDate,
            endDate,
        }
    })
    
    if(!spot){
        res.status(404).json({
            message:"Spot couldn't be found",
            statusCode: 404
        })
    }   else if(booking){
        const err = new Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        res.json({
            message: err.message,
            statusCode: err.status,
            errors:{
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }

        })
    } else  {
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

    const addBooking = await spot.createBooking({
        spotId,
        userId,
        startDate,
        endDate
    })
    res.json(addBooking)
    }

})

/* GET ALL BOOKINGS BY SPOT ID*/

    router.get('/:id/bookings',requireAuth,async (req,res)=>{
        const spotId = req.params.id

        const spot = await Spot.findOne({where:{id:spotId}})
         if(!spot){
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
         }
         const Bookings = await Booking.findAll({
            include:[{
                model:User,
                attributes:['id','firstName','lastName']
            }],
         })
        res.json({Bookings})
    })


    // AVERAGE number of review

    


module.exports = router;
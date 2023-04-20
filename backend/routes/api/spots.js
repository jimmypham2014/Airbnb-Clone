const {singlePublicFileUpload} = require('../../awsS3')
const {singleMulterUpload }=require('../../awsS3')


const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {validateSpot, validateReview, validateBooking} = require('../../utils/validation')
const {User,Spot,Image,Review,Booking, sequelize} =require('../../db/models');
const {validationResult } = require('express-validator');
router.get(
    '/',
    async (req,res)=>{
        let { page, size } = req.query;

        page = parseInt(page);
        size = parseInt(size);
      
        if (Number.isNaN(page)) page = 1;
        if (Number.isNaN(size)) size = 20;

    let { maxLat,minLat,minLng,maxLng,minPrice,maxPrice} = req.query;


    const allSpots = await Spot.findAll({
        include:{
            model:Image,
        },
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','pricePerNight','previewImage','avgRating','createdAt','updatedAt'],
        ORDER:['id','DESC'],
        limit: size,
        offset: size * (page - 1),
    });

    
    
let spotList = []
allSpots.forEach(spot=>{
    spotList.push(spot.toJSON())
})

spotList.forEach(spot=>{
        spot.Images.forEach(image=>{
            if(image.previewImage === true){
                spot.previewImage = image.url
            }
            if(!spot.previewImage){
                spot.previewImage = 'There is no preview image right now'
                }
            })
                 delete spot.Images
        })
  res.json({spotList,
    page,
    size})
})


//CREATE A SPOT --------------------------------------------------
router.post('/',requireAuth,singleMulterUpload('previewImage'),
async (req,res,next)=>{

    const {address,city,state,country,lat,lng,name,description,pricePerNight} = req.body;


    const ownerId = req.user.id;

    const previewImage = await singlePublicFileUpload(req.file)
  
    const newSpot = await Spot.create({ownerId, address,city,state,country,lat,lng,name,description,pricePerNight,previewImage})
  
   return  res.json(newSpot)
  })

// ...


router.get('/:id/images',requireAuth,async(req,res)=>{
    const spotId = req.params.id
    const spot = await Spot.findByPk(req.params.id)

    if(spot){
        const existingImages = await Image.findAll({
            where:{spotId:spot.id},
        })
        res.json({Images:existingImages})
    }else {
        res.status(404).json({
            message:"Spot couldn't be found",
            statusCode: 404
        })
    }

})


//add an image to a spot based on the spot'id ----------------------------------------------------
router.post('/:id/images',restoreUser,requireAuth,async (req,res)=>{
const spotId = req.params.id
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
    const url = await singlePublicFileUpload(req.file)
        const addImage = await spot.createImage({
            url,
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
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','pricePerNight','previewImage','createdAt','updatedAt']
    
    })

    let spotList = []

allSpots.forEach(spot=>{
    if(!spot.previewImage){
        spot.previewImage = 'There is no preview image right now'
    }
    spotList.push(spot.toJSON())
})
//avgRating


 //add preview image
    spotList.forEach((spot)=>{
                //addding preview image
        spot.Images.forEach(image =>{

            if(image.previewImage === true){
                spot.previewImage = image.url
            }
        })
        delete spot.Images

    })
    res.json(spotList)
   
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
        attributes:['id','address','city','state','country','lat','lng','name','description','pricePerNight','numReviews','avgRating','previewImage','createdAt','updatedAt']
    })
    if(!existingSpot){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } 

    const findNumOfReviewsAndAverageRating = await Spot.findOne({
        where:{
            id:spotId
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
        include:[{
            model:Review,
            attributes:[]
            
        }],
        group:['Spot.id']
    })

console.log(findNumOfReviewsAndAverageRating)
existingSpot.numReviews = findNumOfReviewsAndAverageRating.numReviews
existingSpot.avgRating =findNumOfReviewsAndAverageRating.avgRating


/* Adding preview image in the details of spot*/
existingSpot.Images.forEach(image =>{
     if( image.previewImage === true){
        existingSpot.previewImage = image.url
     } 
})
if(!existingSpot.previewImage){
    existingSpot.previewImage = "There is no preview image right now"
 } 
 
if(!existingSpot.avgRating){
    existingSpot.avgRating = " There is no review currently"
 }
       return res.json({Spot:existingSpot})
 
});

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
    const {address,city, state,country,lat,lng,name,description,pricePerNight,previewImage} = req.body
        
    if(!spot)[
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    ]

    
    spot.update(
        {address,city, state,country,lat,lng,name,description,pricePerNight,previewImage},
        
    )

    return res.json(spot)
})


//delete a spot
router.delete('/:id', requireAuth,async (req,res)=>{
    const {user} = req
    const spot = await Spot.findOne({
        where:{
            id:req.params.id,
            ownerId:user.id
        }})
 
    if(!spot){
      return  res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } else{
    await spot.destroy();
    return res.status(200).json({
          message: "Successfully deleted",
         statusCode: 200
    })
    }

})



//Create a review for a spot based on the spot's id
router.post('/:id/reviews/',requireAuth,validateReview,async (req,res,next)=>{
    const spotId = req.params.id
    const {user} = req
    console.log(user, 'back userr')

    console.log(req.body,'review from back end')

    const existingReview = await Review.findOne({
        include:[{
            model:User,
            attributes:['id','firstName','lastName']
        }],
        where:{spotId,userId:user.id}
    })
        console.log(existingReview,'existingreivew')
        if(existingReview){
           return res.status(403).json({
                errors: ['User already has a review for this spot'],
                message: 'User already has a review for this spot',
                statusCode:403
            })
        }
 

    const spot = await Spot.findOne({
        include:[{
            model:User,
            attributes:['id','firstName','lastName']
        }], 
        where:{id:spotId}
    })

    if(!spot){
        const err = new Error("Spot couldn't be found")
        return res.status(404).json({
            message: err.message,
            statusCode: 404
        })

    }


    const {review,stars} = req.body
    const addReview = await spot.createReview({
        user,
        userId:user.id,
        spotId,
        review,
        stars

    })
    console.log(addReview,'review careated backend')
    const newReview = await Review.findAll({
        include:{
            model:User
        },
        where:{spotId,userId:user.id}
    })

        res.json(newReview)

})

//get reviews by spot Id

router.get('/:id/reviews', async(req,res)=>{
    const spotId = req.params.id
    const spot = await Spot.findByPk(req.params.id)

    if(spot){
        const existingReviews = await Review.findAll({
            include:[{
                model:User,
                attributes:['id','firstName','lastName']
            },{
                model:Image,
                attributes:{exclude:['spotImageId']}
            }
        ],
            where:{spotId:spot.id},
            attributes:{exclude:['previewImage']},
            ORDER:['id','DESC']
        })
        res.json({Review:existingReviews})
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
    if(!spot){
        res.status(404).json({
            message:"Spot couldn't be found",
            statusCode: 404
        })
    }
    const {startDate,endDate} =req.body

    const booking = await Booking.findOne({
        where:{
            startDate,
            endDate,
            numGuests
        }
    })
        if(spot.ownerId === userId){
            return res.status(401).json({message:"You're not authorized to book your own spot",statuCode:401})
        }

       else if(booking){
        const err = new Error("Sorry, this spot is already booked for the specified dates")
        res.status(403).json({
            message: err.message,
            statusCode:403,
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
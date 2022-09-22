const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {User,Spot,Image,Review} =require('../../db/models');
const { validateReview } = require('../../utils/validation');
const { validationResult } = require('express-validator');
const user = require('../../db/models/user');

router.post('/:id/images', async (req,res)=>{
    const reviewId = req.params.id
    const {url,previewImage} = req.body
    const userId = req.user.id
    const allImages = await Image.findAll({
        where:{
            reviewImageId:reviewId
        },
    })

    if(allImages.length >= 10){
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }


    const existingReview = await Review.findOne({
        include:{
            model:Image
        },
        where:{
            id:reviewId
        }
    })

        if(!existingReview){
            res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }

        const addReview = await existingReview.createImage({
            userId,
            url,
            previewImage
        })
        res.json(addReview)
})


//get reviews of current users

router.get('/current',requireAuth, async (req,res) =>{
 const {user} = req

 if(user){
    const allReviews = await Review.findAll({
        include:[{
            model:User,
            attributes:['id','firstName','lastName']
        },{
            model:Spot,
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','pricePerNight','previewImage']
        },{
            model:Image,
            attributes:['id','url']
        }
    ],
        where:{
            userId: user.id
        }
    })
    const reviewList = []

    allReviews.forEach(review=>{
        if(!review.previewImage) review.previewImage = 'No Preview Image'
        reviewList.push(review.toJSON())
    })

    reviewList.forEach(review=>{
        review.Images.forEach(image=>{
            if(image.previewImage === true){
                review.previewImage = image.url
            }
        })
    })


    res.json({Reviews:allReviews})
 } else{
    return res.status(404).json({
        message: " You're not the current user, please log in",
        statusCode: 404
    })
 }
})

//edit reviews
router.put('/:id',requireAuth,validateReview,async(req,res)=>{
    const reviewId = req.params.id
    const existingReview = await Review.findOne({
        where:{id:reviewId},
        attributes:{exclude:['previewImage']}
    })

    if(!existingReview){
        const err = new Error("Review couldn't be found")
        err.status = 404
        res.json({
            message: err.message,
            statusCode: err.status
        })
    } else{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            let errorObject = {}
            let errorArray = errors.errors.map(e=>{
                let key = e.param
                let value = e.msg
                return{
                    [key] :value
                }
            })
            errorArray.forEach(error =>{
                errorObject = {...errorObject,...error}
            })
            return res.json({
                message:"Validation error",
                statusCode: 400,
                errors: errorObject
            })
        }

        const{review,stars} = req.body
        existingReview.update({review,stars})

    }
    res.json(existingReview)

})

//delete a review
router.delete('/:id', requireAuth,async (req,res)=>{
    const reviewId = req.params.id
    const existingReview = await Review.findOne({where:{id:reviewId}})
    if(!existingReview ){
        return res.status(404).json({
            message: "Review is already deleted or couldn't be found",
            statusCode: 404
        })
    } else{
    await existingReview.destroy();
    return res.json({
        message: "Successfully deleted",
      statusCode: 200
    })
    }
});


module.exports = router;
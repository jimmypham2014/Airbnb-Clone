const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {User,Spot,Image,Review} =require('../../db/models');
const { validateReview } = require('../../utils/validation');
const { validationResult } = require('express-validator');

router.post('/:id/images', async (req,res)=>{
    const reviewId = req.params.id
    const {url} = req.body
    const review = await Review.findOne({
        include:{
            model: Image
        },
        where:{
            id:reviewId
        }})

        if(!review){
            res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }

        const addReview = await review.createImage({
            url
        })
        res.json(addReview)
})


//get reviews of current users

router.get('/current',requireAuth, async (req,res) =>{
 const {user} = req

 if(user){
    const allReviews = await Review.findAll({
        where:{
            userId: user.id
        }
    })
    res.json(allReviews)
 }
})

//edit reviews
router.put('/:id',requireAuth,validateReview,async(req,res)=>{
    const reviewId = req.params.id
    const existingReview = await Review.findOne({where:{id:reviewId}})

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
    const review = await Review.findOne({where:{id:reviewId}})
    if(!review){
        res.status(404).json({
            message: "Review is already deleted or couldn't be found",
            statusCode: 404
        })
    } else{
    await review.destroy();
    return res.json({
        message: "Successfully deleted",
      statusCode: 200
    })
    }
})



module.exports = router;
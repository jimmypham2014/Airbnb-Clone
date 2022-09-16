const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {User,Spot,Image,Review} =require('../../db/models');

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

module.exports = router;
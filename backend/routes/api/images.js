const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {User,Spot,Image,Review,Booking} =require('../../db/models');
const { validateReview } = require('../../utils/validation');
const { validationResult } = require('express-validator');


router.delete('/:id', requireAuth,async (req,res)=>{
    const reviewImageId = req.params.id
    const existingImage = await Image.findOne({where:{id:reviewImageId}})
    
    if(!existingImage || !reviewImageId){
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }
        else{
    await existingImage.destroy();
    return res.status(200).json({
        message: "Successfully deleted",
      statusCode: 200
    })
    }
})

module.exports = router;
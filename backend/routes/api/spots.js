const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../utils/auth')

const {Spot} =require('../../db/models')

router.get(
    '/',
    async (req,res)=>{
    const allSpots = await Spot.findAll()

    return res.json(allSpots)
})


// ...

module.exports = router;
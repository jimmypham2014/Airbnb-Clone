const express = require('express');
const router = express.Router();
const {restoreUser,requireAuth} = require('../../utils/auth')
const {validateSpot} = require('../../utils/validation')
const {Op} = require('sequelize')
const {User,Spot,Image} =require('../../db/models');
const { body,validationResult } = require('express-validator');
router.get(
    '/',
    async (req,res)=>{
    const allSpots = await Spot.findAll()

    return res.json(allSpots)
})


//get all spots belon to current users


//create new spot
router.post('/',requireAuth, 
  validateSpot,
async (req,res,next)=>{
    const ownerId = req.user.id
    let param
    let message
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        errors.array().map((e) => `${e.msg}`)
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            
        })
        next();
    }
  
    const {address,city,state,country,lat,lng,name,description,pricePerNight} = req.body
  
    const newSpot = await Spot.create({ownerId, address,city,state,country,lat,lng,name,description,pricePerNight})
  
    res.json(newSpot)
  })
  
// ...

//add an image to a spot based on the spot'id
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
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } 
        const addImage = await spot.createImage({
            url,
            preview
        })
    

 console.log(spot)
    // spot.forEach(el=> el.Images.push(addImage))

res.json(addImage)

})

//get all spots of current user
router.get('/current',restoreUser, requireAuth,async (req,res)=>{
    const { user } = req;
    if(user){
        const allSpots = await Spot.findAll({
            include:{
                model:Image
            },
            where:{
                ownerId: user.id
            }
        })
        res.json({allSpots})
    }
 
})



// edit a spot

router.put('/:id',requireAuth,
  body('address').exists().withMessage('Street address is required')
,
async (req,res,next)=>{
    const spotId = req.params.id
    const spot = await Spot.findOne({where:{id:spotId}})
    const {address,city, state,country,lat,lng,name,description,pricePerNight} = req.body
        
    const errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // spot.update(
    //     {address,city, state,country,lat,lng,name,description,pricePerNight},
        
    // )
    res.json(spot)
})


//delete a spot
router.delete('/:id', requireAuth,async (req,res)=>{
    const spotId = req.params.id
    const spot = await Spot.findOne({where:{id:spotId}})
    await Spot.destroy(
        { where: 
            { id: { [Op.lte]: spotId } }  // specific records to delete
        }
    );
})
module.exports = router;
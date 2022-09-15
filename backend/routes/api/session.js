// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User,Spot } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ValidationError } = require('sequelize');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];
// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        res.json({
          message: "Invalid credentials",
          statusCode: 401
        })
      }
  
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    }
  );

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
  
  // Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );
  
  // ...

  //create a spot
  
router.post('/:id/spots',requireAuth, async (req,res,next)=>{
  const ownerId = req.user.id


  const {address,city,state,country,lat,lng,name,description,pricePerNight} = req.body

    // const existingSpot = await Spot.findAll({
    //   where:{
    //     address,city,state,country,
    //   }})
    //   if(existingSpot){
    //     res.status(403)
    //     res.json({
    //       message:'You have listed this spot, please add a new spot',
    //       statusCode: 403
    //     })
    
    //   }
    for(const property in req.body){
      if(!property){
        const err = new Error('Validation Error')
        err.status= 400
        next(err)
      }
  }

  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    pricePerNight})

  res.json(newSpot)
})


  module.exports = router;
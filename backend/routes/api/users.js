// backend/routes/api/users.js
const {singlePublicFileUpload} = require('../../awsS3')
const {singleMulterUpload }=require('../../awsS3')
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const { check ,validationResult} = require('express-validator');
const { handleValidationErrors ,validateSignUp} = require('../../utils/validation');
// const validateSignup = [
//     check('email')
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage('Please provide a valid email.'),
//     check('username')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 4 })
//       .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//       .not()
//       .isEmail()
//       .withMessage('Username cannot be an email.'),
//     check('password')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 6 })
//       .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
//   ];

// Sign up
router.post(
    '/',
    validateSignUp,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;

      const existingUsername = await User.findOne({where:{username}})
      const existingEmail = await User.findOne({where:{email}})


      if(existingEmail){
        return res.status(403).json({     
            message: "Validation error",
            statusCode: 403,
             errors: {
              email: "User with that email already exists"
        }})
      }
      if(existingUsername){
        return res.status(403).json({   
           message: "User already exists",
            statusCode: 403,
            errors: {
            username: "User with that username already exists"
        }})
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
    const userSignup = await User.signup({ firstName,lastName, email, username, password });
    await setTokenCookie(res, userSignup);
  
    return res.json({
      userSignup
    });

    });



    router.get('/',async (req,res)=>{
       const allUsers = await User.findAll()
       res.json(allUsers)
    })




module.exports = router;
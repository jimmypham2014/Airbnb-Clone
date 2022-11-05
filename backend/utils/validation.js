// backend/utils/validation.js
const { body,validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      console.log(validationErrors,'hello');
      let errObj = {};
      validationErrors
        .array()
        .forEach((error) => (errObj[error.param] = error.msg));
      return _res.status(400).json({
        message: "Validation Error",
        statusCode: 400,
        errors: errObj,
      });
    }
    next();
  };

  const validateSignUp = [
    body('firstName').notEmpty().withMessage('First Name is required'),
    body('lastName').notEmpty().withMessage('Last Name is required'),
    body('email').notEmpty().isEmail().withMessage('Invalid Email'),
    body('email').exists().withMessage('User with that email already exists'),
    body('username').notEmpty().withMessage('Username is required'),
    body('username').exists({checkFalsy:true}).withMessage('User with that username already exists'),
    body('password').isLength({min:8}).notEmpty().withMessage('Password length must be at least 8'),
    handleValidationErrors 
  ]

  const validateSpot=[
    body('address').notEmpty().withMessage('Street address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('lat').isDecimal().withMessage('Latitude is not valid'),
    body('lng').isDecimal().withMessage('Longitude is not valid'),
    body('name').isLength({max:50}).withMessage('Name must be less than 50 characters'),
    body('description').notEmpty().withMessage('Name must be less than 50 characters'),
    body('pricePerNight').notEmpty().isDecimal().withMessage('Price per day is required'),
    handleValidationErrors 
  ]

  const validateReview =[
    body('review').notEmpty().withMessage('Review text is required'),
    body('stars').isFloat({min:1,max:5}).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors 
  ]
  

  const validateBooking =[
    body('endDate').custom((value, { req }) => {
      if(new Date(value) < new Date(req.body.startDate)) {
          throw new Error ('endDate cannot be before startDate');
      }
      return true;
  }),

  body('endDate').notEmpty().withMessage('End Date cannot be empty'),
  body('startDate').notEmpty().withMessage('Start Date cannot be empty'),
  

  ]

  module.exports = {
    handleValidationErrors,validateSpot,validateReview,validateBooking, validateSignUp
  };
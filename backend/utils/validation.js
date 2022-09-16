// backend/utils/validation.js
const { body,validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => `${error.msg}`);
  
      const err = Error('Bad request.');
      err.errors = errors;
      err.status = 400;
      err.title = 'Bad request.';
      next(err);
    }
    next();
  };


  const validateSpot=[
    body('address').notEmpty().withMessage('Street address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().isAlpha().withMessage('State is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('lat').isDecimal().withMessage('Latitude is not valid'),
    body('lng').isDecimal().withMessage('Longitude is not valid'),
    body('name').isLength({max:50}).withMessage('Name must be less than 50 characters'),
    body('description').notEmpty().withMessage('Name must be less than 50 characters'),
    body('pricePerNight').notEmpty().isDecimal().withMessage('Price per day is required')

  ]
  

  module.exports = {
    handleValidationErrors,validateSpot
  };
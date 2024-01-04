const stripe = require('stripe')
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Factory = require('./../controllers/handllerFactory');

exports.getCheckoutSession = catchAsync(async(req,res,next) => {
    // 1) Get The Currently bookerd tour
    const tour = await Tour.findById(req.params.tourID);

    // 2) Create Checkout Session
    

    // 3) Create Session as Response
});
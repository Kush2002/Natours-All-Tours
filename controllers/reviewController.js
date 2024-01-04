const Review = require('./../models/reviewModel');
const Factory = require('./../controllers/handllerFactory');
// const catchAsync = require('../utils/catchAsync');

exports.setTourUserIds = (req, res, next)=>{
    //  Allow Nested Routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getAllReview = Factory.getAll(Review);
exports.getReview = Factory.getOne(Review);
exports.createReview = Factory.createOne(Review);
exports.updateReview = Factory.updateOne(Review);
exports.deleteReview = Factory.deleteOne(Review);
const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authControllers');
const reviewRouter = require('./../routes/reviewsRouter');

const router = express.Router();

router.use('/:tourId/reviews',reviewRouter)
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan,
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);

router
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);

// /tours-distance?distance=233&center=-40,45,unit=mi
// /tours-distance/233/center/-40,45/unit=mi

router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour)
  .delete(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour);

module.exports = router;
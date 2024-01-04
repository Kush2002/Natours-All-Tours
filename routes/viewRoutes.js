const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();

router.get('/',authController.isLoggedIn,viewControllers.getOverview);
router.get('/tour/:slug',authController.isLoggedIn,viewControllers.getTourPage);
router.get('/login',authController.isLoggedIn,viewControllers.getLoginForm);
router.get('/me',authController.protect,viewControllers.getAccount);

router.post('/submit-user-data',authController.protect,viewControllers.updateUserData);

module.exports = router; 
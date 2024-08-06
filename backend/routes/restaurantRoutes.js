const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const LoginController = require('../controllers/LoginController');
router.post('/signup',restaurantController.signup);
router.post('/login',LoginController.login);

module.exports = router;
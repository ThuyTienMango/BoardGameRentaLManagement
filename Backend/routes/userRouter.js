var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/editprofile/:id', authController.checkLogin, userController.editProfile);
router.get('/editprofile/:id', authController.checkLogin, userController.editProfilePage);
router.get('/orderhistory', authController.checkLogin, userController.orderHistory);
router.get('/profile', authController.checkLogin, userController.profile);

module.exports = router;

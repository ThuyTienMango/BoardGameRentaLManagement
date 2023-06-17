var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);
router.post('/save-register', authController.registerUser);
router.post('/save-login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;

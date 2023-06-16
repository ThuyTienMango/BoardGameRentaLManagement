var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.getLoginPage);
router.get('/', authController.getRegisterPage);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;

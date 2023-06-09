var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/orderhistory', userController.orderHistory);
router.get('/profile', userController.profile);

module.exports = router;

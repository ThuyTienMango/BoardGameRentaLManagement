var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.get('/placeOrder/:id', authController.checkLogin, orderController.placeOrder);
router.get('/:id', authController.checkLogin, orderController.order);

module.exports = router;

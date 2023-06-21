var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController');

// // Định nghĩa route để xử lý đặt hàng
// router.post('/placeOrder', orderController.placeOrder);
router.get('/:id', orderController.order);

module.exports = router;

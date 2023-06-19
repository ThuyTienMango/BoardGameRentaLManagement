var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/:id', orderController.order);

module.exports = router;

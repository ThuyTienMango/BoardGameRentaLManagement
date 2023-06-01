var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/save-customer-info', userController.save);
router.get('/customer-info',userController.index);

module.exports = router;

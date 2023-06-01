var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/save-customer-info', userController.save);
router.get('/',userController.index);

module.exports = router;

var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/save-cus-info', userController.save);


module.exports = router;

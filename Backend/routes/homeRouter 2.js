var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

router.get('/', authController.checkLogin, homeController.index);

module.exports = router;

var express = require('express');
var router = express.Router();

const storeController = require('../controllers/storeController');
const authController = require('../controllers/authController');

router.get('/:id', storeController.show);
router.get('/', authController.checkLogin, storeController.index);

module.exports = router;

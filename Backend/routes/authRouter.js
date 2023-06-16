var express = require('express');
var router = express.Router();

const registerController = require('../controllers/registerController');

router.get('/', registerController.getRegister);
router.post('/', registerController.postRegister);

module.exports = router;

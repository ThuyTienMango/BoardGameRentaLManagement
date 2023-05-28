var express = require('express');
var router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/', contactController.index);

module.exports = router;
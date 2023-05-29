var express = require('express');
var router = express.Router();

const storeController = require('../controllers/storeController');

router.get('/:id', storeController.show);
router.get('/', storeController.index);

module.exports = router;

var express = require('express');
var router = express.Router();

const boardgameController = require('../controllers/boardgameController');

router.get('/order', boardgameController.order);
router.get('/:id', boardgameController.show);
router.get('/', boardgameController.index);

module.exports = router;

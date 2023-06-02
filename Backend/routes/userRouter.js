var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/save-customer-info', userController.save);
router.get('/register',userController.reg);
router.get('/:id', userController.show);

module.exports = router;

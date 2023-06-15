const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router.get('/register', userController.reg);
router.post('/save-customer-info', userController.save);
router.get('/:id', userController.show);

module.exports = router;

var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/addboardgame', authController.checkLogin, adminController.getAddBoardgamePage);
router.get('/editboardgame/:id', adminController.getEditBoardgamePage);
router.get('/manageboardgame', adminController.getManageBoardgamePage);
router.get('/manageorder', adminController.getManageOrderPage);
router.get('/orderdetail', adminController.getOrderDetailPage);
router.post('/addboardgame', adminController.addBoardgame);
router.post('/editboardgame/:id', adminController.editBoardgame);
router.post('/orderdetail', adminController.editOrder);
//router.get('/', adminController.index);

module.exports = router;

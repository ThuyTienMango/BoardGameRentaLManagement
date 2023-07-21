var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/addboardgame', authController.checkLogin, adminController.getAddBoardgamePage);
router.get('/editboardgame/:id', authController.checkLogin, adminController.getEditBoardgamePage);
router.get('/manageboardgame', authController.checkLogin, adminController.getManageBoardgamePage);
router.get('/manageorder', authController.checkLogin, adminController.getManageOrderPage);
router.get('/orderdetail/:id', authController.checkLogin, adminController.getOrderDetailPage);
router.get('/managecustomer', authController.checkLogin, adminController.getManageCustomerPage);
router.get('/managecustomer/:id', authController.checkLogin, adminController.getDetailCustomerPage);
router.post('/addboardgame', authController.checkLogin, adminController.addBoardgame);
router.post('/deleteorder/:id', authController.checkLogin, adminController.deleteOrder);
router.post('/editboardgame/:id', authController.checkLogin, adminController.editBoardgame);
router.post('/deleteboardgame/:id', authController.checkLogin, adminController.deleteBoardgame);
router.post('/orderdetail/:id', authController.checkLogin, adminController.editOrder);
router.get('/', adminController.index);

module.exports = router;

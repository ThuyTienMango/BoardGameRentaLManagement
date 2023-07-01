var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/addboardgame', adminController.getAddBoardgamePage);
router.get('/editboardgame', adminController.getEditBoardgamePage);
router.get('/manageboardgame', adminController.getManageBoardgamePage);
router.get('/manageorder', adminController.getManageOrderPage);
router.get('/orderdetail', adminController.getOrderDetailPage);
router.post('/addboardgame', adminController.addBoardgame);
router.post('/editboardgame', adminController.editBoardgame);
router.post('/orderdetail', adminController.editOrder);

module.exports = router;

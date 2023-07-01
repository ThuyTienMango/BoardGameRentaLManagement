const bcrypt = require('bcrypt');
const User = require('../models/User');
const Boardgame = require('../models/Boardgame');
const mongoose = require('mongoose');
const { mongooseToObject } = require('../util/mongoose');
const multer = require('multer');
const path = require('path');

// Thiết lập storage engine cho multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Boardgame_img/'); // Đường dẫn thư mục lưu trữ file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname); // Tên file được lưu trữ
  }
});

// Tạo middleware upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Giới hạn kích thước file (ở đây là 5MB)
  },
  fileFilter: function (req, file, cb) {
    // Kiểm tra loại file
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG file formats are allowed.'));
    }
  }
}).single('boargame_img'); // Tên trường trong form chứa file avatar

class adminController {
  //[GET] /admin/addboardgame
  async getAddBoardgamePage(req, res, next){
   
  }

  //[GET] /admin/editboardgame
  async getEditBoardgamePage(req, res, next){
   
  }

  //[GET] /admin/manageboardgame
  async getManageBoardgamePage(req, res, next){
   
  }

  //[GET] /admin/manageorder
  async getManageOrderPage(req, res, next){
   
  }

  //[GET] /admin/orderdetail
  async getOrderDetailPage(req, res, next){
   
  }

  //[POST] /admin/addboardgame
  async addBoardgame(req, res, next){
   
  }

  //[POST] /admin/editboardgame
  async editBoardgame(req, res, next){
   
  }

  //[POST] /admin/orderdetail
  async editOrder(req, res, next){
   
  }
}

module.exports = new adminController();

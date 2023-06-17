const User = require('../models/User');
const mongoose = require('mongoose');
const { mongooseToObject } = require('../util/mongoose');
const multer = require('multer');
const path = require('path');
const express = require('express');


const app = express();

// Cấu hình lưu trữ và tên file cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Thư mục để lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Tạo số duy nhất cho tên file
    const fileExtension = path.extname(file.originalname); // Lấy phần mở rộng của tên file gốc
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Tạo tên file mới
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }).single('image');

class userController {
  //[GET] /user/register
  async reg(req, res, next) {
    try {
      res.render('user/register');
    } catch (error) {
      next(error);
    }
  }

  //[POST] /user/save-customer-info
  async save(req, res, next) {
    try {
      upload(req, res, async (err) => {
        if (err) {
          next(err);
        } else {
          const formData = req.body;
          const user = new User(formData);

          // Kiểm tra xem có file đã được tải lên hay không
          if (req.file) {
            user.image = req.file.filename; // Lưu tên file vào trường image
            user.imageUrl = '/uploads/' + req.file.filename; // Lưu đường dẫn đầy đủ của ảnh
          }

          await user.save(); // Lưu thông tin người dùng vào cơ sở dữ liệu
          res.redirect(`/user/${user._id}`);
        }
      });
    } catch (error) {
      next(error);
    }
  }

  //[GET] /user/:id
  async show(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      res.render('user/info', { 
        user: mongooseToObject(user),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new userController();

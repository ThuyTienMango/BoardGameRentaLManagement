const bcrypt = require('bcrypt');
const User = require('../models/User');
const mongoose = require('mongoose');
const { mongooseToObject } = require('../util/mongoose');
const multer = require('multer');
const path = require('path');

// Thiết lập storage engine cho multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Đường dẫn thư mục lưu trữ file
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
}).single('avatar'); // Tên trường trong form chứa file avatar

class authController {
  //[GET] /login
  async getLoginPage(req, res, next) {
    try {
      res.render('login'); //render ra trang đăng nhập nằm trong path: views/login.ejs
    } catch (error) {
      next(error);
    }
  }

  //[GET] /register
  async getRegisterPage(req, res, next) {
    try {
      res.render('register'); //render ra trang đăng ký nằm trong path: views/register.ejs
    } catch (error) {
      next(error);
    }
  }

  //[POST] /register
  async registerUser(req, res, next) {
    try {
      upload(req, res, async (err) => { // Phương thức sử dụng middleware upload để xử lý tải lên tệp tin (avatar)
        if (err) {
          return res.status(400).json({ message: err.message }); //Nếu có lỗi xảy ra trong quá trình tải lên, một thông báo lỗi sẽ được trả về cho client
        }

        const { name, username, email, password, tel, identity, address } = req.body; //thông tin người dùng được lấy từ yêu cầu 

        // Kiểm tra xem các trường bắt buộc đã được điền đầy đủ hay không
        if (!name || !username || !email || !password || !tel || !identity) {
          return res.status(400).json({ message: 'Missing required fields.' });
        }

        const user = new User({
          name,
          username,
          email,
          password,
          tel,
          identity,
          address
        });// một đối tượng User mới được tạo với thông tin người dùng và được lưu trong cơ sở dữ liệu.

        // Kiểm tra xem có file đã được tải lên hay không
        if (req.file) {
          user.avatar = req.file.filename; // Lưu tên file vào trường avatar
          user.avatarUrl = '/uploads/' + req.file.filename; // Lưu đường dẫn đầy đủ của ảnh
        }

        await user.save(); // Lưu thông tin người dùng vào cơ sở dữ liệu
        res.redirect('/login');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred during registration.'); //Nếu xảy ra bất kỳ lỗi nào trong quá trình xử lý, thông báo lỗi sẽ được ghi vào console và client sẽ nhận được một thông báo lỗi 500.
    }
  }

  //[POST] /login
  async loginUser(req, res) {
    const { username, password } = req.body;
    
    try {
      // Tìm kiếm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });

      if (!user) {
        // Người dùng không tồn tại, chuyển hướng đến trang đăng nhập lại
        console.log('Sai ten nguoi dung');
        return res.redirect('/login');
      }

      // Kiểm tra mật khẩu
      if (password !== user.password) {
        // Mật khẩu không khớp, chuyển hướng đến trang đăng nhập lại
        console.log('Sai mat khau');
        return res.redirect('/login');
      }

      // Lưu thông tin người dùng vào session
      req.session.user = user;

      // // Chuyển hướng đến trang cửa hàng
      // res.redirect('/');

      // Chuyển hướng dựa trên vai trò của người dùng
      if (user.username === 'admin') {
        // Chuyển hướng đến trang dành cho admin
        return res.redirect('/admin/addboardgame');
      } else {
        // Chuyển hướng đến trang dành cho khách hàng
        return res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred during login.');
    }
  }



  //[GET] /logout
  async logoutUser(req, res, next) {
    try {
      req.session.destroy();
      res.redirect('/login');
    } catch (error) {
      next(error);
    }
  }

  async checkLogin(req, res, next) {
    try {
      if (!req.session.user) {
        return res.redirect('/login');
      }
      // // Nếu người dùng đã đăng nhập, bạn có thể kiểm tra vai trò của người dùng
      // if (req.session.user.username === 'admin') {
      //   // Nếu là admin, chuyển hướng đến trang admin
      //   return res.redirect('/admin');
      // } else {
      //   // Nếu là khách hàng, chuyển hướng đến trang khách hàng
      //   return res.redirect('/');
      // }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new authController();

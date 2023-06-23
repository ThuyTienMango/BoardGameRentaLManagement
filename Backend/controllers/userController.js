const Boardgame = require('../models/Boardgame');
const User = require('../models/User');
const Order = require('../models/Order');
const mongoose = require('mongoose');
const { mongooseToObject } = require('../util/mongoose');


class userController {
  //[GET] /profile
  async profile(req, res, next) {
    try {
      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      if (req.session.user) {
        // Người dùng đã đăng nhập, truy xuất thông tin người dùng từ cơ sở dữ liệu
        const user = await User.findOne({ _id: req.session.user }); // Tìm người dùng theo ID

        // Render trang profile và truyền thông tin người dùng
        res.render('customer_website/user/profile', { user: user });
      } else {
        // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        res.redirect('/login');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  //[GET] /user/orderhistory
  async orderHistory(req, res, next){
    try {
      const user = await User.findOne({ _id: req.session.user }); // Tìm người dùng theo ID
      const orders = await Order.find({ customerId: user._id }).sort({ createdAt: -1 }); // Tìm các đơn hàng dựa trên customerId
      const itemsPerPage = 3; // Số sản phẩm trên mỗi trang
      const currentPage = req.query.page || 1; // Trang hiện tại (mặc định là 1)
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      const ordersPage = orders.slice(startIndex, endIndex);
      res.render('customer_website/user/orderHistory',
      { 
        user: user,
        orders: ordersPage,
        currentPage,
        totalPages: Math.ceil(orders.length / itemsPerPage), 
      });
    } catch(error){
      next(error);
    }
  }
}

module.exports = new userController();

// class userController {
//   //[GET] /user/register
//   async reg(req, res, next) {
//     try {
//       res.render('user/register');
//     } catch (error) {
//       next(error);
//     }
//   }

//   //[POST] /user/save-customer-info
//   async save(req, res, next) {
//     try {
//       upload(req, res, async (err) => {
//         if (err) {
//           next(err);
//         } else {
//           const formData = req.body;
//           const user = new User(formData);

//           // Kiểm tra xem có file đã được tải lên hay không
//           if (req.file) {
//             user.image = req.file.filename; // Lưu tên file vào trường image
//             user.imageUrl = '/uploads/' + req.file.filename; // Lưu đường dẫn đầy đủ của ảnh
//           }

//           await user.save(); // Lưu thông tin người dùng vào cơ sở dữ liệu
//           res.redirect(`/user/${user._id}`);
//         }
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   //[GET] /user/:id
//   async show(req, res, next) {
//     try {
//       const user = await User.findById(req.params.id);
//       res.render('user/info', { 
//         user: mongooseToObject(user),
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// module.exports = new userController();

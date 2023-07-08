const bcrypt = require('bcrypt');
const User = require('../models/User');
const Boardgame = require('../models/Boardgame');
const Order = require('../models/Order');
const mongoose = require('mongoose');
const { mongooseToObject } = require('../util/mongoose');
const { multipleMongooseToObject } = require('../util/mongoose');
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
}).single('image'); // Tên trường trong form chứa file boardgame_img

// // Thiết lập storage engine cho multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/Boardgame_img/'); // Đường dẫn thư mục lưu trữ file
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const extname = path.extname(file.originalname);
//       cb(null, uniqueSuffix + extname); // Tên file được lưu trữ
//     }
//   });
  
//   // Tạo middleware upload
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5 // Giới hạn kích thước file (ở đây là 5MB)
//     },
//     fileFilter: function (req, file, cb) {
//       // Kiểm tra loại file
//       if (
//         file.mimetype === 'image/jpeg' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/png'
//       ) {
//         cb(null, true);
//       } else {
//         cb(new Error('Only JPEG, JPG, and PNG file formats are allowed.'));
//       }
//     }
//   }).array('boardgame_img', 5); // Tên trường trong form chứa file boardgame_img, cho phép tải lên tối đa 5 ảnh
  
  

class adminController {
  //[GET] /admin/
  async index(req, res, next){
    try {
        res.send('Trang admin');
    } catch(error){
      next(error);
    }
  } 

  //[GET] /admin/addboardgame
  async getAddBoardgamePage(req, res, next){
   try{
    const user = await User.findOne({ _id: req.session.user }); //sử dụng phương thức findOne để tìm kiếm một boardgame trong cơ sở dữ liệu dựa trên giá trị _id lấy từ session (req.session.user) (phiên boardgame hiện tại sau khi đăng nhập)
    res.render('admin/them_san_pham',{
        user: user,
    })
   } catch(error){
    next(error);
   }
  }

  //[GET] /admin/editboardgame
  async getEditBoardgamePage(req, res, next){
    try{
      const boardgame = await Boardgame.findById(req.params.id);
      const user = await User.findOne({ _id: req.session.user });
      res.render('admin/chinh_sua_san_pham',{
        user: user,
        boardgame: mongooseToObject(boardgame),
      })
    } catch(error){
      next(error);
    }
  }

  //[GET] /admin/manageboardgame
  async getManageBoardgamePage(req, res, next){
    try{
        const boardgames = await Boardgame.find({});
        const user = await User.findOne({ _id: req.session.user });
        const itemsPerPage = 7; // Số sản phẩm trên mỗi trang
        const currentPage = req.query.page || 1; // Trang hiện tại (mặc định là 1)
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const boardgamesPage = boardgames.slice(startIndex, endIndex);
        res.render('admin/quan_ly_san_pham',{
            user: user,
            boardgames: multipleMongooseToObject(boardgamesPage),
            totalPages: Math.ceil(boardgames.length / itemsPerPage),
            currentPage,
        })
    } catch(error){
        next(error);
    }
  }

 //[GET] /admin/manageorder
async getManageOrderPage(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.session.user });
    const orders = await Order.find().sort({ createdAt: -1 });
    const users = await User.find();
    const ordersPerPage = 7; // Số sản phẩm trên mỗi trang
    const currentPage = req.query.page || 1; // Trang hiện tại (mặc định là 1)
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = currentPage * ordersPerPage;
    const ordersPage = orders.slice(startIndex, endIndex);
    res.render('admin/quan_ly_don_hang', {
      user: user,
      users: users,
      ordersPage: multipleMongooseToObject(ordersPage),
      totalPages: Math.ceil(orders.length / ordersPerPage),
      currentPage,
    });
  } catch (error) {
    next(error);
  }
}


  //[GET] /admin/orderdetail
  async getOrderDetailPage(req, res, next){
   
  }

  //[POST] /admin/addboardgame
  async addBoardgame(req, res, next){
    try{
        upload(req, res, async (err) => { // Phương thức sử dụng middleware upload để xử lý tải lên tệp tin (boargame_img)
            if (err) {
              return res.status(400).json({ message: err.message }); //Nếu có lỗi xảy ra trong quá trình tải lên, một thông báo lỗi sẽ được trả về cho client
            }
    
            const { name, description, price, ages, playerMin, playerMax, length, quantity } = req.body; //thông tin boardgame được lấy từ yêu cầu 
    
            // Kiểm tra xem các trường bắt buộc đã được điền đầy đủ hay không
            if (!name || !description ||  !price || !ages || !playerMin || !playerMax || !length ||!quantity) {
              return res.status(400).json({ message: 'Missing required fields.' });
            }
    
            const boardgame = new Boardgame({
              name,
              description,
              price,
              ages,
              playerMin,
              playerMax,
              length,
              quantity,
            });// một đối tượng Boardgame mới được tạo với thông tin boardgame và được lưu trong cơ sở dữ liệu.
    
            // Kiểm tra xem có file đã được tải lên hay không
            if (req.file) {
              boardgame.image = req.file.filename; // Lưu tên file vào trường avatar
              boardgame.imageUrl = '/Boardgame_img/' + req.file.filename; // Lưu đường dẫn đầy đủ của ảnh
            }
    
            await boardgame.save(); // Lưu thông tin boardgame vào cơ sở dữ liệu
            res.redirect('/admin/addboardgame');
        });
    } catch(error){
        next(error);
    }
  }

  ///[POST] /admin/editboardgame/:id
  async editBoardgame(req, res, next) {
    try {
      const filter = { _id : req.params.id };
      console.log(filter);
      console.log(req.body);
      const update = {
        name: req.body.name,
        description: req.body.description,
        ages: req.body.ages,
        playerMax: req.body.playerMax,
        playerMin: req.body.playerMin,
        length: req.body.length,
        price: req.body.price,
        quantity: req.body.quantity
      }

      //console.log(update);

      // `doc` is the document _after_ `update` was applied because of
      // `new: true`
      const doc = await Boardgame.findOneAndUpdate(filter, update, {
        new: true
      });
      res.redirect('/admin/manageboardgame');
    } catch (error) {
      next(error);
    }
  }


  //[POST] /admin/orderdetail
  async editOrder(req, res, next){
   
  }
}

module.exports = new adminController();

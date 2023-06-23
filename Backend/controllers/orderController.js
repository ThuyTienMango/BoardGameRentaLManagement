const Boardgame = require('../models/Boardgame');
const User = require('../models/User');
const Order = require('../models/Order');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class orderController {
    //[GET] /order/:id
    async order(req, res, next){
        try{
            const user = await User.findOne({ _id: req.session.user }); // Tìm người dùng theo ID
            const boardgame = await Boardgame.findById(req.params.id);
            const duration = parseInt(req.query.duration);
            const quantity = parseInt(req.query.quantity);
            let total = 0;
            switch(duration) {
                case 7: 
                    total = 100000 + quantity*boardgame.price;
                    break;
                case 14: 
                    total = 200000 + quantity*boardgame.price; 
                    break;
                case 30: 
                    total = 300000 + quantity*boardgame.price; 
                    break;
                case 60: 
                    total = 500000 + quantity*boardgame.price; 
                    break;
            }
            const formattedPrice = boardgame.price.toLocaleString('vi-VN');
            const formattedTotal = total.toLocaleString('vi-VN');
            // const order = new Order({
            //     customerId : user._id,
            //     productId : boardgame._id,
            //     productName: boardgame.name,
            //     productImage: boardgame.image,
            //     productPrice: boardgame.price,
            //     duration : duration,
            //     quantity : quantity,
            //     totalPrice : total,
            //     // orderStatus ,
            //     // notes
            //   });
            // await order.save();
            res.render('customer_website/boardgames/order', { 
                boardgame: mongooseToObject(boardgame),
                user: user,
                duration,
                quantity,
                formattedPrice,
                formattedTotal,
             });
        } catch(error) {
            next(error);
        }
    }
    
    async placeOrder(req, res) {
        try {
          const user = await User.findOne({ _id: req.session.user }); // Tìm người dùng theo ID
          const boardgame = await Boardgame.findById(req.params.id);
          const duration = parseInt(req.query.duration);
          const quantity = parseInt(req.query.quantity);
          let total = 0;
          switch (duration) {
            case 7:
                total = 100000 + quantity * boardgame.price;
                break;
            case 14:
                total = 200000 + quantity * boardgame.price;
                break;
            case 30:
                total = 300000 + quantity * boardgame.price;
                break;
            case 60:
                total = 500000 + quantity * boardgame.price;
                break;
          }
          const order = new Order({
            customerId: user._id,
            productId: boardgame._id,
            productName: boardgame.name,
            productImage: boardgame.image,
            productPrice: boardgame.price,
            duration: duration,
            quantity: quantity,
            totalPrice: total,
            // orderStatus: 'Đang chờ xử lý',
            // notes: ''
          });
          await order.save();
          // Chuyển hướng đến trang lịch sử thuê
          res.redirect('/user/orderhistory');
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error(error);
          res.status(500).json({ message: 'Đã xảy ra lỗi khi đặt hàng' });
        }
    }
}

module.exports = new orderController();
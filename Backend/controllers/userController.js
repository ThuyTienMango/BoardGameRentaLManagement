const User = require('../models/User');
const { multipleMongooseToObject } = require('../util/mogoose');
const { mongooseToObject } = require('../util/mogoose');

class userController {

    //[GET] /user
    async index(req, res, next){
        try {
            res.render('users/info');
        } catch(error) {
            next(error);
        }
    }


    //[POST] /user/save-customer-info
    async save(req, res, next){
        try {
            // Lấy dữ liệu từ request body
            const { name, email, phone_number, ID_card, address, image } = req.body;
        
            // Tạo một bản ghi mới
            const order = new Order({
              name,
              email,
              phone_number,
              ID_card,
              address,
              image
            });
        
            // Lưu bản ghi vào collection
            await order.save();
        
            res.status(200).json({ success: true, message: 'Thông tin khách hàng đã được lưu thành công' });
          } catch (error) {
            console.log('Lỗi khi lưu thông tin khách hàng:', error);
            res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lưu thông tin khách hàng' });
          }
    }
}

module.exports = new userController();
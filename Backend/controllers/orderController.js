const Boardgame = require('../models/Boardgame');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class orderController {
    //[GET] /order/:id
    async order(req, res, next){
        try{
            const user = await User.findOne({ _id: req.session.user }); // Tìm người dùng theo ID
            const boardgame = await Boardgame.findById(req.params.id);
            const duration = req.query.duration;
            const quantity = req.query.quantity;
            let total = 0;
            if(duration == 7 && quantity == 1) {
                total = 100000 + boardgame.price*quantity;
            }
            const formattedPrice = boardgame.price.toLocaleString('vi-VN');
            const formattedTotal = total.toLocaleString('vi-VN');
            res.render('boardgames/order', { 
                boardgame: mongooseToObject(boardgame),
                user: user,
                formattedPrice,
                formattedTotal,
             });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new orderController();
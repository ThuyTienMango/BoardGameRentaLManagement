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
            res.render('boardgames/order', { 
                boardgame: mongooseToObject(boardgame),
                user: user,
             });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new orderController();
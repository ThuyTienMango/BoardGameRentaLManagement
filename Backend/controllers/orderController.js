const Boardgame = require('../models/Boardgame');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class orderController {
    //[GET] /order/:id
    async order(req, res, next){
        try{
            const boardgame = await Boardgame.findById(req.params.id);
            const user = await User.findOne({});
            res.render('boardgames/order', { 
                boardgame: mongooseToObject(boardgame),
                user: mongooseToObject(user),
             });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new orderController();
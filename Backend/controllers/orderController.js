const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mogoose');
const { mongooseToObject } = require('../util/mogoose');

class orderController {
    //[GET] /order/:id
    async order(req, res, next){
        try{
            const boardgame = await Boardgame.findById(req.params.id);
            res.render('boardgames/order', { 
                boardgame: mongooseToObject(boardgame),
             });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new orderController();
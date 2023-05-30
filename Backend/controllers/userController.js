const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mogoose');
const { mongooseToObject } = require('../util/mogoose');

class userController {
    //[GET] /user
    async index(req, res, next){
        try{
            res.send('User Page');
        } catch(error){
        next(error)
        }
    }
}

module.exports = new userController();
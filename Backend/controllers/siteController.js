const Boardgame = require("../models/Boardgame");
const { multipleMongooseToObject } = require('../util/mogoose');

class siteController {
    //[GET] /
    async index(req, res, next) {
        try {
            const boardgames = await Boardgame.find({});
            res.render('layout/main', {
                boardgames: multipleMongooseToObject(boardgames)
            });
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new siteController();
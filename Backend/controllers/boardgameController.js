const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mogoose');


class boardgameController {
    //[GET] /store
    async index(req, res, next) {
        try {
            res.render('layout/main');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new boardgameController();
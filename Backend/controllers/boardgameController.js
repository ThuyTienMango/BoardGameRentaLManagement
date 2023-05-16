const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mogoose');
const { mongooseToObject } = require('../util/mogoose');

class boardgameController {
    //[GET] /store
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
    
    //[GET] /store/:id 
    async show(req, res, next) {
        try {
            const boardgame = await Boardgame.findById(req.params.id);
            res.render('boardgames/detail', { 
                boardgame: mongooseToObject(boardgame)
             });
          } catch (error) {
            next(error);
        }
    }
}

module.exports = new boardgameController();
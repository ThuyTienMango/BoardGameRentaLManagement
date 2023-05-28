const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mogoose');


class boardgameController {
    //[GET] /store
    async index(req, res, next) {
        try {
            const boardgames = await Boardgame.find({});
            const itemsPerPage = 20; // Số sản phẩm trên mỗi trang
            const currentPage = req.query.page || 1; // Trang hiện tại (mặc định là 1)
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = currentPage * itemsPerPage;
    
            const boardgamesPage = boardgames.slice(startIndex, endIndex);
            res.render('layout/main', {
                boardgames: multipleMongooseToObject(boardgamesPage),
                currentPage,
                totalPages: Math.ceil(boardgames.length / itemsPerPage)
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new boardgameController();
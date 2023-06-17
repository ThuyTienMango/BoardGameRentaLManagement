const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');

class storeController {
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
    
    //[GET] /store/:id 
    async show(req, res, next) {
        try {
            const boardgames = await Boardgame.find({});
            const boardgame = await Boardgame.findById(req.params.id);
            const randomGames = shuffle(boardgames).slice(0, 5);
            res.render('boardgames/detail', { 
                boardgame: mongooseToObject(boardgame),
                boardgames: multipleMongooseToObject(randomGames)
             });
             // Hàm xáo trộn mảng sản phẩm
            function shuffle(array) {
                let currentIndex = array.length, temporaryValue, randomIndex;
            
                while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
            
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
                }
            
                return array;
            }
          } catch (error) {
            next(error);
        }
    }

    //[GET] /store/order/:id
    // async order(req, res, next){
    //     try{
    //         const boardgame = await Boardgame.findById(req.params.id);
    //         res.render('boardgames/order', { 
    //             boardgame: mongooseToObject(boardgame),
    //          });
    //     } catch(error) {
    //         next(error);
    //     }
    // }
}

module.exports = new storeController();
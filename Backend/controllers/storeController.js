const Boardgame = require('../models/Boardgame');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');


class storeController {
    //[GET] /store
    async index(req, res, next) {
        try {
            const { name } = req.query; // Lấy giá trị tên sản phẩm từ query params
            let query = {}; // Mặc định là truy vấn tất cả sản phẩm

            // Nếu có tên sản phẩm được cung cấp, thêm điều kiện tìm kiếm vào truy vấn
            if (name) {
                query = { name: { $regex: name, $options: 'i' } };
            }
            const boardgamesOrigin = await Boardgame.find(query);
            const boardgamesCount = await Boardgame.countDocuments(query);
            const boardgamesNewest = await Boardgame.find(query).sort({createdAt : -1});
            const user = await User.findOne({ _id: req.session.user });
            const boardgames = req.query.boardgames || 'all';

            if(boardgames !== 'all'){
                const itemsPerPage = 20; // Số sản phẩm trên mỗi trang
                const currentPage = req.query.page || 1; // Trang hiện tại (mặc định là 1)
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = currentPage * itemsPerPage;
                const boardgamesPage = boardgamesNewest.slice(startIndex, endIndex);
                res.render('customer_website/boardgames/store', {
                    boardgames: multipleMongooseToObject(boardgamesPage),
                    currentPage,
                    totalPages: Math.ceil(boardgamesNewest.length / itemsPerPage),
                    user: user,
                    boardgamesCount: boardgamesCount,
            });
            }

            const itemsPerPage = 20; // Số sản phẩm trên mỗi trang
            const currentPage = req.query.page || 1; // Trang hiện tại (mặc định là 1)
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = currentPage * itemsPerPage;
            const boardgamesPage = boardgamesOrigin.slice(startIndex, endIndex);
            res.render('customer_website/boardgames/store', {
                boardgames: multipleMongooseToObject(boardgamesPage),
                boardgamesNewest: boardgamesNewest,
                currentPage,
                totalPages: Math.ceil(boardgamesOrigin.length / itemsPerPage),
                user: user,
                boardgamesCount: boardgamesCount,
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
            const user = await User.findOne({ _id: req.session.user });
            const formattedPrice = boardgame.price.toLocaleString('vi-VN');
            // const randomGames = shuffle(boardgames).slice(0, 5);

            //Sản phẩm tương tự theo khoảng giá hơn kém 100k
            const similarBoardgames = boardgames.filter((game) => Math.abs(game.price - boardgame.price) <= 100000 && game._id.toString() !== boardgame._id.toString());
            res.render('customer_website/boardgames/detail', { 
                boardgame: mongooseToObject(boardgame),
                similarBoardgames: multipleMongooseToObject(similarBoardgames),
                formattedPrice,
                user: user,
             });
            //  // Hàm xáo trộn mảng sản phẩm
            // function shuffle(array) {
            //     let currentIndex = array.length, temporaryValue, randomIndex;
            
            //     while (currentIndex !== 0) {
            //     randomIndex = Math.floor(Math.random() * currentIndex);
            //     currentIndex--;
            
            //     temporaryValue = array[currentIndex];
            //     array[currentIndex] = array[randomIndex];
            //     array[randomIndex] = temporaryValue;
            //     }
            
            //     return array;
            // }
          } catch (error) {
            next(error);
        }
    }
}

module.exports = new storeController();

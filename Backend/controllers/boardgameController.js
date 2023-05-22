const Boardgame = require('../models/Boardgame');
const { multipleMongooseToObject } = require('../util/mogoose');
const { mongooseToObject } = require('../util/mogoose');

class boardgameController {
    //[GET] /store
    async index(req, res, next) {
        try {
          const boardgames = await Boardgame.find({});
          const currentPage = 1;
          const itemsPerRow = 4;
          const rowsPerPage = 5;
          const startIndex = (currentPage - 1) * rowsPerPage * itemsPerRow;
          const endIndex = startIndex + rowsPerPage * itemsPerRow - 1;
      
          const productsPerPage = boardgames.slice(startIndex, endIndex + 1);
          const rows = [];
      
          for (let i = 0; i < productsPerPage.length; i += itemsPerRow) {
            rows.push(productsPerPage.slice(i, i + itemsPerRow));
          }
      
          res.render('layout/main', {
            rows: rows.map(row => multipleMongooseToObject(row))
          });
        } catch (error) {
          next(error);
        }
      }
      
    
    async page2(req, res, next) {
        try {
            const boardgames = await Boardgame.find({});
            const currentPage = 2;
            const itemsPerPage = 5;
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage - 1;

            const productsPerPage = boardgames.slice(startIndex, endIndex + 1);  
            res.render('layout/main', {
                boardgames: multipleMongooseToObject(productsPerPage)
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

    async order(req, res, next){
        try {
            res.send('Order page');
        }
        catch(error){
            next(error);
        }
    }
}

module.exports = new boardgameController();
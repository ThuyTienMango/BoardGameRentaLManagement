const boardgameRouter = require('./storeRouter');
const ordergameRouter = require('./orderRouter');
const userRouter = require('./userRouter');

function route(app){
    app.use('/user',userRouter);
    app.use('/store/order', ordergameRouter);
    app.use('/store', boardgameRouter);
}

module.exports = route;
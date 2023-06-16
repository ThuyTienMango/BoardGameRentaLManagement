const boardgameRouter = require('./storeRouter');
const ordergameRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');

function route(app){
    app.use('/user', userRouter);
    app.use('/store/order', ordergameRouter);
    app.use('/store', boardgameRouter);
    app.use('/', loginRouter);
}

module.exports = route;

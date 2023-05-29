const boardgameRouter = require('./storeRouter');
const ordergameRouter = require('./orderRouter');

function route(app){
    app.use('/store/order', ordergameRouter);
    app.use('/store', boardgameRouter);
}

module.exports = route;
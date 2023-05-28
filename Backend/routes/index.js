const boardgameRouter = require('./boradgameRouter');

function route(app){
    app.use('/store', boardgameRouter);
}

module.exports = route;
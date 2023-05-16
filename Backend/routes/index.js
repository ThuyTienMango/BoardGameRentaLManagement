const siteRouter = require('./siteRouter')
const boardgameRouter = require('./boradgameRouter');

function route(app){
    app.use('/store', boardgameRouter);
    app.use('/', siteRouter);
}

module.exports = route;
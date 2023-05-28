const siteRouter = require('./siteRouter');
const contactRouter = require('./contactRouter');
const boardgameRouter = require('./boradgameRouter');

function route(app){
    app.use('/store', boardgameRouter);
}

module.exports = route;
const siteRouter = require('./siteRouter');
const contactRouter = require('./contactRouter');
const userRouter = require('./userRouter');
const boardgameRouter = require('./boradgameRouter');


function route(app){
    app.use('/user', userRouter);
    app.use('/contact', contactRouter);
    app.use('/store', boardgameRouter);
    
    app.use('/', siteRouter);
}

module.exports = route;
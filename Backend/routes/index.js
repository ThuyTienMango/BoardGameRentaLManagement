const boardgameRouter = require('./storeRouter');
const ordergameRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

function route(app) {
  app.use('/user', userRouter);
  app.use('/store/order', ordergameRouter);
  app.use('/store', boardgameRouter);   
  app.use('/', authRouter); 
}

module.exports = route;

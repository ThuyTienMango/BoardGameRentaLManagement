const boardgameRouter = require('./storeRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const homeRouter = require('./homeRouter');
const adminRouter = require('./adminRouter');
const authController = require('../controllers/authController');

function route(app) {

  app.use('/admin', adminRouter);
  app.use('/', homeRouter); 
  app.use('/user', userRouter);
  app.use('/store/order', orderRouter);
  app.use('/store', boardgameRouter);   
  app.use('/', authRouter); 
}

module.exports = route;

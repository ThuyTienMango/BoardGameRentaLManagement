const bcrypt = require('bcrypt');
const users = require('../db');
const User = require('../models/User');

// class authController {
//   //[GET] /login
//   async getLoginPage(req, res, next){
//     try{
//       res.render('log_reg');
//     } catch(error) {
//         next(error);
//     }
// }
//   //[GET] /register
//   async getLoginPage(req, res, next){
//     try{
//       res.render('log_reg');
//     } catch(error) {
//         next(error);
//     }
// }
//   //[POST] /register
//   async getLoginPage(req, res, next){
//     try{
//       res.render('log_reg');
//     } catch(error) {
//         next(error);
//     }
// }
//   //[POST] /login
//   //[GET] /logout
// }

exports.getLoginPage = (req, res) => {
  res.render('login');
};

exports.getRegisterPage = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, tel, identity, address, img_identity } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(username, email, hashedPassword, tel, identity, address, img_identity);
    users.push(user);

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during registration.');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during login.');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

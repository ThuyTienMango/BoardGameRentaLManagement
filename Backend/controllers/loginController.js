const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Incorrect password' });
    }

    // Successful login
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.render('login', { error: 'An error occurred' });
  }
};

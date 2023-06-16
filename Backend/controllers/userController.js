const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Successful registration
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.render('register', { error: 'An error occurred' });
  }
};

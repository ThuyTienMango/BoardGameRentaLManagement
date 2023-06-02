const User = require('../models/User');
const { multipleMongooseToObject } = require('../util/mogoose');
const { mongooseToObject } = require('../util/mogoose');

class userController {

    //[GET] /user/register
    async reg(req, res, next){
        try {
            res.render('user/register');
        } catch(error) {
            next(error);
        }
    }


    //[POST] /user/save-customer-info
    async save(req, res, next){
      try {
        const formData = req.body;
        const user = new User(formData);
        user.save();
        res.redirect(`/user/${user._id}`);
      } catch(error) {
        next(error);
      }
    }

    //[GET] /user/:id
    async show(req, res, next){
      try {
        const user = await User.findById(req.params.id);
        res.render('user/info', { 
          user: mongooseToObject(user),
        });
      } catch(error) {
        next(error);
      }
    }
}

module.exports = new userController();
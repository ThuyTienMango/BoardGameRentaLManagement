const User = require('../models/User');

class homeController{
    async index (req, res, next){
        const user = await User.findOne({ _id: req.session.user });
        res.render('customer_website/layout/main',{
            user: user
        });
    }catch(error){
        next(error);
    }
}

module.exports = new homeController();

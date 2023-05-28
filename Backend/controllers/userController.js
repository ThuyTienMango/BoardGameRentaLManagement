class userController {
    async index(req, res, next){
        try {
            res.send('User Page');
        } catch(error){
            next(error);
        }
    }
}

module.exports = new userController();
class siteController {
    async index(req, res, next){
        try{
            res.send('Landing page');
        } catch(error){
        next(error);
        }
    }
}

module.exports = new siteController();
class contactController {
    async index(req, res, next){
        try {
            res.send('Contact Page');
        } catch(error){
            next(error);
        }
    }
}

module.exports = new contactController();
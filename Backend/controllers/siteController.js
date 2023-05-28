class siteController {
    index(req, res){
            res.send('Landing page');
    }
}

module.exports = new siteController();
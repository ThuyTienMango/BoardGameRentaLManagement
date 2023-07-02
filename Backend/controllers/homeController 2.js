const User = require('../models/User');

class homeController{
    async index (req, res, next){
        const user = await User.findOne({ _id: req.session.user }); //sử dụng phương thức findOne để tìm kiếm một người dùng trong cơ sở dữ liệu dựa trên giá trị _id lấy từ session (req.session.user) (phiên người dùng hiện tại sau khi đăng nhập)
        res.render('customer_website/layout/main',{ //render một file view có tên là 'customer_website/layout/main'.
            user: user //Trong quá trình render, chúng ta truyền một đối tượng { user: user } để truyền thông tin người dùng vào view.
        });
    }catch(error){  
        next(error);
    }
}

module.exports = new homeController();

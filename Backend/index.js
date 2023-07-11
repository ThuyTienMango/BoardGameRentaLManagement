const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');


const db = require('./db');
const route = require('./routes');

const app = express();

app.use(flash());

// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  })
);

// Kết nối tới cơ sở dữ liệu
db.connect();

// Middleware ghi log HTTP
app.use(morgan('combined'));

// Khởi tạo các route
route(app);

app.listen(3000, function(req, res) {
  console.log('Server started on port 3000');
});

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');
const route = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối tới cơ sở dữ liệu
db.connect();

// Middleware ghi log HTTP
app.use(morgan('combined'));

// Khởi tạo các route
route(app);

app.listen(3000, function(req, res) {
  console.log('Server started on port 3000');
});

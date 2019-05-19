// 引入编写好的api
const login_api = require('./api/login');
const learn_api = require('./api/learn');
const poetry_api = require('./api/poetry');
const email_api = require('./api/email');
const image_api = require('./api/upload/image');
const home_api = require('./api/home');
const user_api = require('./api/user');
const count_api = require('./api/count');

// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(login_api);
app.use(learn_api);
app.use(poetry_api);
app.use(email_api);
app.use(image_api);
app.use(home_api);
app.use(user_api);
app.use(count_api);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist/')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 监听8088端口
app.listen(8081);
console.log('success listen 8080 …………');

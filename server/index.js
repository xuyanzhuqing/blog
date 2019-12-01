const port = 80;
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// 引入Express
const express = require('express');
const app = express();

// 开启gzip
app.use(require('compression')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 加载 api 接口
const controllers = require('require-all')({
    dirname: path.resolve(__dirname, './api'),
    filter: function (fileName) {
        const blackList = ['log.js', 'upload.js'];
        console.info(fileName)
        if (blackList.includes(fileName)) return;
        return fileName;
    }
});
const api = Object.keys(controllers).filter(v => v !== 'upload');
console.info(controllers.upload)
api.forEach(v => app.use(controllers[v]));

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist/')));
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/', function (req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    res.send(html);
});
// 监听8088端口
app.listen(port, () => {
	console.log('success listen ' + port + ' …………');
});


// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('../db');
const express = require('express');
const router = express.Router();
const {addLog} = require('./log');

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req,res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  const {account, password} = req.body;
  let newAccount = new models.Login({ account,password});

  models.Login.find({account}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      if (data.length > 0) {
        res.send('0')
      } else {
        // 保存数据newAccount数据进mongoDB
        newAccount.save((err,data) => {
          if (err) {
            res.send(err);
          } else {
            res.send(account);
          }
        });
      }
    }
    addLog({type: 'createAccount', account})
  });
});

// 获取已有账号接口
router.get('/api/login/getAccount',(req,res) => {
  const {account = ''} = req.body;
  // 通过模型去查找数据库
  const filters = account ? {account}: {};
  models.Log.find(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 删除已有账户
router.post('/api/login/removeAccount',(req,res) => {
  const {account = ''} = req.body;
  // 通过模型去查找数据库
  models.Login.remove({account},(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改账号信息
router.post('/api/login/updateAccount',(req,res) => {
  const {account = 'michael', password= '123'} = req.body;
  // 通过模型去查找数据库
  models.Login.update({account}, {account, password}, {},(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


// 登陆接口
/*
  未注册 0
  用户名密码不正确 1
  返回成功2
*/
router.post('/api/login/loginIn',(req,res) => {
  const {account, password} = req.body;
  
  // 判断用户名密码是否正确
  if (account !== '' && password !=='') {
    models.Login.find({account},(err,data) => {
      if (err) {
        res.send(err);
      } else {
        if (data.length > 0) {
          const {account: dbAccount, password: dbPassword } = data[0];
          if (account === dbAccount && password === dbPassword) {
            res.send('2')
          } else {
            res.send('1')
          }
        } else {
          res.send('0');
        }
      }
    });
  } else {
    res.send('1');
  }
  addLog({type: 'loginIn', account});
});

module.exports = router;

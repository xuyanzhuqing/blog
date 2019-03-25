"use strict";
const models = require('../db');
const express = require('express');
const router = express.Router();
const {addLog, getGuid} = require('./log');

/**
 * 针对用户的信息的增删改查
 * 
 */
// 个人账户信息
router.post('/api/user/post', (req,res) => {
  const {account, logo = ""} = req.body;
  let newAccount = new models.User({ account, logo});

  models.User.find({account}, (err,data) => {
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

module.exports = router;
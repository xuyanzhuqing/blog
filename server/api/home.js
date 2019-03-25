"use strict";
const models = require('../db');
const express = require('express');
const router = express.Router();
const {addLog, getGuid} = require('./log');


router.post('/api/home/create', (req,res) => {
	const currentId = req.body.id;
	let news = new models.Home({...req.body, id: currentId || getGuid(), lastModified: new Date()});
	news.save((err,data) => {
		if (err) {
			res.send(err);
		} else {
			res.send('1');
		}
	});
  addLog({type: 'createHome'})
});

// 获取已有文章
router.post('/api/home/pull',(req,res) => {
  const {id = ''} = req.body;
  // 通过模型去查找数据库
  const filters = id ? {id}: {};
  models.Learn.find(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      // console.info(data, '---------')
      res.send(data);
    }
  });
});

// 修改账号信息
router.post('/api/home/update',(req,res) => {
  const {id} = req.body;
  // 通过模型去查找数据库
  models.Home.update({id}, req.body, {},(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
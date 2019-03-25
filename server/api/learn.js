"use strict";
const models = require('../db');
const express = require('express');
const router = express.Router();
const {addLog, getGuid} = require('./log');


router.post('/api/learn/create', (req,res) => {
	const currentId = req.body.id;
	let news = new models.Learn({...req.body, id: currentId || getGuid(), lastModified: new Date()});
	news.save((err,data) => {
		if (err) {
			res.send(err);
		} else {
			res.send('1');
		}
	});
  addLog({type: 'createLearn'})
});

// 获取已有文章
router.post('/api/learn/pull',(req,res) => {
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

// 删除已有文章
router.post('/api/learn/delete',(req,res) => {
  const {id = ''} = req.body;
  // 通过模型去查找数据库
  const filters = id ? {id}: {};
  models.Learn.remove(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
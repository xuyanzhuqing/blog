"use strict";
const models = require('../db');
const express = require('express');
const router = express.Router();
const {addLog, getGuid} = require('./log');

router.post('/api/poetry/create', (req,res) => {
	const currentId = req.body.id;
  const guid = getGuid();
	let news = new models.Poetry({...req.body, id: currentId || guid, lastModified: new Date()});
	news.save((err,data) => {
		if (err) {
			res.send(err);
		} else {
			res.send(guid);
		}
	});
  addLog({type: 'createPoetry'})
});

// 获取已有文章
router.post('/api/poetry/pull',(req,res) => {
  const {id = ''} = req.body;
  // 通过模型去查找数据库
  const filters = id ? {id}: {};
  console.info(filters)
  models.Poetry.find(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 删除已有文章
router.post('/api/poetry/delete',(req,res) => {
  const {id = ''} = req.body;
  // 通过模型去查找数据库
  const filters = id ? {id}: {};
  models.Poetry.remove(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改账号信息
router.post('/api/poetry/update',(req,res) => {
  const {id} = req.body;
  // 通过模型去查找数据库
  models.Poetry.update({id}, req.body, {},(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
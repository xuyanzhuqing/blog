"use strict";
const models = require('../../db');
const express = require('express');
const router = express.Router();
const {addLog, getGuid} = require('../log');
const upload = require('./upload')

const fileName = 'file';
router.post('/api/image/create', upload.single(fileName), (req, res, next) => {
	// 一、 存储文件到文件服务器中
	// 二、 存储地址到数据库
	if (req.file) {
		const {id: currentId, author='admin'} = req.body;
		let news = new models.Image({...req.body, id: currentId || getGuid(), author, lastModified: new Date(), content: req.file.path});
		news.save((err,data) => {
			if (err) {
				res.send(err);
			} else {
				res.send('1');
			}
		});
	}
});

// 获取已有文章
router.post('/api/image/pull',(req,res) => {
  const {id = ''} = req.body;
  // 通过模型去查找数据库
  const filters = id ? {id}: {};
  models.Image.find(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      //数据清洗，去掉盘符信息
      data.map((v) => Object.assign(v, {content: v.content.replace(/(.*)(?=static)/, '')}))
      res.send(data);
    }
  });
});

// 删除已有文章
router.post('/api/image/delete',(req,res) => {
  const {id = ''} = req.body;
  // 通过模型去查找数据库
  const filters = id ? {id}: {};
  models.Image.remove(filters, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

console.info(__dirname, '&&&&')

module.exports = router;
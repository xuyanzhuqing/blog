'use strict';
const models = require('../db');
const express = require('express');
const router = express.Router();
const { addLog, getGuid } = require('./log');
const { getLocalIP } = require('../utils');

// 访问量新增
router.post('/api/count/create', (req, res) => {
    const news = new models.Count({
        id: getGuid(),
        ip: getLocalIP(),
        lastModified: new Date()
    });
    news.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('1');
        }
    });
    addLog({ type: 'createCount' });
});

// 获取访问量数据长度
router.post('/api/count/pull', (req, res) => {
    const { more = false } = req.body;
    // 通过模型去查找数据库
    models.Count.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if (more) {
                res.send(data);
            } else {
                const len = JSON.stringify(data.length);
                res.send(len);
            }
        }
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');

const exec = require('child_process').exec;

router.post('/api/email', (req,res) => {
	const {
		host: mail_host = 'smtp.163.com',
		user: mail_user = '18392352270@163.com',
		pass: mail_pass = 'w15212595946',
		receivers = ['962275976@qq.com'],
		title = 'te1st',
		contect = ''
	} = req.body;


	let {content = 'content'} = req.body.content;
	// 拼接参数 联系人方式
	content += `<div>
		wechat: ${contect}
	</div>`;

	// 拼接参数
	const params = ` ${path.resolve(__dirname, './../py/mail.py')} ${mail_host} ${mail_user} ${mail_pass} ${receivers} ${title} ${encodeURI(content)} `;
	console.info(params, 'params');
	exec('python' + params, function(error,stdout,stderr){
	    if (stdout.length > 1) {
	        console.log('you offer args:',stdout);
	        res.send('success')
	    } else {
	        console.log('you don\'t offer args');
	    }
	    if(error) {
	        console.info('stderr : '+stderr);
	    }
	});

});

module.exports = router;
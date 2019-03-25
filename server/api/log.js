const models = require('../db');


// 增加log信息
const addLog = ({type, account = 'michael', lastModified = new Date().toString()})=>{
  let newLog = new models.Log({ account, lastModified, type });
  
  newLog.save((err, data) => {
    if (err) {
      // res.send(err);
    } else {
      console.log('loged')
      // res.send('1');
    }
  });
}

// 生成guid
const getGuid = (bool) => {
    let guid ='';
    for (let i = 1; i <= 32; i++) {
        const flag = Math.floor(Math.random() * 10);
        if (flag % 2 === 0 ) {
            const caseMode = bool ? 65 : 97;
            let n = Math.floor(flag * 2.4) + caseMode;

            n = String.fromCharCode(n);
            guid += n;
        } else {
            guid += flag;
        }
        if (i === 8 || i === 12 || i=== 16 || i=== 20) {
            guid += '-';
        }
    }
    return guid;
}


module.exports = {
	addLog,
  getGuid
}
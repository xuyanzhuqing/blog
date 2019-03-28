const os = require('os');


// 获取本机ip
const getLocalIP = () => {
    const ifaces = os.networkInterfaces();
    let locatIp = '';
    for (let dev in ifaces) {

        if (dev === '本地连接') {
            for (let j = 0; j < ifaces[dev].length; j++) {
                if (ifaces[dev][j].family === 'IPv4') {
                    locatIp = ifaces[dev][j].address;
                    break;
                }
            }
        }
    }
    return locatIp;
}

module.exports = {
    getLocalIP
}

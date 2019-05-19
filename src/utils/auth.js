import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken () {
    return Cookies.get(TokenKey);
}

export function setToken (token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken () {
    return Cookies.remove(TokenKey);
}

export function dateFtt (fmt, date) { // author: meizz
    var o = {
        // 月份
        'M+': date.getMonth() + 1,
        // 日
        'd+': date.getDate(),
        // 小时
        'h+': date.getHours(),
        // 分
        'm+': date.getMinutes(),
        // 秒
        's+': date.getSeconds(),
        // 季度
        'q+': Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

export function IsMobile () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
    var bIsMidp = sUserAgent.match(/midp/i) === 'midp';
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4';
    var bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb';
    var bIsAndroid = sUserAgent.match(/android/i) === 'android';
    var bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce';
    var bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile';
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false;
    }
}

import router from '../router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false });// NProgress Configuration

import {
    getStorageByKey,
    getToken
} from '@/utils/auth'; // getToken from cookie;

// permission judge function
function hasPermission (roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login', '/authredirect']; // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    // console.info('判断权限');
    // 如果是跳转后台管理页面，则需要判断是否登陆

    next();
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

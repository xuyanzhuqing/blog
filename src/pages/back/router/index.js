import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/back/management/pages/login')
        },
        {
            path: '/',
            name: '',
            component: () => import('@/pages/back/management/index'),
            children: [{
                path: '/home/*',
                name: 'BackHome',
                component: () => import('@/pages/back/management/pages/home')
            }, {
                path: '/learn/*',
                name: 'BackLearn',
                component: () => import('@/pages/back/management/pages/learn')
            }, {
                path: '/poetry/*',
                name: 'BackPoetry',
                component: () => import('@/pages/back/management/pages/poetry')
            }, {
                path: '/about/*',
                name: 'BackAbout',
                component: () => import('@/pages/back/management/pages/about')
            }, {
                path: '/resource/*',
                name: 'BackResource',
                component: () => import('@/pages/back/management/pages/resource')
            }]
        },
        {
            path: '/api',
            name: 'api',
            component: () => import('@/pages/back/api')
        }
    ]
});

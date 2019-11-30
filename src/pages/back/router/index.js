import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            name: 404,
            component: r => require.ensure([], () => r(require('@/components/404.vue')))
        },
        {
            path: '/login',
            name: 'login',
            component: r => require.ensure([], () => r(require('@/pages/back/pages/login')))
        },
        {
            path: '/',
            name: '',
            component: r => require.ensure([], () => r(require('@/pages/back/pages/index'))),
            children: [{
                path: '/home/*',
                name: 'BackHome',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/home')))
            }, {
                path: '/learn/*',
                name: 'BackLearn',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/learn')))
            }, {
                path: '/poetry/*',
                name: 'BackPoetry',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/poetry')))
            }, {
                path: '/about/*',
                name: 'BackAbout',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/about')))
            }, {
                path: '/resource/*',
                name: 'BackResource',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/resource')))
            }]
        },
        {
            path: '/api',
            name: 'api',
            component: r => require.ensure([], () => r(require('@/pages/back/api')))
        }
    ]
});

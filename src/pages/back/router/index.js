import Vue from 'vue';
import Router from 'vue-router';
import routeReplaceSelf from '@/utils/routeReplaceSelf';

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
            name: 'web',
            component: r => require.ensure([], () => r(require('@/pages/back/pages/index'))),
            children: [{
                path: '/home',
                name: 'home',
                icon: 'icon-home',
                component: routeReplaceSelf(r => require.ensure([], () => r(require('@/pages/back/pages/home')))),
                children: [{
                    path: '/home/test',
                    name: 'test',
                    component: routeReplaceSelf(r => require.ensure([], () => r(require('@/pages/back/pages/home/test'))))
                }]
            }, {
                path: '/learn',
                name: 'learn',
                icon: 'icon-learn',
                component: routeReplaceSelf(r => require.ensure([], () => r(require('@/pages/back/pages/learn')))),
                children: [{
                    path: '/learn/new',
                    name: 'new',
                    component: routeReplaceSelf(r => require.ensure([], () => r(require('@/pages/back/pages/learn/new'))))
                }]
            }, {
                path: 'poetry',
                name: 'poetry',
                icon: 'icon-poetry',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/poetry')))
            }, {
                path: 'about',
                name: 'about',
                icon: 'icon-about',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/about')))
            }, {
                path: 'resource',
                name: 'resource',
                component: r => require.ensure([], () => r(require('@/pages/back/pages/resource')))
            }]
        },
        {
            path: '/api',
            name: 'api',
            component: r => require.ensure([], () => r(require('@/pages/back/components/api')))
        }
    ]
});

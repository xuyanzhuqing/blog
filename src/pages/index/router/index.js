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
            path: '/',
            name: 'Blog',
            component: r => require.ensure([], () => r(require('@/pages/index/pages/index'))),
            redirect: 'home',
            children: [{
                path: '/home',
                name: 'home',
                component: r => require.ensure([], () => r(require('@/pages/index/pages/home')))
            }, {
                path: '/learn',
                name: 'learn',
                component: r => require.ensure([], () => r(require('@/pages/index/pages/learn')))
            }, {
                path: '/poetry',
                name: 'poetry',
                component: r => require.ensure([], () => r(require('@/pages/index/pages/poetry')))
            }, {
                path: '/about',
                name: 'about',
                component: r => require.ensure([], () => r(require('@/pages/index/pages/about')))
            }]
        }
    ]
});

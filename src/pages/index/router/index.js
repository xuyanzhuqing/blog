import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            name: 404,
            component: r => require.ensure([], () => r(require('@/pages/404.vue')))
        },
        {
            path: '/',
            name: 'Blog',
            component: r => require.ensure([], () => r(require('@/pages/index/components/index'))),
            redirect: 'home',
            children: [{
                path: '/home',
                name: 'home',
                component: r => require.ensure([], () => r(require('@/pages/index/components/pages/home')))
            }, {
                path: '/learn',
                name: 'learn',
                component: r => require.ensure([], () => r(require('@/pages/index/components/pages/learn')))
            }, {
                path: '/poetry',
                name: 'poetry',
                component: r => require.ensure([], () => r(require('@/pages/index/components/pages/poetry')))
            }, {
                path: '/about',
                name: 'about',
                component: r => require.ensure([], () => r(require('@/pages/index/components/pages/about')))
            }]
        }
    ]
});

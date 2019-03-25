import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Blog',
            component: () => import('@/pages/index/components/index'),
            redirect: 'home',
            children: [{
                path: '/home',
                name: 'home',
                component: () => import('@/pages/index/components/pages/home')
            }, {
                path: '/learn',
                name: 'learn',
                component: () => import('@/pages/index/components/pages/learn')
            }, {
                path: '/poetry',
                name: 'poetry',
                component: () => import('@/pages/index/components/pages/poetry')
            }, {
                path: '/about',
                name: 'about',
                component: () => import('@/pages/index/components/pages/about')
            }]
        }
    ]
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import http from 'axios';
import './axios/permission';


// /* iconfont */
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';

import 'animate.css';

// 引入element-ui组件
import {
    Pagination,
    Dialog,
    Menu,
    MenuItem,
    Input,
    Button,
    Form,
    FormItem,
    Tree,
    Row,
    Col,
    Card,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    Scrollbar
} from 'element-ui';


Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tree);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Scrollbar);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;

// 设置尺寸
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.config.productionTip = false;
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});

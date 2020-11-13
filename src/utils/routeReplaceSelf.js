/*
 * @Description:  默认在一级路由组件里的router-view里 只能显示二级路由的组件 本文采用高阶路由方法可实现替换二级路由本身，
 * 实现再一级路由里显示三级路由的界面UI效果， 代码来自于http://liximomo.github.io/vue-router-replace
 * @Author: 忆达夫
 * @Date: 2018/11/10
 * @Last Modified by: 忆达夫
 * @Last Modified time: 14:55
 */
export default function routeReplaceSelf (component) {
    return {
        name: 'RouterReplaceSelf',
        computed: {
            showChild () {
                const deepestMatchedRoute = this.$route.matched[this.$route.matched.length - 1];
                return deepestMatchedRoute.instances.default !== this;
            }
        },
        render (h) {
            // 当从子路由返回父组件时，父组件会重新 mount。这里可以借助 keep-alive 来缓存组件避免不必要的 mount
            // return this.showChild ? h('keep-alive', [h('router-view')]) :  h(component);
            return this.showChild ? h('router-view') : h(component);
        }
    };
};

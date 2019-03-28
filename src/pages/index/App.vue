<template>
    <router-view/>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {};
    },
    mounted () {
        // this.countVisitor();
    },
    methods: {
        // // 发送请求统计访问量
        // countVisitor () {
        //     this.$http.post('/api/count/create', {}).then(res => {
        //         debugger
        //     }).catch((err) => {
        //         console.error(err);
        //     });
        // }
    }
};
</script>

<style lang='scss'>
@import '~@/assets/scss/reset.scss';
body {
    background-color: #DDD6CC;
}
</style>

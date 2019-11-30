<template>
    <el-menu ref="top" :default-active="activeIndex" class="layout top-header" mode="horizontal" router @select="handleSelect" background-color="" text-color='#484848' active-text-color="#ffd04b">
        <el-menu-item v-for='v in modules.types' :index="'/' + v" v-show="true" class="transition-box" :key="v">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href='setIcon(v)'></use>
            </svg>
            {{v}}
        </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    data () {
        return {
            activeIndex: '1',
            modules: {
                types: ['home', 'learn', 'poetry', 'about'],
                index: {

                },
                learn: {

                },
                poetry: {

                },
                about: {

                }
            }
        };
    },
    mounted () {},
    methods: {
        handleSelect () {
            // alert(12)
        },
        setIcon (name) {
            return '#icon-' + name;
        }
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.top-header {
    height: 100%;
    background: lightseagreen;
    margin: 0 auto;
    &>li.el-menu-item {
        font-size: rem(20);
    }
    &>li.el-menu-item:hover {
        background: #F16E50;
        transition: All 0.5s ease;
        color: #fff;
        z-index: 10
    }
}

</style>

<template>
    <el-container class='auto'>
        <el-aside width="">
            <backSide></backSide>
        </el-aside>
        <el-container>
            <el-header class='topbar'>
                <el-row :gutter="20">
                    <el-col :span="6" :offset="18" style='text-align:right'>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import backSide from '@/pages/back/management/modules/aside.vue';
export default {
    name: 'management',
    data () {
        return {
            code: ''
        };
    },
    methods: {
        handleOpen (key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath);
        }
    },
    components: {
        backSide
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.el-container {
    .el-aside {
        background: rgb(84, 92, 100);
        border-right: 1px solid #fff;
    }
}

.topbar {
    height: rem(60);
    line-height: rem(60);
    background: rgb(84, 92, 100);
}

.el-main {
    padding: 10px;
    background: #fff;
}

</style>

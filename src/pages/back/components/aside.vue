<template>
    <div class='auto back-aside'>
        <el-row class="tac">
            <el-col>
                <h5 class='logo'>
                    <span>management</span>
                </h5>
                <el-menu default-active="2"
                        :unique-opened='true'
                        :router='true'
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <treeMemu v-for="menu in menuRoutes" :key="menu.path" :data="menu"></treeMemu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import treeMemu from '@/components/menu-item/index.vue';
export default {
    name: 'backAside',
    components: {
        treeMemu
    },
    data () {
        return {
            code: ''
        };
    },
    computed: {
        // 排除孙菜单
        menuRoutes () {
            const routes = this.$router.options.routes.find(v => v.path === '/').children;
            const result = [];
            routes.forEach(v => {
                const { children, ...rest } = v;
                console.info(children);
                result.push(rest);
            });
            return result;
        }
    }
};

</script>
<style scoped lang="scss">
@import '~@/assets/scss/caculate.scss';
.back-aside {
    width: rem(250);
}

h5.logo {
    width: 100%;
    height: rem(100);
    line-height: rem(100);
    text-align: center;
    background: rgb(84, 92, 100);
    color: #fff
}

.el-menu {
    border: none;
}

</style>

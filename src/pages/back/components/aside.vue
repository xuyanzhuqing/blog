<template>
    <div class='auto back-aside'>
        <el-row class="tac">
            <el-col>
                <h5 class='logo'>
                    <span>management</span>
                   <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group> -->
                </h5>
                <el-menu default-active="2" :unique-opened='true' :router='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="/">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>pages</span>
                        </template>
                        <el-submenu index="/home">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>home</span>
                            </template>
                            <el-submenu index="1-1">
                                <template slot="title">header</template>
                                <el-menu-item index="/home/header/icon">icon</el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-2">
                                <template slot="title">aside</template>
                                <el-menu-item index="/home/aside/logo">logo</el-menu-item>
                                <el-menu-item index="/home/aside/banner">banner</el-menu-item>
                                <el-menu-item index="/home/aside/picture">picture</el-menu-item>
                                <el-menu-item index="/home/aside/tag">tag</el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-3">
                                <template slot="title">footer</template>
                                <el-menu-item index="/home/footer/photo">photo</el-menu-item>
                                <el-menu-item index="/home/footer/message">message</el-menu-item>
                                <el-menu-item index="/home/footer/focus">focus</el-menu-item>
                                <el-menu-item index="/home/footer/friendLink">friendLink</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="/learn">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>learn</span>
                            </template>
                            <el-menu-item index="/learn/new">new</el-menu-item>
                            <el-menu-item index="/learn/manage">manage</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/poetry">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>poetry</span>
                            </template>
                            <el-menu-item index="/poetry/flyFlower">
                                flyFlower
                            </el-menu-item>
                            <el-menu-item index="/poetry/appreciation">
                                appreciation
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="/about">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span>about</span>
                            </template>
                            <el-menu-item index="/about/eidt">edit</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="/resource">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>resource</span>
                        </template>
                        <el-menu-item index="/resource/image">
                            image
                        </el-menu-item>
                        <el-menu-item index="/resource/vedio">
                            vedio
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/api">
                        <i class="el-icon-menu"></i>
                        <span slot="title">api</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'backAside',
    data () {
        return {
            code: '',
            isCollapse: false
        };
    },
    methods: {
        handleOpen (key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath);
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
} // .el-menu-vertical-demo:not(.el-menu--collapse) {
//    width: 200px;
//  }

</style>

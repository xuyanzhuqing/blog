<template>
    <el-container>
        <el-header ref="nav" height='' class="nav">
            <header-com></header-com>
        </el-header>
        <router-view/>
        <el-footer height='' class="footer">
            <footerCom></footerCom>
        </el-footer>
    </el-container>
</template>
<script>
// import {requseLogin} from "@/axios/api";

export default {
    name: 'blog',
    components: {
        headerCom: () => import('@/pages/index/components/header.vue'),
        footerCom: () => import('@/pages/index/components/footer.vue')
    },
    activated () {
        console.info('111');
    },
    deactivated () {},
    mounted () {
        //  mockjs 调用实例
        // requseLogin({
        //     username: 'admin',
        //     password: '123456'
        // }).then(res => {
        //     debugger
        // }).catch(err => {
        //     console.info(err);
        // })
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.el-header {
    height: rem(60);
    padding: 0;
    // background: -webkit-gradient(linear, 78% 100%, 78% 41%, from(rgb(252, 227, 221)), to(#fff))
}

.el-footer {
    margin-top: rem(50);
    height: rem(371);
    background-color: #242221;
    border-top: 9px solid #f16e50;
    color: #333;
}

.layout {
  margin: 0 auto;
  height: 100%;
}

@media screen and (min-width: 960px) {
  .layout {
      width: 960px;
  }
}

@media screen and (max-width: 600px) {
  .layout {
    width: 100%;
  }

  .nav {
      position: fixed;
      z-index: 9999;
      bottom: 0;
      border-top: 5px solid #DDD6CC;
  }
  .footer {
      display: none;
  }
}

</style>

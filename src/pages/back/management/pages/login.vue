<template>
  <div style="height: 100%; background: #eee">
    <iframe
      class="bg"
      src="/static/plugins/html5-text-pixel/index.html"
      frameborder="0"
      width="100%"
      height="700rem"
    ></iframe>
    <el-form
      class="enterBox"
      :ref="current"
      :model="model"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="account">
        <el-input type="text" v-model.trim="model.account" clearable auto-complete></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="model.password" clearable auto-complete></el-input>
      </el-form-item>
      <el-form-item v-if="!isLogin" label="确认密码" prop="checkPass">
        <el-input type="password" v-model.tirm="model.checkPass" clearable auto-complete></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="submit">{{!isLogin ? '注册' : '登陆'}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-if="isLogin" v-model="model.checked">记住密码</el-checkbox>
        <span
          :style="[isLogin ? {marginLeft: '20px'} : {}]"
          class="shift"
          @click="shift"
        >{{isLogin ? '注册账号' : '已有账号，直接登陆。'}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            rules: {},
            model: {},
            current: 'login'
        };
    },
    computed: {
        isLogin () {
            return this.current === 'login';
        }
    },
    created () {
    // 判断是否登陆过，如果已经登陆，则直接跳转管理页面
    },
    methods: {
        submit () {
            if (this.isLogin) {
                this.doLogin();
            } else {
                this.doRegist();
            }
        },
        doRegist () {
            const { account, password } = this.model;
            this.$http
                .post('/api/login/createAccount', { account, password })
                .then(res => {
                    if (res.data) {
                        this.$message({
                            type: 'success',
                            message: '注册成功'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.model.account + '已经被注册'
                        });
                    }
                })
                .catch(err => {
                    throw err;
                });
        },
        doLogin () {
            const { account, password } = this.model;
            this.$http
                .post('/api/login/loginIn', { account, password })
                .then(res => {
                    switch (res.data) {
                    case 0:
                        this.$message({
                            type: 'error',
                            message: this.model.account + '未注册'
                        });
                        break;
                    case 1:
                        this.$message({
                            type: 'error',
                            message: '用户名密码不正确'
                        });
                    case 2:
                        this.$message({
                            type: 'success',
                            message: '登陆成功'
                        });
                        this.$router.push('/management');
                        break;
                    default:
                    }
                })
                .catch(err => {
                    throw err;
                });
        },
        shift () {
            this.current = this.isLogin ? 'regist' : 'login';
            this.model = {};
        }
    }
};
</script>
<style scoped lang="scss">
@import "~@/assets/scss/caculate.scss";

.bg {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(100% - 700px);
  bottom: 0;
  right: 0;
}
.enterBox {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 60px auto;
  width: rem(500);
  height: rem(300);
}
.shift {
  color: #606266;
}
</style>

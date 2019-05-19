<template>
    <div id="app">
        <article v-for='(v, i) in form' :key='i'>
            <el-input type="text" v-for='(sv, si) in v' :key='si' v-model='form[i][si]' :placeholder='si'></el-input>
            <el-button type="info" @click='excute(i)'>{{i}}</el-button>
            <p class='status'>{{status}}</p>
        </article>
    </div>
</template>

<script>
export default {
    name: 'App',
    props: {
        types: {
            type: Array,
            default () {
                return ['create', 'login', 'remove', 'update', 'getAll'];
            }
        },
        forms: {
            type: Object,
            default () {
                return {
                    create: {
                        account: 'admin',
                        password: 'admin'
                    },
                    login: {
                        account: 'admin',
                        password: 'admin'
                    },
                    remove: {
                        account: 'admin'
                    },
                    update: {
                        account: 'admin',
                        password: '123'
                    },
                    getAll: {
                        account: ''
                    }
                };
            }
        }
    },
    data () {
        const renderBox = {};
        this.types.forEach((v) => {
            renderBox[v] = this.forms[v];
        });
        return {
            form: renderBox,
            status: '',
            check: {},
            data: {},
            list: [],
            status: 0
        };
    },
    methods: {
        excute (i) {
            this[i](this.form[i]);
        },
        update (param) {
            this.$http.post('/api/login/updateAccount', param)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        remove (param) {
            this.$http.post('/api/login/removeAccount', param)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        login (param) {
            const me = this;
            this.$http.post('/api/login/loginIn', param)
                .then(function (response) {
                    me.status = '登陆成功';
                })
                .catch(function (err) {
                    me.status = '登陆失败';
                });
        },
        create (param) {
            const { account, password } = this;
            this.$http.post('/api/login/createAccount', param)
                .then(function (response) {
                    // 通知组件更新用户
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        getAll (param) {
            this.$http.get('/api/login/getAccount', param)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
};
</script>
<style scoped lang='scss'>
    form {
        padding: 50px;
    }
    .el-input, .el-button {
        margin-bottom: 10px;
        width: calc(100% - 100px);
    }

    .status {
        color: #fff
    }

</style>

<template>
    <div id="app">
        <article v-for='(v, i) in form' :key='i'>
            <el-input type="text" v-for='(sv, si) in v' :key='si' v-model='form[i][si]' :placeholder='si'></el-input>
            <el-button type="info" @click='excute(i)'>{{i}}</el-button>
            <p class='status'>{{status}}</p>
        </article>
    </div>
    <!-- <div>
        <el-button @click='doCheck'>分析开始</el-button>

        <el-table
      :data="gridType"
      style="width: 100%">
      <el-table-column
        prop="checked"
        label="校对"
        width="180">
      </el-table-column>

      <template v-if='true'>
          <el-table-column
            prop="bankIndex"
            label="银行索引"
            width="180">
          </el-table-column>

          <el-table-column
            prop="CNY"
            sortable
            label="CNY索引"
            width="180">
          </el-table-column>

          <el-table-column
            prop="type"
            label=币种
            width="180">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
           <el-table-column
            prop="company"
            label="公司">
          </el-table-column>
      </template>
    </el-table> -->
    <!-- </div> -->
</template>

<script>
import axios from 'axios';
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
    computed: {
        gridType () {
            return this.searchType();
        }
    },
    created () {
        axios.all([
            this.$http('/static/check/bankRecord.csv'),
            this.$http('/static/check/Collection-CNY.csv'),
            this.$http('/static/check/Collection-USD.csv')
        ]).then(axios.spread((bankRecord, CollectionCNY, CollectionUSD) => {
            const temp = {
                bankRecord: bankRecord.data,
                CollectionCNY: CollectionCNY.data,
                CollectionUSD: CollectionUSD.data
            };
            this.$set(this, 'data', temp);

            for (const key in temp) {
                this.turnGrid(temp[key], key);
            }
        })).catch(err => {
            throw err;
        });
    },
    methods: {
        searchType (type = 'CNY') {
            const result = [];
            const map = {};

            this.list.filter(v => {
                const bool = v.type === type;
                if (bool) {
                    map[v.CNY] = v;
                }

                return bool;
            });

            const grid = this.check['Collection' + type + 'body'];
            if (grid) {
                for (let i = 0, l = grid.length; i < l; i++) {
                    let temp = {};
                    if (map[i + 1]) {
                        temp = map[i + 1];
                    } else {
                        temp = {
                            CNY: i + 1,
                            checked: 'N'
                        };
                    }

                    result.push(temp);
                }
            }
            return result;
        },
        doCheck () {
            // 分析银行记录与中文币种

            const list = [];

            const mapCNY = {
                length: 0
            };

            const mapUSD = {
                length: 0
            };

            for (let i = 0, len1 = this.check.bankRecordbody.length; i < len1; i++) {
                const row = this.check.bankRecordbody[i];
                const date = row[1];
                const bankMoney = row[row.length - 1];
                const flag = (row[1] + '&' + row[row.length - 1]).replace(/\s/g, ''); // 日期加金额

                const temp = {
                    bankIndex: i + 1,
                    checked: 'N'
                };

                if (row[row.length - 2] === 'CNY') {
                    for (let j = 0, len2 = this.check.CollectionCNYbody.length; j < len2; j++) {
                        const compare = this.check.CollectionCNYbody[j];
                        const isDate = compare.includes(date);
                        const isBankMoney = compare.includes(bankMoney);

                        if (isDate && isBankMoney) {
                            Object.assign(temp, {
                                CNY: j + 1,
                                money: bankMoney,
                                date,
                                type: 'CNY',
                                checked: 'Y',
                                company: compare[0]
                            });
                            if (mapCNY[flag]) {
                                mapCNY[flag + '#1'] = temp;
                            } else {
                                mapCNY[flag] = temp;
                            }
                            mapCNY.length++;
                        }
                    }
                } else {
                    for (let j = 0, len2 = this.check.CollectionUSDbody.length; j < len2; j++) {
                        const compare = this.check.CollectionUSDbody[j];
                        const isDate = compare.includes(date);
                        const isBankMoney = compare.includes(bankMoney);

                        if (isDate && isBankMoney) {
                            Object.assign(temp, {
                                CNY: j + 1,
                                money: bankMoney,
                                date,
                                type: 'USD',
                                checked: 'Y',
                                company: compare[0]
                            });
                            if (mapUSD[flag]) {
                                mapUSD[flag + '#1'] = temp;
                            } else {
                                mapUSD[flag] = temp;
                            }
                            mapUSD.length++;
                        }
                    }
                }
                list.push(temp);
            }

            this.list.splice(0, this.list.length, ...list);
        },
        // 转化为表格数据
        turnGrid (data, type) {
            const temp = data.split('\r');
            const head = temp.shift();
            const body = [];

            this.check[type + 'Head'] = head.split(',');

            for (var i = 0, l = temp.length; i < l; i++) {
                const row = temp[i].split(',');
                body.push(row);
            }
            this.check[type + 'body'] = body;
        },
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

<template>
    <div id='backLearn'>
        <!-- 编辑页面 -->
        <template v-if='module.includes("edit") || module.includes("new")'>
            <editor :code='ruleForm.content' @changes='saveContent' ref='code'></editor>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="语言" prop="language">
                    <el-select v-model="ruleForm.language" placeholder="请选择语言">
                        <el-option label="javascript" value="javascript"></el-option>
                        <el-option label="java" value="java"></el-option>
                        <el-option label="python" value="python"></el-option>
                        <el-option label="css" value="css"></el-option>
                        <el-option label="html" value="html"></el-option>
                        <el-option label="php" value="php"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主题" prop="theme">
                    <el-select v-model="ruleForm.theme" placeholder="请选择主题">
                        <el-option label="杂记" value="notes"></el-option>
                        <el-option label="精华" value="cream"></el-option>
                        <el-option label="主题" value="theme"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </template>
        <!-- 管理页面 -->
        <template v-if='module.includes("learn/manage")'>
            <tableCom @edit-row='editRow' @check-row='checkRow'></tableCom>
        </template>
        <template v-if='module.includes("learn/preview")'>
            <el-main v-html="$marked(ruleForm.content)"></el-main>
        </template>
    </div>
</template>
<script>
import Vue from 'vue';
import editor from '@/components/editor.vue';
import tableCom from '@/pages/back/components/table.vue';
export default {
    name: 'backLearn',
    components: {
        editor,
        tableCom
    },
    computed: {
        module () {
            return this.$route.path.toString();
        }
    },
    data () {
        return {
            ruleForm: {
                id: '',
                name: '',
                language: '',
                theme: '',
                desc: '',
                content: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入文章名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                language: [
                    { required: true, message: '请选择语言', trigger: 'change' }
                ],
                theme: [
                    { required: true, message: '请选择主题', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            fields: [{
                field: 'date',
                desc: '日期'
            }, {
                field: 'name',
                desc: '名称'
            }, {
                field: 'language',
                desc: '语言'
            }, {
                field: 'theme',
                desc: '主题'
            }, {
                field: 'content',
                desc: '内容'
            }, {
                field: 'descption',
                desc: '描述'
            }, {
                field: 'lastModified',
                desc: '修改时间'
            }]
        };
    },
    watch: {
        $route (n, o) {
            this.dispatchInit();
        }
    },
    created () {
        this.dispatchInit();
    },
    methods: {
        saveContent (d) {
            Vue.set(this.ruleForm, 'content', d);
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        // 模块分发
        dispatchInit () {
            const path = this.$route.path;
            if (path.includes('edit') || path.includes('preview')) {
                const id = this.GetQueryString('id');
                this.pullGridData({
                    id,
                    success: (data) => {
                        Vue.set(this, 'ruleForm', data[0]);
                        if (path.includes('edit')) {
                            this.$refs.code.update(data[0].content);
                        }
                    }
                });
            } else if (path.includes('new')) {
                this.ruleForm = { id: '' };
            }
        },
        pullGridData ({ id = '', success, error }) {
            this.$http.post('/api/learn/pull', { id }).then((res) => {
                success && success(res.data);
            }).catch((err) => {
                // err && err(res.data);
                console.info(err);
            });
        },
        // 提交保存
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveNew();
                } else {
                    return false;
                }
            });
        },
        saveNew () {
            this.$http.post('/api/learn/create', {
                ...this.ruleForm
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        },
        editRow (data) {
            this.$router.push('/management/learn/edit?id=' + data.row.id);
        },
        checkRow (data) {
            this.$router.push('/management/learn/preview?id=' + data.row.id);
        },
        GetQueryString (variable) {
            const query = window.location.href.split('?')[1];
            const vars = query.split('&');
            for (let i = 0; i < vars.length; i++) {
                const pair = vars[i].split('=');
                if (pair[0] === variable) {
                    return decodeURI(pair[1]);
                }
            }
            return (false);
        }
    }
};

</script>
<style scoped lang="scss">
@import '~@/assets/scss/caculate.scss';
#backLearn {
    background: #fff;
}

.demo-ruleForm {
    margin-top: rem(10);
}

.el-table .cell {
    white-space: nowrap;
}

</style>

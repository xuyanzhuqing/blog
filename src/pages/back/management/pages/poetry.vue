<template>
    <div id='backPoetry'>
        <editor :code='ruleForm.content' @changes='saveContent' ref='code'></editor>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="诗名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="诗人" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="语言" prop="language">
                <el-select v-model="ruleForm.language" placeholder="请选择语言">
                    <el-option label="中文" value="chinese"></el-option>
                    <el-option label="外文" value="foreign"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="诗歌背景" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 诗歌管理页面 -->
        <tableCom @edit-row='editRow' baseURI='/api/poetry' :fields='fields' ref='grid'>
        </tableCom>
    </div>
</template>
<script>
import Vue from 'vue';
import editor from '@/plugins/editor.vue';
import tableCom from '@/pages/back/management/modules/table.vue';

export default {
    name: 'backPoetry',
    data () {
        return {
            ruleForm: {
                id: '',
                name: '',
                author: 'admin',
                desc: '',
                content: '',
                lastModified: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入文章名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '请输入文章作者', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '诗歌内容不能为空', trigger: 'blur' }
                ]
            },
            fields: [{
                field: 'name',
                desc: '诗名'
            }, {
                field: 'author',
                desc: '诗人'
            }, {
                field: 'content',
                desc: '内容'
            }, {
                field: 'language',
                desc: '语言'
            }, {
                field: 'desc',
                desc: '诗歌背景'
            }, {
                field: 'lastModified',
                desc: '修改时间'
            }],
            poetryList: []
        };
    },
    methods: {
        saveContent (d) {
            Vue.set(this.ruleForm, 'content', d);
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            Vue.set(this.ruleForm, 'id', '');
            this.$refs.code.update('');
        },
        editRow (data) {
            Vue.set(this, 'ruleForm', Object.assign({}, data.row));
            this.$refs.code.update(data.row.content);
        },
        // 提交保存
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.id) {
                        this.saveNew('update');
                    } else {
                        this.saveNew();
                    }
                } else {
                    return false;
                }
            });
        },
        saveNew (method = 'create') {
            this.$http.post('/api/poetry/' + method, {
                ...this.ruleForm
            }).then((res) => {
                const obj = { ...this.ruleForm, lastModified: new Date().toString() };
                const list = this.$refs.grid.list;
                if (method === 'create') {
                    list.push(Object.assign(obj, { id: res }));
                } else {
                    const index = list.findIndex((v) => v.id === this.ruleForm.id);
                    list.splice(index, 1, obj);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: {
        editor,
        tableCom
    }
};

</script>
<style scoped lang="scss">
.el-table .cell {
    white-space: nowrap;
}

</style>

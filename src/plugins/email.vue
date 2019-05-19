<template>
    <el-dialog :visible.sync="visiable" v-loading='mailLoading'>
        <template slot='title'>
            <i class="el-icon-message"></i> 私信
        </template>
        <el-form :model="form">
            <el-form-item label="主题：" :label-width="formLabelWidth">
                <el-input v-model="form.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="正文：" :label-width="formLabelWidth">
                <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                </quill-editor>
            </el-form-item>
            <el-form-item label="微信：" :label-width="formLabelWidth">
                <el-input v-model="form.contect" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="sendMail">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
/* 全局引入富文本编辑器 */
import { quillEditor } from 'vue-quill-editor';
// // require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    name: 'Email',
    components: {
        // 引入富文本编辑器
        quillEditor
    },
    props: {
        visiable: {
            require: true,
            type: Boolean,
            default: false
        }
    },
    data () {
        const dialog = {
            dialogFormVisible: false,
            formLabelWidth: '100px',
            editorOption: {}
        };
        return {
            ...dialog,
            form: {},
            mailLoading: false
        };
    },
    mounted () {
        this.initData();
    },
    methods: {
        close () {
            this.$emit('close');
            this.initData();
        },
        initData () {
            const empty = {
                title: '',
                content: '',
                contect: ''
            };
            this.$set(this, 'form', empty);
        },
        sendMail () {
            this.mailLoading = true;
            this.$http.post('/api/email', this.form).then((res) => {
                console.info(res);
                this.mailLoading = false;
                this.close();
            }).catch((err) => {
                this.mailLoading = false;
                this.close();
                console.info(err);
            });
        },
        onEditorBlur (e) {},
        onEditorFocus (e) {},
        onEditorReady (e) {

        }
    }

};
</script>
<style scoped lang="scss">

</style>


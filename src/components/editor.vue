<template>
    <el-container class='editor'>
        <el-header class='toolbar' height=''></el-header>
        <el-container>
            <el-aside width="50%">
                <codemirror ref='editor' v-model="data" :options="cmOptions" @blur='blur'></codemirror>
            </el-aside>
            <el-main v-html="marked(data)"></el-main>
        </el-container>
    </el-container>
</template>
<script>
import marked from 'marked';

export default {
    name: 'editor',
    data () {
        return {
            data: ''
        };
    },
    props: {
        code: {
            type: String,
            default: '#hello world'
        },
        cmOptions: {
            type: Object,
            default () {
                return {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    lineWrapping: false,
                    line: true,
                    // text/javascript 目前也支持
                    mode: 'text/x-markdown',
                    theme: 'monokai'
                };
            }
        }
    },
    created () {
        this.data = this.code;
    },
    methods: {
        marked,
        blur () {
            this.$emit('changes', this.$refs.editor.content);
        },
        update (code) {
            this.data = code;
        }
    }
};
</script>
<style scoped lang="scss">
@import '~@/assets/scss/caculate.scss';
    .editor {
        border: 1px solid #ddd;
        .toolbar {
            height: rem(30);
            border-bottom: 1px solid #ddd;
        }
        .el-main     {
            border-left: 1px solid #ddd;
        }
    }
</style>

<template>
    <el-container class='articles auto'>
        <el-header height='0'></el-header>
        <el-main>
            <article v-for='(v, i) in articleList.slice(pageStart, pageEnd)' :key="i">
                <dl>
                    <dt class="title">
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="!isPagination ? 24: 22">
                                <a href="/">{{v[attr.title]}}</a>
                            </el-col>
                            <el-col :span="2" v-if='!isPagination'>
                                <el-button icon="el-icon-arrow-left" @click='goBack'></el-button>
                            </el-col>
                        </el-row>
                    </dt>
                    <dd class="text" v-html="marked(v[attr.text])"></dd>
                </dl>
                <div :class="{textfoot: isPagination}">
                    <router-link :to='attr.baseUrl + v.id' v-if='isPagination'>阅读全文</router-link>
                </div>
            </article>
            <article v-if='articleList.length == 0'>
                <dl>
                    <dt class="title">
                        浪里个浪，额……
                    </dt>
                </dl>
            </article>
        </el-main>
        <el-footer v-if='isPagination'>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="articleList.length">
            </el-pagination>
        </el-footer>
    </el-container>
</template>
<script>
import editor from '@/plugins/editor.vue';
import marked from 'marked';

export default {
    name: 'articles',
    props: {
        isPagination: {
            type: Boolean,
            default: false
        },
        articleList: {
            type: Array,
            default: () => []
        },
        attr: {
            type: Object,
            default: () => ({
                title: 'title',
                text: 'text',
                baseUrl: '/'
            })
        }
    },
    data () {
        return {
            currentPage: 1,
            pageSize: 5,
            pageStart: 0,
            pageEnd: 0
        };
    },
    mounted () {
        this.handleCurrentChange(this.currentPage);
    },
    methods: {
        marked,
        editChange (d) {
            const first = this.articleList.shift();
            first.text = d;
            this.articleList.unshift(first);
        },
        goBack () {
            this.$router.go(-1);
        },
        // 分页size发生变化
        handleCurrentChange (val) {
            const pageStart = (val - 1) * this.pageSize;
            const pageEnd = pageStart + this.pageSize;

            this.currentPage = val;
            this.pageStart = pageStart;
            this.pageEnd = pageEnd;
        }
    },
    components: {
        editor
    }
};

</script>
<style lang='scss'>
.articles {
    font-family: arial 宋体, "Arial Narrow", HELVETICA;
    .el-main {
        padding: 5px;
        background: #fff;
        border-bottom: #F4F3EF rem(40) solid;
        &:last-of-type {
            border: none;
            margin-bottom: rem(20);
        }
    }
    .title {
        // background: url(../images/titlebg.png) no-repeat 5% 80%;
        font-size: 20px;
        line-height: 28px;
        display: inline-block;
        padding: 38px 60px 8px 80px;
        border-bottom: 1px solid #e2e2e2;
        width: 100%;
    }
    .text {
	    position: relative;
        overflow: hidden;
        height: 300px;
        padding: 20px 40px;
        font-size: 16px;
        text-align: left;
        &::after {
	        content: '';
	        text-align: right;
	        position: absolute;
	        bottom: 0;
	        right: 0;
	        width: 10%;
	        height: 1.8em;
	        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
	    }
        p {
            line-height: 24px;
            margin-bottom: 10px;
        }
    }

    .textfoot {
        padding: 20px 60px;
        border-top: 1px solid #dddcdb;
        text-align: right;
        box-shadow: #999 2px 2px 3px;
        a {
            margin-left: 10px
        }
    }
    .el-footer {
        background-color: #fff;
    }
    .el-pagination {
        text-align: right;
        button {
            background: transparent;
        }
        .el-pager li {
            background: transparent;
        }
    }
}

</style>

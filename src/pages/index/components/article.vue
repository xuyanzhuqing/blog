<template>
  <el-container class="articles auto">
    <el-header height="0"></el-header>
    <el-main>
      <article v-for="(v, i) in articleList.slice(pageStart, pageEnd)" :key="i">
        <dl>
          <dt class="title">
            {{v[attr.title]}}
          </dt>
          <dd class="text" v-html="marked(v[attr.text])"></dd>
        </dl>
        <div class="textfoot">
          <span>{{new Date(v.lastModified) | dateFtt('Y-M-d h:m:s')}}</span>
          <el-link v-if="isPagination" :underline="false" @click="() => $router.push(attr.baseUrl + v.id)"><i class="el-icon-view el-icon--right"></i> </el-link>
          <i v-else class="el-icon-back" @click="goBack"></i>
        </div>
      </article>
      <article v-if="articleList.length == 0">
        <dl>
          <dt class="title">浪里个浪，额……</dt>
        </dl>
      </article>
    </el-main>
    <el-footer v-if="isPagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="articleList.length"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import editor from '@/components/editor.vue';
import marked from 'marked';
import { dateFtt } from '@/utils/time.js';

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
    },
    filters: {
        dateFtt
    }
};
</script>
<style lang='scss'>
.articles {
  font-family: arial 宋体, "Arial Narrow", HELVETICA;
  .el-main {
    padding: 5px;
    background: #fff;
    border-bottom: #f4f3ef rem(40) solid;
    &:last-of-type {
      border: none;
      margin-bottom: rem(20);
    }
  }
  article {
    margin-bottom: 20px;
  }
  .title {
    padding: 8px;
    width: 100%;
    line-height: 28px;
    display: inline-block;
    border-bottom: 1px solid #e2e2e2;
  }
  .text {
    position: relative;
    overflow: hidden;
    height: 300px;
    padding: 10px;
    font-size: 14px;
    font-family: 'Courier New', Courier, monospace;
    text-align: left;
    &::after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10%;
      height: 1.8em;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1) 50%
      );
    }
    p {
      line-height: 24px;
      margin-bottom: 10px;
    }
  }

  .textfoot {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #dddcdb;
    font-size: 12px;
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

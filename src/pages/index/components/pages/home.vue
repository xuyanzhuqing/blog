<template>
    <el-container class='layout gap'>
        <el-aside width='' class="aside-msg">
            <asideCom></asideCom>
        </el-aside>
        <el-main class='blogitem'>
            <articleCom :isPagination='true' :articleList='articleList' :attr='{title: "name", text: "content", baseUrl: "/learn?id="}'></articleCom>
        </el-main>
    </el-container>
</template>
<script>
import asideCom from '@/pages/index/components/modules/aside.vue';
import articleCom from '@/pages/index/components/modules/article.vue';

export default {
    name: 'index',
    components: {
        asideCom,
        articleCom
    },
    data () {
        return {
            articleList: []
        };
    },
    created () {
        this.pullHomePage();
    },
    methods: {
        pullHomePage () {
            this.pullGridData({
                success: (data) => {
                    this.articleList.push(...data);
                }
            });
        },
        pullGridData ({ id = '', success, error }) {
            this.$http.post('/api/learn/pull', { id }).then(res => {
                success && success(res.data);
            }).catch((err) => {
                error && error(res.data);
            });
        }
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.aside-msg {
    background: #fff;
    width: rem(270);
    margin-right: rem(5)
}
.el-main {
    padding: 0;
    background: #E8E5DD;
    overflow: hidden;
    .blogitem {
        width: calc(100% - #{rem(270)});
        background: #fff;
        float: right;
    }
}

@media screen and (max-width: 600px) {
    .blogitem {
        display: none;
    }
    .aside-msg {
        width: 100%;
    }
}

</style>

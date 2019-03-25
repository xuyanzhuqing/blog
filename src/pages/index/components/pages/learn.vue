<template>
    <el-container class='layout gap'>
        <el-header v-if='showAll' class='classic' height=''>
            <dl>
                <dt>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="6">分类查找</el-col>
                        <el-col :span="6" style='text-align:right'><i class='el-icon-arrow-down' @click='classic.show = !classic.show'></i></el-col>
                    </el-row>
                </dt>
                <dd v-if='classic.show'>
                    <span>主题：</span>
                    <el-radio-group v-model="classic.theme">
                        <el-radio label="js">杂记</el-radio>
                        <el-radio label="java">精华</el-radio>
                        <el-radio label="python">专题</el-radio>
                    </el-radio-group>
                </dd>
                <dd v-if='classic.show'>
                    <span>最近：</span>
                    <el-radio-group v-model="classic.time">
                        <el-radio label="week">星期</el-radio>
                        <el-radio label="Month">月份</el-radio>
                        <el-radio label="year">年</el-radio>
                    </el-radio-group>
                </dd>
                <dd v-if='classic.show'>
                    <span>语言：</span>
                    <el-radio-group v-model="classic.language">
                        <el-radio label="js">javascript</el-radio>
                        <el-radio label="java">java</el-radio>
                        <el-radio label="python">python</el-radio>
                    </el-radio-group>
                </dd>
                <dd>
                    <el-input placeholder="查找文章" style='width: 250px;' v-model="filterText">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button v-if='classic.show' type="primary" icon="el-icon-delete" @click='()=>{this.classic = {show: false};filterText=""}'></el-button>
                </dd>
            </dl>
        </el-header>
        <el-container>
            <el-aside v-if='showAll' width='' class='treeList'>
                <el-tree class="filter-tree" :data="treeList" :props="{
			          children: 'children',
			          label: 'label'
			        }" default-expand-all :filter-node-method="filterNode" ref="tree2">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
        				<router-link :to='"/learn?id=" + data.id'>{{ node.label }}</router-link>
        			</span>
                </el-tree>
                <!-- <div class='treeCtrl'></div> -->
            </el-aside>
            <el-main :class='{blogitem: showAll}'>
                <articleCom :isPagination='showAll' :articleList='articleList' :attr='{title: "name", text: "content", path: "", baseUrl: "/learn?id="}'></articleCom>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import headerCom from '@/pages/index/components/modules/header.vue';
import footerCom from '@/pages/index/components/modules/footer.vue';
import articleCom from '@/pages/index/components/modules/article.vue';
import asideCom from '@/pages/index/components/modules/aside.vue';

export default {
    name: 'blog',
    data () {
        return {
            articleList: [],
            showAll: true,
            classic: {
                time: '',
                theme: '',
                language: '',
                show: false
            },
            filterText: ''
        };
    },
    computed: {
        treeList () {
            return this.turnTreeData();
        }
    },
    watch: {
        filterText (val) {
            this.$refs.tree2.filter(val);
        },
        $route (n, o) {
            this.preparePull(n);
        }
    },
    created () {
        this.preparePull(this.$route);
    },
    methods: {
        filterNode (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        turnTreeData (flag = 'theme') {
            const newData = {};
            const arr = [];
            this.articleList.forEach((v, i) => {
                if (!newData[v.theme]) {
                    newData[v.theme] = {
                        label: v.theme,
                        children: [{
                            label: v.name,
                            id: v.id
                        }]
                    };
                } else {
                    newData[v.theme].children.push({
                        label: v.name,
                        id: v.id
                    });
                }
            });

            for (const v in newData) {
                arr.push(newData[v]);
            }
            return arr;
        },
        preparePull ($route) {
            const id = $route.query.id;
            if (id) {
                this.pullGridData(id);
                this.showAll = false;
            } else {
                this.pullGridData();
                this.showAll = true;
            }
        },
        pullGridData (id = '') {
            const len = this.articleList.length;
            this.$http.post('/api/learn/pull', { id }).then((res) => {
                this.articleList.splice(0, len, ...res.data);
            }).catch((err) => {
                console.info(err);
            });
        }
    },
    components: {
        headerCom,
        footerCom,
        articleCom,
        asideCom
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.classic {
    padding: 10px;
    border-bottom: 5px solid #f16e50;
    background: #eaecea;
    dt,
    dd {
        height: 30px;
    }
    dt {
        margin-bottom: 10px;
        border-bottom: 1px solid #f16e50;
        line-height: 100%;
        color: #555;
        font-size: rem(16);
    }
}

.blogitem {
    min-height: rem(690);
}

.treeList {
    background: #fff;
    border-right: 1px solid #f16e50;
    .filter-tree {
        width: rem(250);
        float: left;
    }
    a {
        color: #606266
    }
}

main {
    padding: 0;
}

@media screen and (max-width: 500px) {
    .treeList {
        display: none;
    }
}

</style>

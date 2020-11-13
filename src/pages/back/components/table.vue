<template>
    <div class='auto'>
        <el-table
            :data="list.slice(pageStart, pageEnd)"
            height="400"
            style="width: 100%" stripe max-height="530">
            <el-table-column v-for='(value, key) in fields' :prop="value.field" :label="value.desc" :key='key'>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button v-for='(v, i) in excutedList' :key='i' v-if='$options._parentListeners[v + "-row"]' type="text" size="small" @click='excuteRow(v , scope.row, scope.$index)'>
                        {{v}}
                    </el-button>
                    <el-button @click.native.prevent="deleteRows(scope.$index)" type="text" size="small">
                        remove
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button v-if="isAdd" type="primary" icon="el-icon-plus" plain style="width: 100%;" @click="$router.push({path: 'learn/new'})"/>
        <el-pagination v-if='isPagination' @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="list.length">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'tableCom',
    props: {
        baseURI: {
            type: String,
            default: '/api/learn'
        },
        isPagination: {
            type: Boolean,
            default: true
        },
        isAdd: {
            type: Boolean,
            default: true
        },
        fields: {
            type: Array,
            default: () => ([{
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
            }])
        }
    },
    data () {
        const pagination = {
            currentPage: 1, // 当前页码
            pageStart: 0, // 开始页码
            pageEnd: 0, // 结束页码
            pageSize: 10,
            pageSizes: [5, 10, 20, 100],
            layout: [
                'total',
                // 'sizes',
                'prev',
                'pager',
                'next',
                'jumper'
            ]
        };
        return {
            ...pagination,
            list: [{}],
            excutedList: ['check', 'edit']
        };
    },
    created () {
        this.pullGridData();
        console.info(this['check-row']);
    },
    mounted () {
        this.handleCurrentChange(this.currentPage);
    },
    methods: {
        // 分页size发生变化
        handleCurrentChange (val) {
            const pageStart = (val - 1) * this.pageSize;
            const pageEnd = pageStart + this.pageSize;

            this.currentPage = val;
            this.pageStart = pageStart;
            this.pageEnd = pageEnd;
        },
        // 分页pageSize 发生变化时
        handleSizeChange (val) {
            this.pageSize = val;
            this.handleCurrentChange(1);
        },
        pullGridData ({ id = '' } = {}) {
            const url = this.baseURI + '/pull';
            this.$http.post(url, { id }).then((res) => {
                const len = this.list.length;
                this.list.splice(0, len, ...res.data);
            }).catch((err) => {
                console.info(err);
            });
        },
        deleteRows (index) {
            const id = this.list[index].id;
            const url = this.baseURI + '/delete';
            this.$http.post(url, { id }).then((res) => {
                this.list.splice(index, 1);
            }).catch((err) => {
                console.log(err);
            });
        },
        excuteRow (type, row, index) {
            this.$emit(type + '-row', { row, index });
        }
    }
};

</script>
<style scoped lang="scss">

</style>

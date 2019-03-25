<template>
    <div>
      <item :model='columns'></item>
      <el-table :data="tableData3">
        <el-table-column
            type="index">
          </el-table-column>
        <el-table-column v-for='item in columns.children'

                        :label="item.label"
                        :prop='item.prop'
                        :width='item.width'
                        :key="item.id"
                        :render-header="renderHeader">

            <el-table-column v-if='item.children||item.children.length>0'
                             v-for="item1 in item.children"
                             :label="item1.label"
                             :prop='item1.prop'
                             :width='item1.width'
                             :key="item1.id">
                <el-table-column v-if='item1.children||item1.children.length>0'
                                 v-for="item2 in item1.children" :label="item2.label"
                                 :prop='item2.prop'
                                 :width='item2.width'
                                 :key="item2.id">
                </el-table-column>
            </el-table-column>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    created () {
        const columns = this.columns;
        Vue.component('item', {
            // name: 'item1',
            template: `
          <div v-if='isFolder'>
            {{ model.label }}
            <item
            v-for="(model, index) in model.children"
            :key="index"
            :model="model">
          </item>
          </div>
        `,
            props: {
                model: columns
            },
            computed: {
                isFolder: function () {
                    return this.model.children &&
                            this.model.children.length;
                }
            }
        });
    },
    data () {
        return {
            // 规则说明
            /*
                 * 1. 整个头部结构采用树形结构
                 * 2. 最外层如果没有lable 字段表示直接进入子一级返回数组
                 * 3. children的数量表示当前级别下有几个子字段
                 * 4. 中间任意一层没有props字段表示合并表头
                 * 5. prop 字段绑定数据源
                 * 6. width 字段为可选字段
                 */
            columns: {
                children: [
                    {
                        prop: 'date',
                        label: '日期',
                        width: '100px'
                    },
                    {
                        label: '配送信息',
                        children: [{
                            prop: 'name',
                            label: '姓名'
                        }, {
                            label: '地址',
                            children: [{
                                prop: 'province',
                                label: '省份'
                            }, {
                                prop: 'city',
                                label: '市区'
                            }, {
                                prop: 'address',
                                label: '地址'
                            }, {
                                prop: 'zip',
                                lable: '邮编'
                            }]
                        }]
                    }
                ],
                copyChildren: [
                    {
                        dataIndex: 'date',
                        label: '日期',
                        width: '100px'
                    },
                    {
                        label: '配送信息',
                        children: [{
                            prop: 'name',
                            label: '姓名'
                        }, {
                            label: '地址',
                            children: [{
                                prop: 'province',
                                label: '省份'
                            }, {
                                prop: 'city',
                                label: '市区'
                            }, {
                                prop: 'address',
                                label: '地址'
                            }, {
                                prop: 'zip',
                                lable: '邮编'
                            }]
                        }]
                    }
                ]
            },
            // 表体数据
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-06',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }]
        };
    },
    methods: {
        renderHeader (createElement, { column, _self }) {
            const label = column.label;
            const labelArr = label.split(' ');
            return createElement(
                'div',
                {
                    'class': 'header-center'
                },
                [
                    createElement('div', {
                        attrs: { type: 'text' }
                    }, [labelArr[0]]
                    ),
                    createElement('div', {
                        attrs: { type: 'text' }
                    }, [labelArr[1] || '']
                    )
                ]
            );
        }
    }
};

</script>

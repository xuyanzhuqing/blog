<template>
    <div>
    <tableCom @edit-row='editRow' @check-row='checkRow' :fields="columns"></tableCom>
    </div>
</template>
<script>
import tableCom from '@/pages/back/components/table.vue';
import columnMixin from '@/pages/back/pages/learn/column.mixin.js';
export default {
    name: 'backLearn',
    components: {
        tableCom
    },
    mixins: [columnMixin],
    created () {
        this.dispatchInit();
    },
    methods: {
        // 模块分发
        dispatchInit () {
            const path = this.$route.path;
            if (path.includes('edit') || path.includes('preview')) {
                const id = this.GetQueryString('id');
                this.pullGridData({
                    id,
                    success: (data) => {
                        this.$set(this, 'ruleForm', data[0]);
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

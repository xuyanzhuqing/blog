<template>
    <div>
        <div class="footavatar">
            <img src="/static/image/my.jpg" class="footphoto">
            <div class="footinfo">
                <p class="fname"><a href="/dancesmile">{{basic.panName}}</a> </p>
                <p class="finfo">性别：{{basic.sex ? '男' : '女'}} 年龄：{{new Date().getFullYear() - basic.brithday.split('-')[0]}}岁</p>
                <p>现居：{{basic.location}}</p>
            </div>
        </div>
        <section class="visitor">
            <h2>我关注的</h2>
            <el-row :gutter="20">
                <el-col :span="3" v-for='(v, i) in focus' :key='i'>
                    <div class="grid-content">
                        <a :href="v.href"><img :src="v.icon"></a>
                    </div>
                </el-col>
            </el-row>
        </section>
        <div class="Copyright">
            <p>
                友情链接：
                <a :href='v' v-for='(v, i) in friendLink' :key='i'>{{i}}</a>
            </p>
            <p>Design by Michael xu</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'footers',
    data () {
        return {
            basic: {
                sex: 1,
                panName: '忆达夫',
                location: '上海长宁',
                brithday: '1992-07-26'
            },
            friendLink: {
                'github': 'https://github.com/',
                '百度': 'www.baidu.com/',
                'element-ui 中文网': 'http://element.eleme.io/#/zh-CN'
            },
            focus: [{
                href: '#',
                icon: '',
                description: 'd3.js'
            }, {
                href: '#',
                icon: '',
                description: 'vue.js'
            }]
        };
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';

.footavatar {
    width: 700px;
    margin: auto;
    position: relative;
    color: #666;
    .footphoto {
        position: absolute;
        top: -58px;
        left: -70px;
        height: 150px;
        width: 200px;
        background: #ccc;
        border: #F16E50 5px solid;
    }
    .footinfo {
        display: block;
        padding: 0 0 0 160px;
        p.fname {
            color: #f16e50;
            margin-top: 16px;
            font-size: 18px;
            line-height: 28px;
            a {
                color: #f16e50;
            }
        }
        p {
            line-height: 22px;
            font-size: rem(12);
        }
    }
}

.visitor {
    width: 800px;
    margin: 40px auto 0;
    clear: both;
    border-top: 1px solid #32302e;
    padding-top: 40px;
    overflow: hidden;
    h2 {
        margin-bottom: 20px;
        padding: 0 20px 0;
        color: #fff;
        font-size: 14px;
        font-weight: normal;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        height: 82px;
        border: #FFF 2px solid;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}

.Copyright {
    text-align: center;
    color: #959595;
    margin: 40px 0 0;
    font-size: rem(12);
    a {
        color: #f16e50;
        display: inline;
        padding: 0 10px;
    }
    p {
        margin: 6px 0;
    }
}

@media screen and (max-width: 600px) {
    .footavatar, .visitor {
        width: 100%;
    }

}


</style>

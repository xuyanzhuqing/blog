<template>
    <el-container class='layout gap'>
        <el-header height='10px'></el-header>
        <el-collapse v-model="active" accordion>
            <el-collapse-item title="飞花令" name="flyFlower">
                <template slot="title">
                    <div class='accordion-head'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-flower"></use>
                        </svg>
                        飞花令
                    </div>
                </template>
                <el-container class='content'>
                    <el-aside width='' class='flyFlower'>
                        <div class='drawCloth' ref='drawCloth'>
                            <el-carousel :autoplay='active==="flyFlower"' :interval="1000" arrow='never'>
                                <el-carousel-item v-for="item in currentWords" :key="item">
                                    <h3 class='auto' :style='{backgroundImage: "url(http://localhost:8080/static/image/poetry/月.jpg)"}'>{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div class='drawCtrl'>
                            <el-button circle @click='rockData(true, $event)'>生成</el-button>
                        </div>
                        <p class='note-tip'><span> * </span> 请根据生成的意象作诗一首</p>
                    </el-aside>
                    <el-main>
                        <el-container class='auto insertBox'>
                            <el-main class='auto poetry-container'>
                                <el-scrollbar style="height:100%" class='vertical'>
                                    <div class='auto' style='overflow: hidden;'>
                                        <div class='auto poetry-box' ref='poetryBox' @keyup='saveInsert' contenteditable v-html='insertBox.insertText'>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </el-main>
                            <el-footer>
                                <el-input placeholder="笔名" v-model="insertBox.panName" clearable>
                                    <template slot="append">send</template>
                                </el-input>
                            </el-footer>
                        </el-container>
                    </el-main>
                </el-container>
            </el-collapse-item>
            <el-collapse-item title="诗词鉴赏" name="appreciation">
                <template slot="title">
                    <div class="accordion-head">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-appreciation"></use>
                        </svg>
                        诗词鉴赏
                    </div>
                </template>
                <el-container class='content'>
                    <el-scrollbar style="height:100%" class='vertical'>
                        <div class='auto' style='overflow: hidden;padding: 10px'>
                            <el-row :gutter="20">
                                <el-col :span="8" v-for="(o, index) in poetryList" :key="index" style='margin-bottom: 20px'>
                                    <el-card :body-style="{ padding: '0 10px' }">
                                        <dl class='card'>
                                            <dt class='poetry-title'>{{o.name}}</dt>
                                            <dd class='poetry'>
                                                <div>
                                                    {{o.content}}
                                                </div>
                                            </dd>
                                            <dd class="bottom clearfix">
                                                <el-row>
                                                    <el-button icon="el-icon-search" circle></el-button>
                                                    <el-button type="info" icon="el-icon-message" circle @click='dialogFormVisible=true'></el-button>
                                                    <el-button type="primary" icon="el-icon-star-off" circle></el-button>
                                                </el-row>
                                            </dd>
                                        </dl>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-scrollbar>
                </el-container>
            </el-collapse-item>
        </el-collapse>
        <emailCom :visiable.sync='dialogFormVisible'/>
    </el-container>
</template>
<script>
import headerCom from '@/pages/index/components/header.vue';
import footerCom from '@/pages/index/components/footer.vue';
import Vue from 'vue';

import emailCom from '@/components/email.vue';
/* svg.js */
// const SVG = require('svg.js/dist/svg.min.js');

export default {
    name: 'blog',
    components: {
        headerCom,
        footerCom,
        emailCom
    },
    data () {
        return {
            dialogFormVisible: false,
            random: 0,
            active: '',
            currentWords: [],
            drawCloth: {
                autoplay: true,
                index: 0
            },
            insertBox: {
                insertText: '',
                panName: '令狐冲'
            },
            modules: {
                flyFlower: {
                    keywords: '风|花|雪|月|雷|荷|柳|舟|梅|兰|菊|竹|桃|春|夏|秋|冬|暮|阳|酒|诗|书|剑|气|鸿鹄|英雄|夕阳|深夜|梧桐|红豆|鹧鸪|牧童|风骚|明月|落花|梅子|长亭'
                },
                appreciation: {

                },
                public: {

                }
            },
            poetryList: [{}]
        };
    },
    watch: {
        active (n, o) {
            if (n === 'appreciation') {
                this.pullPoetryList();
            } else {
                this.rockData();
            }
        }
    },
    created () {
        Vue.set(this, 'active', 'flyFlower');
    },
    mounted () {
        // this.createSvg();
    },
    methods: {
        createRandom (top = 10) {
            return Math.ceil(Math.random() * top);
        },
        rockData (isInit) {
            // const { modules, createRandom, createSvg } = this;
            // const len = modules.flyFlower.keywords.split('|').length;
            // this.random = createRandom();
            // isInit && createSvg();
        },
        pullPoetryList (id = '') {
            const len = this.poetryList.length;
            this.$http.post('/api/poetry/pull', { id }).then((res) => {
                this.poetryList.splice(0, len, ...res.data);
            }).catch((err) => {
                console.info(err);
            });
        },
        saveInsert () {
            this.insertBox.insertText = this.$refs.poetryBox.innerHTML;
        }
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.el-header {
    background-color: #f16e50;
}

.el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
    background: #fff;
}

.gap {
    position: relative;
    height: rem(681);
}

.el-aside {
    width: 50%;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    padding: 0;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}

.content {
    height: rem(550);
    min-height: rem(500);
}

.insertBox {
    padding: rem(20);
    textarea {
        height: 396px;
    }
}

.flyFlower {
    position: relative;
    overflow: hidden; // line-height: rem(16);
    .drawCloth {
        width: 100%;
        height: calc(100% - #{rem(20)});
        background: transparent;
        line-height: 900px;
    }
    .drawCtrl {
        position: absolute;
        bottom: rem(20);
        right: rem(20);
        z-index: 20;
        text-align: right;
        button {
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            color: #f16e50;
        }
    }
    .note-tip {
        height: rem(20);
        line-height: 100%;
    }
}

.poetry-container {
    padding: 10px;
    border: 1px solid #ccc;
    background: url('http://localhost:8080/static/image/poetry/back.jpg') repeat-y;
    .poetry-box {
        text-align: left;
        width: calc(100% + 17px);
        height: 100%;
        outline: none;
        padding-bottom: 10px;
    }
}

.el-carousel__item h3 {
    color: #555;
    font-size: rem(48);
    opacity: 0.75;
    line-height: rem(350);
    background-repeat: no-repeat;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.accordion-head {
    font-size: rem(18)
}

/*卡片样式*/

$cardTop: rem(30);
$cardBottom: rem(50);
.card {
    width: rem(279);
    height: rem(350);
    .poetry-title {
        height: $cardTop;
        line-height: $cardTop;
        text-align: center;
    }
    .poetry {
        height: calc(100% - #{$cardTop + $cardBottom});
        overflow: hidden;
        position: relative; // line-height:1.4em;
        &::after {
            content: "...";
            font-weight: bold;
            position: absolute;
            bottom: 0;
            right: 0;
            padding-left: 20px;
            background: -webkit-linear-gradient(left, transparent, #fff 62%);
            background: -o-linear-gradient(right, transparent, #fff 62%);
            background: -moz-linear-gradient(right, transparent, #fff 62%);
            background: linear-gradient(to right, transparent, #fff 62%);
        }
    }
    .bottom {
        height: $cardBottom;
        line-height: $cardBottom;
    }
}

</style>

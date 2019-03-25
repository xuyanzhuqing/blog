<template>
    <aside>
        <div class="avatar">
            <a href="#" :style='{backgroundImage: "url(" + sideMsg.logo.src + ")"}'><span>{{sideMsg.logo.name}}</span></a>
        </div>
        <section class="topspaceinfo">
            <el-carousel :interval="4000" indicator-position="outside" height="75px" autoplay arrow='never' @change='slideChange'>
                <el-carousel-item v-for="(item, index) in sideMsg.poetry" :key="index">
                    <h1>{{item.title}}</h1>
                    <p>{{item.text}}</p>
                </el-carousel-item>
            </el-carousel>
        </section>
        <div class="userinfo">
            <p class="q-fans"> 浏览量：<a href="/" target="_blank">{{sideMsg.userinfo.visited}}</a></p>
            <p class="btns"><span @click="dialogFormVisible=true">私信</span><span>相册</span></p>
        </div>
        <dl class="newpic">
            <dt class="subTitle">最新照片</dt>
            <dd>
                <ul>    
                    <li v-for='(v, i) in sideMsg.newpic' :key='i'><a href="/"><img :src="origin + v.content"></a></li>
                </ul>
            </dd>
        </dl>
        <dl class="taglist">
            <dt class="subTitle">全部标签</dt>
            <dd>
                <span class="tag" type="text" round v-for='(v, i) in sideMsg.tag' :key='i'>{{v.text}}</span>
            </dd>
        </dl>
        <emailCom :visiable="dialogFormVisible" @close="dialogFormVisible = false"/>
        </aside>
</template>
<script>
import emailCom from '@/plugins/email.vue';

export default {
    name: 'asides',
    components: {
        emailCom
    },
    data () {
        return {
            dialogFormVisible: false,
            sideMsg: {
                logo: {
                    src: '/static/image/me.png',
                    name: '徐存根'
                },
                poetry: [{
                    title: '遇见',
                    text: '最美的不是下雨天，是与你一起躲过雨的屋檐'
                }, {
                    title: '坚持',
                    text: '有些时候不是有希望才去坚持，而是坚持下去才会有希望'
                }, {
                    title: '未来',
                    text: 'Stay hungry,Stay foolish'
                }],
                userinfo: {
                    visited: 1000
                },
                newpic: [],
                tag: [{
                    text: 'javascript',
                    emotion: ''
                }, {
                    text: 'css',
                    emotion: ''
                }, {
                    text: 'html',
                    emotion: ''
                }, {
                    text: 'sass',
                    emotion: ''
                }, {
                    text: 'vue',
                    emotion: ''
                }, {
                    text: 'angular',
                    emotion: ''
                }, {
                    text: 'react',
                    emotion: ''
                }]
            }
        };
    },
    computed: {
        origin () {
            return window.location.origin + '/';
        }
    },
    created () {
        this.getAsideMsg();
    },
    methods: {
        slideChange () {},
        getAsideMsg () {
            this.$http.post('/api/image/pull', {}).then((res) => {
                this.sideMsg.newpic.push(...res.data);
            }).catch((err) => {
                console.info(err);
            });
        }
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.avatar {
        margin: rem(20) auto;
        width: rem(160);
        height: rem(160)x;
        border-radius: rem(160);
        overflow: hidden;
        a {
            display: block;
            padding-top: rem(97);
            width: rem(160);
            height: rem(63);
            background: url(http://localhost:8080/static/image/me.png) no-repeat;
            background-size: rem(160) rem(160);
            text-decoration: none;
            span {
                display: block;
                margin-top: rem(63);
                padding-top: rem(8);
                width: rem(160);
                height: rem(55);
                text-align: center;
                font-size: rem(16);
                line-height: rem(20);
                color: #fff;
                background: rgba(0, 0, 0, .5);
                transition: margin-top .2s ease-in-out;
            }
        }
        a:hover span {
            display: block;
            margin-top: 0;
        }
    }
    .topspaceinfo {
        background: #f16e50;
        padding: rem(20) rem(20);
        color: #fff;
        h1 {
            font-size: rem(16);
            line-height: rem(40);
        }
    }
    .userinfo {
        box-sizing: border-box;
        padding: 20px 30px 30px;
        font-size: 14px;
        line-height: 28px;
        color: #666;
        cursor: default;
        .btns span {
            color: #f16e50;
            border-right: #dad9d5 1px solid;
            padding: 0 rem(10);
            &:first-child {
                padding-left: 0;
            }
        }
    }
    
    .newpic {
        ul {
            padding: 20px 30px;
            overflow: hidden;
            li {
                display: inline;
                width: 48px;
                height: 48px;
                img {
                    width: 48px;
                    height: 48px;
                    border: 0;
                    display: block;
                    float: left;
                    border: 1px solid transparent;
                }
            }
        }
    }

    .subTitle {
        background: #f16e50;
        color: #FFF;
        padding-left: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
    }

    .tagList dd {
        word-wrap: wrap;
        .tag {
            color: #f16e50;
            padding: 2px 5px;
        }
    }
    
</style>

<template>
    <div class='layout gap'>
        <dl>
            <dt class='title'>
                发现乐趣，发现自己
            </dt>
            <dd>
                <iframe src="/static/plugins/html5-text-pixel/index.html" frameborder="0" width='100%' height='700rem'>
                </iframe>
            </dd>
        </dl>
        <dl>
            <dt class='title'>
                寻找你附近的诗人
            </dt>
            <dd>
                <mapboxCom></mapboxCom>
            </dd>
        </dl>
    </div>
</template>
<script>
import headerCom from '@/pages/index/components/modules/header.vue';
import footerCom from '@/pages/index/components/modules/footer.vue';
import mapboxCom from '@/plugins/mapbox.vue';

export default {
    name: 'blog',
    mounted () {},
    components: {
        headerCom,
        footerCom,
        mapboxCom
    }
};

</script>
<style scoped lang='scss'>
@import '~@/assets/scss/caculate.scss';
.gap {
    margin: rem(20) auto;
    min-height: rem(1400);
    height: auto;
    background: #E8E5DD;
    background-image: url('');
    .title {
        padding-left: rem(10);
        height: rem(50);
        background: #a3e8bf;
        line-height: rem(50);
        font-size:rem(24);
        color: #fff;
    }
}
</style>

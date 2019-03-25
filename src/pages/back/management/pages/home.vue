<template>
    <div id='backHome'>
        <template v-if='module.includes("icon")'>
            <el-input v-model="input" placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-transfer v-model="value" :data="data">
            </el-transfer>
        </template>
        <template v-else-if='module.includes("logo")'>
            <el-upload
                class="upload-demo"
                drag
                action="/api/image/create"
                multiple
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
            </el-upload>
        </template>
        <template v-else-if='module.includes("banner")'>
            banner
        </template>
        <template v-else-if='module.includes("picture")'>
            picture
        </template>
        <template v-else-if='module.includes("tag")'>
            tag
        </template>
        <template v-else-if='module.includes("photo")'>
            photo
        </template>
        <template v-else-if='module.includes("message")'>
            message
        </template>
        <template v-else-if='module.includes("focus")'>
            focus
        </template>
        <template v-else='module.includes("friendLink")'>
            friendLink
        </template>
    </div>
</template>
<script>
export default {
    name: 'backHome',
    data () {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            value: [],
            input: '',
            data: generateData(),
            imageUrl: '',
            homeMsg: null
        };
    },
    created () {

    },
    computed: {
        module () {
            return this.$route.path.toString();
        }
    },
    methods: {
        handleAvatarSuccess (res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            // 更新home logo 地址
            //
            debugger;
        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    components: {}
};

</script>
<style scoped lang="scss"></style>

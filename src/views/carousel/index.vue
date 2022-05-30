<template>
    <el-card>

        <el-upload action="#" list-type="picture-card" :file-list="fileList" :auto-upload="false">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

        <!-- 上传图片按钮 -->
        <el-button v-if="fileList.length !== 0" type="primary" @click="uploadImg">上传轮播图</el-button>
    </el-card>


</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { uploadCarousel } from '@/api/carousel'
import { UploadUserFile, ElMessage } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
    // {
    //     name: 'food.jpeg',
    //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    // },
    // {
    //     name: '543.jpg',
    //     url: 'https://slide-1257191112.cos.ap-nanjing.myqcloud.com/slide/1653713519543.jpg',
    // },
    // {
    //     name: '254.jpg',
    //     url: 'https://slide-1257191112.cos.ap-nanjing.myqcloud.com/slide/1653713560254.jpg',
    // },
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)


// 上传图片按钮
const uploadImg = async () => {
    // console.log("fileList", fileList.value)
    // list转formdata
    let formData = new FormData();

    // 图片信息转存为formdata
    fileList.value.forEach(file => {
        // console.log("file", file.raw)
        formData.append('fileStreams', file.raw as string | Blob)
    });
    // 发送请求
    const res = await uploadCarousel(formData)
    // console.log("res", res)
    if (res.code === "00000") {
        // 清空fileList
        fileList.value = []
        ElMessage({ showClose: true, message: "上传成功~", type: "success", duration: 1000 });
    } else {
        ElMessage({ showClose: true, message: "上传失败：" + res.userMsg, type: "error", duration: 1000 });
    }
}

</script>

<style lang="less" scoped>
</style>

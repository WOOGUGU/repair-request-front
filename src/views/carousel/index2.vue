<!-- 图片上传服务器本地 -->
<template>
    <el-card>
        <el-upload v-model:file-list="fileList" class="upload-demo" drag action="/api-dev/v2/slide/uploadSlide"
            :data=imgData :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="handleRemove"
            list-type="picture" multiple>
            <el-icon class="el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">
                拖拽文件到这里，或 <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png 文件，不超过 1MB
                </div>
            </template>
        </el-upload>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadProps, UploadUserFile, ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { mainStore } from "@/store";


const store = mainStore();

const imgData = {
    "author": store.userName,
}

const fileList = ref<UploadUserFile[]>([])
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        setTimeout(() => {
            ElMessage.error('图片:' + rawFile.name + ' 格式必须是：jpg/png！')
        }, 0)
        return false
    } else if (rawFile.size / 1024 / 1024 > 1) {
        setTimeout(() => {
            ElMessage.error('图片:' + rawFile.name + ' 大小不得大于 1MB！')
        }, 0)
        return false
    }
    return true
}

const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}
</script>

<style lang="less" scoped>
</style>

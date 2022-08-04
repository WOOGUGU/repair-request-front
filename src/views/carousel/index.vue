<template>
    <el-card>

        <el-upload action="#" list-type="picture-card" :file-list="fileList" :auto-upload="false">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <div>
            <small>
                · 图片大小不能超过1M
            </small>
        </div>
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
import { UploadUserFile, ElMessage, UploadProps } from 'element-plus'
import { devNull } from 'os';

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)


// 上传图片按钮
const uploadImg = async () => {
    // console.log("fileList", fileList.value)
    // list转formdata
    let formData = new FormData();

    // 图片信息转存为formdata
    fileList.value.forEach(file => {
        // console.log("file", file)
        // 限制上传图片队列中单图片大小
        if (file.size! / 1024 / 1024 > 1) {
            setTimeout(() => {
                ElMessage({ showClose: true, message: '图片"' + file.name + '"过大，该图片不能上传', type: "error" });
            }, 1);
        } else {
            formData.append('fileStreams', file.raw as string | Blob);
        }
    });

    console.log("formData", formData)
    if (formData.get('fileStreams') === null) {
        setTimeout(() => {
            ElMessage({ showClose: true, message: "上传队列中没有符合要求的图片，请重新选择", type: "warning" });
        }, 100);
        // fileList.value = [];
        return;
    }
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

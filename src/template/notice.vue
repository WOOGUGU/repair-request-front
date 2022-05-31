<template>
    <el-card>
        <el-form :model="userData" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="userData.id" placeholder="编号由系统自动分配" disabled></el-input>
            </el-form-item>
            <el-form-item label="上传者">
                <el-input v-model="userData.author" placeholder="当前用户" disabled>
                </el-input>
            </el-form-item>
            <el-form-item v-if="isExistNotice" label="创建时间">
                <el-input v-model="userData.createTime" placeholder="自动获取" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="isExistNotice" label="发布时间">
                <el-input v-model="userData.announceTime" placeholder="自动获取" disabled> </el-input>
            </el-form-item>
            <el-form-item v-if="isExistNotice" label="修改时间">
                <el-input v-model="userData.updateTime" placeholder="自动获取" disabled></el-input>
            </el-form-item>
            <el-form-item label="公告内容">
                <el-input v-model="userData.content" placeholder="请输入公告内容" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="公告状态">
                <el-radio-group v-model="userData.displayStatus">
                    <el-radio label="1">显示</el-radio>
                    <el-radio label="2">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button v-if="!isExistNotice" type="primary" @click="handleAddSubmit" plain>添加公告</el-button>
                <el-button v-if="isExistNotice" type="warning" @click="handleUpdateSubmit" plain>提交更改</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { noticeParam, selectNoticeById, updateNotice, addNotice } from "@/api/notice";
import { ElMessage, ElMessageBox } from "element-plus";
import { mainStore } from "@/store";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'
const store = mainStore();
const route = useRoute();
const userRouter = useRouter()

// 公告信息
let userData: Ref<any> = ref({});
// 是否存在公告
let isExistNotice: Ref<boolean> = ref(true);

// 根据id查询公告信息
const getNoticeById = async (id: number) => {
    let params: noticeParam = {
        noticeId: id,
    };
    let res = await selectNoticeById(params);
    // console.log("res:", res);
    userData.value = res.data.list[0];
    userData.value.displayStatus = String(res.data.list[0].displayStatus);
    // console.log("userData:", userData.value);

};

// 判断时候为新增
if (route.query.noticeId) {
    getNoticeById(Number(route.query.noticeId));
} else {
    isExistNotice.value = false;
    userData.value.author = store.userName;
    // console.log("是新增");
}

// 提交修改
const handleUpdateSubmit = () => {
    // 弹窗提醒
    ElMessageBox.confirm('是否要更改该公告?', '请确认', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        let params: noticeParam = {
            author: userData.value.author,
            content: userData.value.content,
            displayStatus: Number(userData.value.displayStatus),
            noticeId: userData.value.id,
        };
        let res = await updateNotice(params);
        // console.log("res:", res);
        if (res.code === "00000") {
            ElMessage({ showClose: true, message: "修改成功~", type: "success", duration: 1000 });
        } else {
            ElMessage({ showClose: true, message: "修改失败：" + res.userMsg, type: "error", duration: 1000 });
        }
    }).catch()
};

// 提交新增
const handleAddSubmit = () => {
    // 弹窗提醒
    ElMessageBox.confirm('是否要添加该公告?', '请确认', {
        confirmButtonText: '确认添加',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        let params: noticeParam = {
            author: userData.value.author,
            content: userData.value.content,
            displayStatus: Number(userData.value.displayStatus),
        };
        let res = await addNotice(params);
        // console.log("res:", res);
        if (res.code === "00000") {
            ElMessage({ showClose: true, message: "添加成功~", type: "success", duration: 1000 });
            // 重置表单
            userData.value = {}
            userData.value.author = store.userName;
        } else {
            ElMessage({ showClose: true, message: "添加失败：" + res.userMsg, type: "error", duration: 1000 });
        }
    }).catch()
};

</script>

<style lang="less" scoped>
</style>

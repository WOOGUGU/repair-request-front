<template>
    <el-card>
        <el-form :model="articleData" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="articleData.id" placeholder="编号由系统自动分配" disabled></el-input>
            </el-form-item>
            <el-form-item label="上传者">
                <el-input v-model="articleData.author" placeholder="当前用户" disabled>
                </el-input>
            </el-form-item>
            <el-form-item v-if="isExistArticle" label="创建时间">
                <el-input v-model="articleData.createTime" placeholder="自动获取" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="isExistArticle" label="修改时间">
                <el-input v-model="articleData.updateTime" placeholder="自动获取" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="isExistArticle" label="文章标题">
                <el-input v-model="articleData.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章地址">
                <el-input v-model="articleData.contentPath" placeholder="请输入文章地址" type="textarea"></el-input>
            </el-form-item>
            <el-form-item v-if="isExistArticle" label="文章图片">
                <el-input v-model="articleData.coverPath" placeholder="请输入文章图片" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="articleData.displayStatus">
                    <el-radio label="1">发布</el-radio>
                    <el-radio label="2">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button v-if="!isExistArticle" type="primary" @click="handleAddSubmit" plain>添加公告</el-button>
                <el-button v-if="isExistArticle" type="warning" @click="handleUpdateSubmit" plain>提交更改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { articleParam, selectArticleById, updateArticle, addArticle } from "@/api/article";
import { ElMessage, ElMessageBox } from "element-plus";
import { mainStore } from "@/store";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'
const store = mainStore();
const route = useRoute();
const userRouter = useRouter()

// 文章信息
let articleData: Ref<any> = ref({});
// 是否存在文章
let isExistArticle: Ref<boolean> = ref(true);

// 根据id查询文章信息
const getArticleById = async (id: number) => {
    let params: articleParam = {
        articleId: id,
    };
    let res = await selectArticleById(params);
    // console.log("res:", res);
    articleData.value = res.data;
    articleData.value.displayStatus = String(res.data.displayStatus);
    console.log("articleData:", articleData.value);
}

// 判断时候为新增
if (route.query.articleId) {
    getArticleById(Number(route.query.articleId));
} else {
    isExistArticle.value = false;
    articleData.value.author = store.userName;
    console.log("是新增");
}

// 提交更改
const handleUpdateSubmit = async () => {
    // 弹窗提示
    ElMessageBox.confirm("确定提交更改吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(async (res) => {
        if (res) {
            let params: articleParam = articleData.value;
            params.articleId = articleData.value.id;
            const res = await updateArticle(params);
            // console.log("res", res);
            if (res.code === "00000") {
                ElMessage({ showClose: true, message: "修改成功~", type: "success", duration: 1000 });
            } else {
                ElMessage({ showClose: true, message: "修改失败：" + res.userMsg, type: "error", duration: 1000 });
            }
        }
    });
}

// 提交新增
const handleAddSubmit = async () => {
    // 弹窗提示
    ElMessageBox.confirm("确定提交新增吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(async (res) => {
        if (res) {
            let params: articleParam = articleData.value;
            const res = await addArticle(params);
            // console.log("res", res);
            if (res.code === "00000") {
                ElMessage({ showClose: true, message: "新增成功~", type: "success", duration: 1000 });
                // 重置表单
                articleData.value = {};
                articleData.value.author = store.userName;
            } else {
                ElMessage({ showClose: true, message: "新增失败：" + res.userMsg, type: "error", duration: 1000 });
            }
        }
    });
}
</script>

<style lang="less" scoped>
</style>
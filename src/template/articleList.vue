<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" sortable />
            <el-table-column label="状态" width="85px">
                <template #default="scope">
                    <span v-if="scope.row.displayStatus === 1">显示</span>
                    <span v-else-if="scope.row.displayStatus === 2">隐藏</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="300px">
                <template #default="scope">
                    <a :href="scope.row.contentPath" target="_blank">{{ scope.row.title }}</a>
                </template>
            </el-table-column>
            <!-- 图片预览 -->
            <el-table-column label="封面图片" min-width="200px">
                <template #default="scope">
                    <a class="img-path" :href="scope.row.coverPath" target="_blank">{{ scope.row.coverPath }}</a>
                    <!-- <img :src="scope.row.coverPath" style="width: 100px; height: 100px;"> -->
                </template>
            </el-table-column>
            <el-table-column prop="author" label="上传者" width="150px" sortable />
            <el-table-column prop="createTime" label="创建时间" width="200px" sortable />
            <el-table-column prop="updateTime" label="修改时间" width="200px" sortable />
            <el-table-column label="操作" fixed="right" width="150px">
                <template #default="scope">
                    <el-button color="#626aef" @click="handleRevise(scope.$index, scope.row)" size="small" plain>
                        修改
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" size="small" plain>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <br />
        <el-pagination v-model:currentPage="currentPage" :page-size="tableData.length" :disabled="disabled"
            layout="total, prev, pager, next, jumper" :total="tableData.length" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { articleParam, selectArticlelList, deleteArticle } from "@/api/article";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";

let tableData: Ref<any[]> = ref([]);
const currentPage = ref(1);
const disabled = ref(true);

// 获取文章列表
const getArticleList = async () => {
    let params: articleParam = {
        // TODO: 需绑定分页
        pageNum: 1,
        pageSize: 999,
    };
    const res = await selectArticlelList(params);
    // console.log("res", res);
    tableData.value = res.data.list;
};

getArticleList();

// --------跳转修改--------
const handleRevise = (index: number, row: any) => {
    // 跳转
    router.push({ path: "/article", query: { articleId: row.id } });
};

// --------删除--------
const handleDelete = (index: number, row: articleParam) => {
    // 弹窗确认
    ElMessageBox.confirm("确认删除文章“" + row.title + "”？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(async (res: any) => {
        if (res) {
            let params: any = { articleId: row.id, };
            let res = await deleteArticle(params);
            // console.log("res:", res);
            if (res.code === "00000") {
                ElMessage({ showClose: true, message: "删除文章成功~", type: "success", duration: 1000 });
                getArticleList();
            } else {
                ElMessage({ showClose: true, message: "删除失败：" + res.userMsg, type: "error", duration: 1000 });
            }
        }
    });
};
</script>

<style lang="less" scoped>
.el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-path {
    // 溢出隐藏
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

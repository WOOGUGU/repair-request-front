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
            <el-table-column prop="content" label="公告内容" min-width="250px" />
            <el-table-column prop="author" label="上传者" width="150px" />
            <el-table-column prop="createTime" label="创建时间" width="200px" sortable />
            <el-table-column prop="announceTime" label="发布时间" width="200px" sortable />
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
import { ref, Ref } from 'vue';
import { noticeParam, selectNoticeList, deleteNotice } from '@/api/notice';
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
const userRouter = useRouter()

let tableData: Ref<any[]> = ref([]);
const currentPage = ref(1);
const disabled = ref(true);

// 获取公告列表
const getTableData = async () => {
    let params: noticeParam = {
        // TODO: 需绑定分页
        pageNum: 1,
        pageSize: 999,
    };
    let res = await selectNoticeList(params);
    // console.log("res:", res);
    tableData.value = res.data.list;
};

getTableData();

// --------跳转修改--------
// TODO: 跳转修改页面
const handleRevise = (index: number, row: any) => {
    // console.log("index", index);
    // console.log("row", row);
    userRouter.push({ path: '/notice', query: { noticeId: row.id } });
};

// --------删除--------
// TODO: 删除公告按钮实现
const handleDelete = (index: number, row: any) => {
    // 弹窗提醒
    ElMessageBox.confirm('是否要更改该公告?', '请确认', {
        confirmButtonText: '确认修改',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        let params: noticeParam = {
            noticeId: row.id,
        };
        let res = await deleteNotice(params);
        // console.log("res:", res);
        if (res.code === "00000") {
            ElMessage({ showClose: true, message: "修改成功~", type: "success", duration: 1000 });
            getTableData();
        } else {
            ElMessage({ showClose: true, message: "修改失败：" + res.userMsg, type: "error", duration: 1000 });
        }
    }).catch()
};
</script>

<style lang="less" scoped>
.el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
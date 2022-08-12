<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" sortable />
            <el-table-column prop="content" label="反馈内容" min-width="250px" />
            <!-- <el-table-column label="反馈内容" min-width="250px">
                <template #default="scope">
                    <el-tooltip class="box-item" effect="dark" :content="scope.row.content" placement="top-start">
                        <p class="feedback-value">{{ scope.row.content }}</p>
                    </el-tooltip>
                </template>
            </el-table-column> -->
            <el-table-column prop="user.name" label="反馈者" width="150px" />
            <el-table-column prop="tel" label="联系方式" width="150px" />
            <el-table-column prop="submitTime" label="提交时间" width="200px" sortable />
        </el-table>
        <br />
        <el-pagination v-model:currentPage="page.pageNum" :page-sizes="[15, 30, 60, 100]" :page-size="page.pageSize"
            layout="sizes, total, prev, pager, next, jumper" :total="page.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { selectFeedbackList, feedbackParam } from "@/api/feedback";

let tableData: any = ref([]);
const page = ref({
    pageNum: 1,
    pageSize: 15,
    total: 0,
})

// 获取反馈列表
const getTableData = async () => {
    let params: feedbackParam = {
        pageNum: page.value.pageNum,
        pageSize: page.value.pageSize,
    };
    let res = await selectFeedbackList(params);
    console.log("res:", res);
    tableData.value = res.data.list;
    page.value.total = res.data.total;
};

// 更改分页页面元素数量
const handleSizeChange = (val: number) => {
    page.value.pageSize = val;
    getTableData();
}

// 更改分页页面编号
const handleCurrentChange = (val: number) => {
    page.value.pageNum = val;
    getTableData();
}

getTableData();
</script>

<style lang="less" scoped>
.feedback-value {
    // 溢出隐藏
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

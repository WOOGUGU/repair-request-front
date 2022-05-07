<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="工单号" width="85px" />
            <el-table-column prop="des" label="工单内容" min-width="140px" />
            <el-table-column prop="position" label="地址" width="140px" />
            <el-table-column prop="timeSubscribe" label="预约时间段" width="220px" />
            <el-table-column prop="timeStart" label="创建时间" width="220px" />
            <el-table-column prop="tel" label="联系方式" width="150px" />
            <el-table-column label="操作" fixed="right" width="75px">
                <template #default="scope">
                    <el-button color="#626aef" @click="handleDelete(scope.$index, scope.row)" size="small" plain>查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination v-model:currentPage="currentPage" :page-size="tableData.length" :disabled="disabled"
            layout="total, prev, pager, next, jumper" :total="tableData.length" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { selectOrderList, orderParam } from "@/api/order"

interface order {
    workorderNumber: number
    initiationTime: string
    contactInformation: string
    address: string
    workorderContent: string
    pictureAddress: string
    fixedTime: string
    evaluationStatus: string
    maintenanceSatisfaction: number | null
    evaluation: string | null
    workorderState: string
    fkStudentNumber: number
    createTime: string
    updateTime: string | null
    deleted: number
    version: number
}

let tableData = ref([]);
const currentPage = ref(1)
const disabled = ref(true)

const handleDelete = (index: number, row: order) => {
    console.log("index", index);
    console.log("row", row);
}
const getTableData = async (state: number) => {
    let params: orderParam = { progress: state };
    let res = await selectOrderList(params)
    // console.log("res:", res)
    tableData.value = res.data;
}

getTableData(0)
</script>

<style lang="less" scoped>
.el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

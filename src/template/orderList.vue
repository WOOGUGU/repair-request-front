<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="workorderNumber" label="工单号" width="85px" />
            <el-table-column prop="workorderContent" label="工单内容" />
            <el-table-column prop="address" label="地址" width="140px" />
            <el-table-column prop="createTime" label="创建时间" width="220px" />
            <el-table-column prop="fixedTime" label="维修时间段" width="140px" />
            <el-table-column prop="contactInformation" label="联系方式" width="150px" />
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
const currentPage = ref(1)
const disabled = ref(false)

interface User {
    date: string
    name: string
    address: string
}

const handleDelete = (index: number, row: User) => {
    console.log("index", index);
    console.log("row", row);
}

const tableData = [
    {
        "workorderNumber": 90,
        "initiationTime": "2022-05-03 11:15:16",
        "contactInformation": "12111112222",
        "address": "信息技术中心102",
        "workorderContent": "网速太慢了",
        "pictureAddress": "{\"0\":\"https://repair.woogugu.cn/a4161057-bca5-4e30-81f7-3ebafda7cc19.png\"}",
        "fixedTime": "9:00--10:00",
        "evaluationStatus": "1",
        "maintenanceSatisfaction": null,
        "evaluation": null,
        "workorderState": "1",
        "fkStudentNumber": 1,
        "createTime": "2022-05-03 11:15:16",
        "updateTime": null,
        "deleted": 0,
        "version": 1
    },
    {
        "workorderNumber": 89,
        "initiationTime": "2022-04-28 08:58:12",
        "contactInformation": "13111115555",
        "address": "西八520",
        "workorderContent": "拨号失败",
        "pictureAddress": "{}",
        "fixedTime": "9:00--10:00",
        "evaluationStatus": "1",
        "maintenanceSatisfaction": null,
        "evaluation": null,
        "workorderState": "1",
        "fkStudentNumber": 1,
        "createTime": "2022-04-28 08:58:12",
        "updateTime": null,
        "deleted": 0,
        "version": 1
    },
    {
        "workorderNumber": 88,
        "initiationTime": "2022-04-28 08:58:01",
        "contactInformation": "13111115555",
        "address": "西八520",
        "workorderContent": "拨号失败",
        "pictureAddress": "{}",
        "fixedTime": "9:00--10:00",
        "evaluationStatus": "1",
        "maintenanceSatisfaction": null,
        "evaluation": null,
        "workorderState": "1",
        "fkStudentNumber": 1,
        "createTime": "2022-04-28 08:58:01",
        "updateTime": null,
        "deleted": 0,
        "version": 1
    },
    {
        "workorderNumber": 86,
        "initiationTime": "2022-04-11 23:56:00",
        "contactInformation": "123456",
        "address": "北十",
        "workorderContent": "123",
        "pictureAddress": "{\"0\":\"https://repair.woogugu.cn/2487ee62-3e83-4724-9a7a-26bfbdd0e336.jpg\"}",
        "fixedTime": "9:00--10:00",
        "evaluationStatus": "1",
        "maintenanceSatisfaction": null,
        "evaluation": null,
        "workorderState": "1",
        "fkStudentNumber": 1911111111,
        "createTime": "2022-04-11 23:56:00",
        "updateTime": null,
        "deleted": 0,
        "version": 1
    }
];

</script>

<style lang="less" scoped>
.el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
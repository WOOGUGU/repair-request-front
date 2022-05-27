<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" />
            <el-table-column prop="username" label="用户名" width="150px" />
            <el-table-column prop="name" label="姓名" width="150px" />
            <el-table-column prop="tel" label="联系方式" width="180px" />
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
    </el-card>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { userParam, selectAdminList, selectRepairmanList, selectNorUserList } from "@/api/user";

const props = defineProps({
    // 用户等级： 1.管理员 2.维修员 3.普通用户
    role: Number,
});
let tableData: Ref<userParam[]> = ref([]);

// --------查询用户列表----------
const getTableData = async (role: number | undefined) => {
    if (role === 1) {
        // 管理员
        let res = await selectAdminList();
        // console.log("res-1:", res);
        tableData.value = res.data;
    } else if (role === 2) {
        // 维修员
        let res = await selectRepairmanList();
        // console.log("res-2:", res);
        tableData.value = res.data;
    } else if (role === 3) {
        // 普通用户
        let res = await selectNorUserList();
        // console.log("res-3:", res);
        tableData.value = res.data;
    }
};

getTableData(props.role);

// --------跳转修改--------
// TODO: 跳转修改页面
const handleRevise = (index: number, row: userParam) => {
    console.log("index", index);
    console.log("row", row);
};

// --------删除--------
// TODO: 删除用户按钮实现
const handleDelete = (index: number, row: userParam) => {
    console.log("index", index);
    console.log("row", row);
};
</script>

<style lang="less" scoped>
</style>

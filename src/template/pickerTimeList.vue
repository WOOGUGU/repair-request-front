<template>
    <el-card>
        <el-table :data="tableData" table-layout="auto" style="width: 100%">
            <el-table-column label="id" prop="id" width="100" />
            <el-table-column label="时间段" prop="picker" min-width="200" sortable />
            <el-table-column label="操作" fixed="right" width="100">
                <template #default="scope">
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" size="small" plain>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { pickerTimeParams, selectPickerTime, deletePickerTime } from '@/api/pickerTime';
import { ElMessageBox, ElMessage } from "element-plus";

let tableData: Ref<pickerTimeParams[]> = ref([])

// 获取报修时间段
const getPickerTime = async () => {
    let res = await selectPickerTime();
    // console.log("res:", res);
    tableData.value = res.data;
    // console.log("formData:", tableData.value);
}

getPickerTime();

// 删除故障类型
const handleDelete = async (index: number, row: any) => {
    // 弹窗确认
    ElMessageBox.confirm('是否要删除故障类型“' + row.picker + "“", '请确认', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        let params: pickerTimeParams = {
            pickerId: row.id,
        };
        let res = await deletePickerTime(params);
        // console.log("res:", res);
        if (res.code === "00000") {
            ElMessage({ showClose: true, message: "删除成功~", type: "success", duration: 1000 });
            getPickerTime();
        } else {
            ElMessage({ showClose: true, message: "删除失败：" + res.userMsg, type: "error", duration: 1000 });
        }
    }).catch()
}

</script>

<style lang="less" scoped>
</style>
<template>
    <el-card>
        <el-input v-model="search" placeholder="输入查询的区域" style="width: 200px" :prefix-icon="Search" clearable />
        <el-divider />
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="id" prop="id" width="100" />
            <el-table-column label="区域" prop="area" min-width="200" />
            <el-table-column label="位置" prop="position" min-width="200" />
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
import { Ref, ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { pickerLocationParams, selectPickerLocation, deletePickerLocation } from '@/api/pickerLocation';
import { ElMessageBox, ElMessage } from "element-plus";

let tableData: Ref<pickerLocationParams[]> = ref([]);

// 获取报修地点列表
const getPickerLocationList = async () => {
    let params: pickerLocationParams = {
        pageNum: 1,
        pageSize: 9999
    };
    const res = await selectPickerLocation(params);
    tableData.value = res.data.list;
}

getPickerLocationList();

// 筛选用户列表
const search = ref('');
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value || data.area!.toLowerCase().includes(search.value.toLowerCase()) ||
            data.position!.toLowerCase().includes(search.value.toLowerCase())
    )
);

// 删除报修地点
const handleDelete = async (index: number, row: pickerLocationParams) => {
    // 弹窗确认
    ElMessageBox.confirm('是否要删除报修地点“' + row.area + "-" + row.position + "“", '请确认', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        let params: pickerLocationParams = {
            pickerId: row.id,
        };
        let res = await deletePickerLocation(params);
        // console.log("res:", res);
        if (res.code === "00000") {
            ElMessage({ showClose: true, message: "删除成功~", type: "success", duration: 1000 });
            getPickerLocationList();
        } else {
            ElMessage({ showClose: true, message: "删除失败：" + res.userMsg, type: "error", duration: 1000 });
        }
    }).catch()
}


</script>

<style lang="less" scoped>
</style>

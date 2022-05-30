<template>
    <el-card>
        <el-input v-model="search" placeholder="输入查询的用户名" style="width: 200px" :prefix-icon="Search" clearable />
        <el-divider />
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" />
            <el-table-column prop="username" label="用户名" width="150px" />
            <el-table-column prop="name" label="姓名" width="150px" />
            <el-table-column prop="tel" label="联系方式" width="180px" />
            <el-table-column label="操作" fixed="right" width="75px">
                <template #default="scope">
                    <el-button color="#626aef" @click="handleRevise(scope.$index, scope.row)" size="small" plain>
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { Ref, ref, computed } from "vue";
import { Search } from '@element-plus/icons-vue'
import { selectAdminList, selectRepairmanList, selectNorUserList } from "@/api/user";
import { useRouter } from 'vue-router'
const userRouter = useRouter()

const props = defineProps({
    // 用户等级： 1.维修员 2.管理员 3.普通用户
    role: Number,
});
let tableData: Ref<any[]> = ref([]);

// --------查询用户列表----------
const getTableData = async (role: number | undefined) => {
    if (role === 1) {
        // 维修员
        let res = await selectRepairmanList();
        // console.log("res-1:", res);
        tableData.value = res.data.list;
    } else if (role === 2) {
        // 管理员
        let res = await selectAdminList();
        // console.log("res-2:", res);
        tableData.value = res.data.list;
    } else if (role === 3) {
        // 普通用户
        let res = await selectNorUserList();
        // console.log("res-3:", res);
        tableData.value = res.data.list;
    }
};

getTableData(props.role);

// 筛选用户列表
const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value || data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)

// --------跳转修改--------
const handleRevise = (index: number, row: any) => {
    console.log("index", index);
    console.log("row", row);
    userRouter.push({ path: "/user", query: { userId: row.id } });
};

</script>

<style lang="less" scoped>
</style>

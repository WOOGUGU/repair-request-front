<template>
    <el-card>
        <el-input v-model="search" placeholder="输入查询的用户名" style="width: 200px" :prefix-icon="Search" clearable />
        <el-divider />
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" />
            <el-table-column prop="username" label="用户名" min-width="150px" />
            <el-table-column prop="name" label="姓名" min-width="150px" />
            <el-table-column prop="tel" label="联系方式" min-width="150px" />
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
import { Ref, ref, computed } from "vue";
import { Search } from '@element-plus/icons-vue'
import { userParam, selectAdminList, selectRepairmanList, selectNorUserList, deleteUser } from "@/api/user";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
const userRouter = useRouter()

const props = defineProps({
    // 用户等级： 1.维修员 2.管理员 3.普通用户
    role: Number,
});
let tableData: Ref<any[]> = ref([]);
const currentPage = ref(1);
const disabled = ref(true);

// --------查询用户列表----------
const getTableData = async (role: number) => {
    let params: userParam = {
        // TODO: 需绑定分页
        pageNum: 1,
        pageSize: 999,
    };
    if (role === 1) {
        // 维修员
        let res = await selectRepairmanList(params);
        // console.log("res-1:", res);
        tableData.value = res.data.list;
    } else if (role === 2) {
        // 管理员
        let res = await selectAdminList(params);
        // console.log("res-2:", res);
        tableData.value = res.data.list;
    } else if (role === 3) {
        // 普通用户
        let res = await selectNorUserList(params);
        // console.log("res-3:", res);
        tableData.value = res.data.list;
    }
};

getTableData(props.role as number);

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
    userRouter.push({ path: "/user", query: { userId: row.id } });
};

// --------删除用户--------
const handleDelete = (index: number, row: any) => {
    // 弹窗提醒
    ElMessageBox.confirm("是否要删除用户“" + row.username + "”？", "提示", {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        let params: userParam = {
            userId: row.id,
            username: row.username,
        };
        let res = await deleteUser(params);
        // console.log("res:", res);
        if (res.code === "00000") {
            ElMessage({ showClose: true, message: "删除成功~", type: "success", duration: 1000 });
            getTableData(props.role as number);
        } else {
            ElMessage({ showClose: true, message: "删除失败：" + res.userMsg, type: "error", duration: 1000 });
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

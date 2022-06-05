<template>
    <el-card>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="formData.username" placeholder="全局查询（支持模糊查询）" clearable />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.name" placeholder="全局查询（支持模糊查询）" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-divider /> -->
        <el-input v-model="search" placeholder="当前页面查询" style="width: 200px" :prefix-icon="Search" clearable />
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
        <el-pagination v-model:currentPage="currentPage" :page-sizes="[15, 30, 60, 100]"
            :default-page-size="page.pageSize" layout="sizes, total, prev, pager, next, jumper" :total="page.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
</template>

<script setup lang="ts">
import { Ref, ref, computed } from "vue";
import { Search } from '@element-plus/icons-vue'
import { userParam, selectUser, deleteUser } from "@/api/user";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
const userRouter = useRouter()

const props = defineProps({
    // 用户等级： 1.维修员 2.管理员 3.普通用户
    role: Number,
});

let tableData: Ref<any[]> = ref([]);
let formData: Ref<any> = ref({
    username: '',
    name: '',
});
const currentPage = ref(1);
let page = ref({
    pageNum: 1,
    pageSize: 15,
    total: 0,
})

// --------查询用户列表----------
const getTableData = async (role: number) => {
    let params: userParam = {
        // TODO: 需绑定分页
        pageNum: page.value.pageNum,
        pageSize: page.value.pageSize,
        username: formData.value.username,
        name: formData.value.name,
    };
    let res;
    if (role === 1) {
        // 维修员
        params.roleId = 1;
        res = await selectUser(params);
        console.log("res-1:", res);
        tableData.value = res.data.list;
    } else if (role === 2) {
        // 管理员
        params.roleId = 2;
        res = await selectUser(params);
        console.log("res-2:", res);
        tableData.value = res.data.list;
    } else if (role === 3) {
        // 普通用户
        params.roleId = 3;
        res = await selectUser(params);
        console.log("res-3:", res);
        tableData.value = res.data.list;
    };
    page.value.total = res.data.total;
};

getTableData(props.role as number);

// 全局条件搜索
const onSubmit = () => {
    console.log("formData:", formData.value);
    getTableData(props.role as number);
}

// 更改分页页面元素数量
const handleSizeChange = (val: number) => {
    page.value.pageSize = val;
    getTableData(props.role as number);
}

// 更改分页页面编号
const handleCurrentChange = (val: number) => {
    page.value.pageNum = val;
    getTableData(props.role as number);
}

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

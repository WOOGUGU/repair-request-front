<template>
    <el-card>
        <el-input v-model="search" placeholder="输入查询的用户名" style="width: 200px" :prefix-icon="Search" clearable />
        <el-divider />
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" sortable />
            <el-table-column label="图片预览" width="150px">
                <!-- TODO: 点击图片放大 -->
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.imgPath" fit="contain" />
                </template>
            </el-table-column>
            <el-table-column prop="imgPath" label="图片路径" min-width="300px" />
            <el-table-column prop="author" label="上传者" width="150px" sortable />
            <el-table-column prop="submitTime" label="提交时间" width="200px" sortable />
            <el-table-column label="操作" fixed="right" width="100px">
                <template #default="scope">
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
import { carouselParam, selectCarouselList, deleteCarousel } from '@/api/carousel';
import { ElMessage, ElMessageBox } from "element-plus";

let tableData: Ref<any[]> = ref([]);
const currentPage = ref(1);
const disabled = ref(true);

// 获取轮播图列表
// XXX 不需分页查，请求方法不恰当，暂时用下面的方法代替
const getTableData = async () => {
    let params: carouselParam = {
        pageNum: 1,
        pageSize: 9999,
    };
    let res = await selectCarouselList(params);
    // console.log("res:", res);
    tableData.value = res.data.list;
};

getTableData();

// 筛选用列表
const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value || data.author.toLowerCase().includes(search.value.toLowerCase())
    )
)

// --------删除--------
const handleDelete = (index: number, row: any) => {
    // console.log("row", row.id);

    // 弹窗确认
    ElMessageBox.confirm("确认删除轮播图“" + row.id + "”？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(async (res: any) => {
        if (res) {
            let params: any = { slideId: row.id, };
            let res = await deleteCarousel(params);
            // console.log("res:", res);
            if (res.code === "00000") {
                ElMessage({ showClose: true, message: "删除轮播图成功~", type: "success", duration: 1000 });
                getTableData();
            } else {
                ElMessage({ showClose: true, message: "删除失败：" + res.userMsg, type: "error", duration: 1000 });
            }
        }
    });
};
</script>

<style lang="less" scoped>
.el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

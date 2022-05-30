<template>
    <el-card>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="85px" />
            <el-table-column label="图片预览" width="150px">
                <!-- TODO: 点击图片放大 -->
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.imgPath" fit="contain" />
                </template>
            </el-table-column>
            <el-table-column prop="imgPath" label="图片路径" width="300px" />
            <el-table-column prop="author" label="上传者" width="100px" />
            <el-table-column prop="submitTime" label="提交时间" width="200px" />
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
import { Ref, ref } from 'vue';
import { selectCarouselList } from '@/api/carousel';

let tableData: Ref<any[]> = ref([]);

// 获取轮播图列表
const getTableData = async () => {
    let res = await selectCarouselList();
    // console.log("res:", res);
    tableData.value = res.data.list;
};

getTableData();

// --------跳转修改--------
// TODO: 跳转修改页面
const handleRevise = (index: number, row: any) => {
    console.log("index", index);
    console.log("row", row);
};

// --------删除--------
// TODO: 删除用户按钮实现
const handleDelete = (index: number, row: any) => {
    console.log("index", index);
    console.log("row", row);
};
</script>

<style lang="less" scoped>
</style>

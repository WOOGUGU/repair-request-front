<template>
    <el-form :model="orderTable" label-width="100px">
        <el-space fill direction="vertical" style="width: 100%">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>工单信息</span>
                    </div>
                </template>
                <el-form-item label="工单号">
                    <el-input class=input v-model="orderTable.id" placeholder="Please input"
                        :disabled="orderDisabled.orderInformation" />
                </el-form-item>
                <el-form-item label="工单类型">
                    <el-select class=select v-model="orderTable.type" placeholder="please select your zone"
                        :disabled="orderDisabled.orderInformation">
                        <el-option label="有线网络无法拨号" value="1" />
                        <el-option label="无线网络没有弹窗" value="2" />
                        <el-option label="不能拨号" value="22" />
                        <el-option label="其他" value="8" />
                    </el-select>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input class=input v-model="orderTable.sender" placeholder="Please input"
                        :disabled="orderDisabled.orderInformation" />
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input class=input v-model="orderTable.timeStart" placeholder="Please input"
                        :disabled="orderDisabled.orderInformation" />
                </el-form-item>
                <el-form-item label="故障位置">
                    <el-select class=select v-model="orderTable.type" placeholder="please select your zone"
                        :disabled="orderDisabled.orderInformation">
                        <el-option label="其他" value="1" />
                        <el-option label="七教" value="2" />
                        <el-option label="行政楼" value="3" />
                        <el-option label="科技楼" value="4" />
                        <el-option label="大学生活动中心" value="5" />
                        <el-option label="北十" value="9" />
                        <el-option label="西六" value="10" />
                        <el-option label="2栋" value="11" />
                        <el-option label="1" value="12" />
                    </el-select>
                </el-form-item>
                <el-form-item label="预约时间">
                    <el-select class=select v-model="orderTable.timeSubscribe" placeholder="please select your zone"
                        :disabled="orderDisabled.orderInformation">
                        <el-option label="12:00-12:30" value="1" />
                        <el-option label="12:30-13:00" value="2" />
                        <el-option label="08:00-08:30" value="3" />
                        <el-option label="09:40-09:55" value="4" />
                        <el-option label="10:30-16:00" value="5" />
                    </el-select>
                </el-form-item>
                <el-form-item label="故障描述">
                    <el-input class=textInput v-model="orderTable.des" autosize type="textarea"
                        :disabled="orderDisabled.orderInformation" />
                </el-form-item>
                <el-form-item label="相关图片">
                    <el-space wrap>
                        <div v-if="orderTable.imgPath !== '[]'" v-for="img, item in imgPathList">
                            <el-image style="width: 125px; height: 125px" :src="img" :initial-index="imgNumber"
                                :preview-src-list="imgPathList" fit="cover" @mouseover="imgNumber = item" />
                        </div>
                        <div v-else>
                            <el-empty :image-size="60" style="width: 125px; height: 125px" description="无图片" />
                        </div>
                    </el-space>
                </el-form-item>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>用户信息</span>
                    </div>
                </template>
                <el-form-item label="创建人">
                    <el-input class=input v-model="orderTable.sender" placeholder="Please input"
                        :disabled="orderDisabled.userInformation" />
                </el-form-item>
                <el-form-item label="学号/工号">
                    <el-input class=input v-model="orderTable.username" placeholder="Please input"
                        :disabled="orderDisabled.userInformation" />
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input class=input v-model="orderTable.tel" placeholder="Please input"
                        :disabled="orderDisabled.userInformation" />
                </el-form-item>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>审批信息</span>
                    </div>
                </template>
                <el-form-item label="管理员工号">
                    <el-input class=input v-model="orderTable.solver" placeholder="Please input"
                        :disabled="orderDisabled.adminInformation" />
                </el-form-item>
                <el-form-item label="审批时间">
                    <el-input class=input v-model="orderTable.timeDistribution" placeholder="Please input"
                        :disabled="orderDisabled.adminInformation" />
                </el-form-item>
                <el-form-item label="管理员留言">
                    <el-input class=textInput v-model="orderTable.remark" autosize type="textarea"
                        :disabled="orderDisabled.adminInformation" />
                </el-form-item>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>维修信息</span>
                    </div>
                </template>
                <el-form-item label="维修员工号">
                    <el-input class=input v-model="orderTable.solver" placeholder="Please input"
                        :disabled="orderDisabled.repairmanInformation" />
                </el-form-item>
                <el-form-item label="维修时间">
                    <el-input class=input v-model="orderTable.timeDistribution" placeholder="Please input"
                        :disabled="orderDisabled.repairmanInformation" />
                </el-form-item>
                <el-form-item label="维修员留言">
                    <el-input class=textInput v-model="orderTable.feedback" autosize type="textarea"
                        :disabled="orderDisabled.repairmanInformation" />
                </el-form-item>
            </el-card>
        </el-space>
    </el-form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { order } from '@/interface/order';
import { selectOrderList, orderParam } from "@/api/order";
import { useRoute } from 'vue-router'
const route = useRoute()

// 图片地址列表
let imgPathList = ref()
// 光标选中图片号
let imgNumber = ref(0);
// 工单信息
let orderTable: Ref<order> = ref({});
// 工单块可编辑区域
let orderDisabled = ref({
    orderInformation: true,
    userInformation: true,
    adminInformation: true,
    repairmanInformation: true
})

// 获取指定工单
const getTableData = async (orderId: number | undefined) => {
    let params: orderParam = { orderId: orderId };
    let res = await selectOrderList(params);
    // console.log("res:", res.data[0]);
    orderTable.value = res.data[0];
    // 解析图片地址参数
    imgPathList.value = orderTable.value.imgPath == null ? [] : orderTable.value.imgPath.split("]")[0].split("[")[1].split(",");
    if (res.data[0].progress === 0) {
        orderDisabled.value.adminInformation = false;
    } else if (res.data[0].progress === 1) {
        orderDisabled.value.repairmanInformation = false;
    }
    // console.log("orderTable", orderTable.value);
    // console.log("imgPathList", imgPathList.value);
    // console.log("orderDisabled", orderDisabled.value);
};

getTableData(Number(route.query.orderId));
</script>

<style lang="less" scoped>
.input,
.select {
    width: 100%;
}
</style>

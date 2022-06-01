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
                    </el-select>
                </el-form-item>
                <el-form-item label="预约时间">
                    <el-select class=select v-model="orderTable.timeSubscribe" placeholder="please select your zone"
                        :disabled="orderDisabled.orderInformation">
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
                    <!-- <el-input class=input v-model="orderTable.solver" placeholder="Please input"
                        :disabled="orderDisabled.adminInformation" /> -->
                    <el-input class="input" placeholder="暂不记录管理员信息" disabled />
                </el-form-item>
                <el-form-item v-if="orderDisabled.isCheck || orderDisabled.isRepair" label="选择维修员">
                    <el-select class=select v-model="orderTable.solver" placeholder="请选择维修员"
                        :disabled="orderDisabled.adminInformation">
                        <el-option v-for="repairman, item in repairmanList"
                            :label="repairman.name + ' ' + repairman.username"
                            :value="(repairman.username as string)" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="orderDisabled.isCheck || orderDisabled.isReject" label="管理员留言">
                    <el-input class=textInput v-model="orderTable.remark" autosize type="textarea"
                        :disabled="orderDisabled.adminInformation" />
                </el-form-item>
                <!-- XXX: 直接判断是否有时间信息 -->
                <el-form-item v-if="orderTable.timeDistribution != undefined" label="审批时间">
                    <el-input class=textInput v-model="orderTable.timeDistribution" placeholder="Please input"
                        disabled />
                </el-form-item>
                <el-form-item v-if="orderDisabled.isCheck">
                    <el-button type="primary" @click="adminInformationClick" plain>分配</el-button>
                    <el-button type="danger" @click="orderReject" plain>驳回</el-button>
                </el-form-item>
                <el-form-item v-if="orderDisabled.isRepair">
                    <el-button type="warning" @click="changeRepairman" plain>重新分配</el-button>
                </el-form-item>
            </el-card>

            <el-card v-if="orderDisabled.isFinish">
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
import { selectOrderList, orderParam, adminDealOrder, sendRepairman, checkOrder } from "@/api/order";
import { selectRepairmanList, userParam } from '@/api/user';
import { ElMessage } from "element-plus";
import { useRoute } from 'vue-router';
const route = useRoute();

// --------工单基本信息--------
interface imgFile { url: string, type: string, }

// 文件信息列表
let fileList: Ref<imgFile[]> = ref([])
// 图片地址列表
let imgPathList: Ref<string[]> = ref([])
// 光标选中图片号
let imgNumber = ref(0);
// 工单信息
let orderTable: Ref<order> = ref({});
// 工单块可编辑区域
let orderDisabled = ref({
    orderInformation: true,
    userInformation: true,
    adminInformation: true,
    repairmanInformation: true,
    isCheck: false,
    isRepair: false,
    isFinish: false,
    isReject: false,
})

// 获取指定工单
const getTableData = async (orderId: number | undefined) => {
    let params: orderParam = { orderId: orderId };
    let res = await selectOrderList(params);
    // console.log("res:", res.data.list[0]);
    orderTable.value = res.data.list[0];
    // 解析图片地址参数
    fileList.value = orderTable.value.imgPath == null ? [] : JSON.parse(orderTable.value.imgPath);
    let j = 0;
    for (let i = 0; i < fileList.value.length; i++) {
        if (fileList.value[i].type === "image") {
            imgPathList.value[j] = fileList.value[i].url;
            j++;
        }
    }

    switch (orderTable.value.progress) {
        case 0:
            // 待审核
            orderDisabled.value.isCheck = true;
            orderDisabled.value.adminInformation = false;
            break;
        case 1:
            // 待维修
            orderDisabled.value.isRepair = true;
            orderDisabled.value.adminInformation = false;
            break;
        case 2:
            // 已完成
            orderDisabled.value.isFinish = true;
            break;
        case 4:
            // 已驳回
            orderDisabled.value.isReject = true;
            break;
    }
    console.log("orderTable", orderTable.value);
    // console.log("fileList", fileList.value);
    // console.log("imgPathList", imgPathList.value);
    console.log("orderDisabled", orderDisabled.value);
};

getTableData(Number(route.query.orderId));


// --------工单可选项信息--------
let repairmanList: Ref<userParam[]> = ref([]);
const getRepairmanList = async () => {
    if (orderTable.value.progress === 0)
        return;
    let res = await selectRepairmanList();
    repairmanList.value = res.data.list;
    // console.log("repairmanList", repairmanList.value);
}

getRepairmanList();

// console.log("time", orderTable.value.timeDistribution);

// --------审批信息提交--------
const adminInformationClick = async () => {
    // FIXME: 表单校验
    let rs: adminDealOrder = {
        orderId: orderTable.value.id,
        solver: orderTable.value.solver,
    };
    const res = await sendRepairman(rs);
    // console.log("res", res);
    if (res.code === "00000") {
        ElMessage({ showClose: true, message: "分配成功~", type: "success", duration: 1000 });
        // FIXME: 刷新页面改为页面回退/刷新组件
        setTimeout(() => {
            location.reload();
        }, 1100);
    } else {
        ElMessage({ showClose: true, message: "分配失败：" + res.userMsg, type: "error", duration: 1000 });
    }
}

// --------驳回工单--------
const orderReject = async () => {
    // FIXME: 表单校验
    let rs: adminDealOrder = {
        orderId: orderTable.value.id,
        remark: orderTable.value.remark,
    };
    const res = await checkOrder(rs);
    // console.log("res", res);
    if (res.code === "00000") {
        ElMessage({ showClose: true, message: "驳回成功~", type: "success", duration: 1000 });
        // FIXME: 刷新页面改为页面回退/刷新组件
        setTimeout(() => {
            location.reload();
        }, 1100);
    } else {
        ElMessage({ showClose: true, message: "驳回失败：" + res.userMsg, type: "error", duration: 1000 });
    }
}
// --------修改维修员--------
const changeRepairman = async () => {
    // FIXME: 表单校验
    let rs: adminDealOrder = {
        orderId: orderTable.value.id,
        solver: orderTable.value.solver,
    };
    const res = await sendRepairman(rs);
    // console.log("res", res);
    if (res.code === "00000") {
        ElMessage({ showClose: true, message: "分配成功~", type: "success", duration: 1000 });
        // FIXME: 刷新页面改为页面回退/刷新组件
        setTimeout(() => {
            location.reload();
        }, 1100);
    } else {
        ElMessage({ showClose: true, message: "分配失败：" + res.userMsg, type: "error", duration: 1000 });
    }
}

</script>

<style lang="less" scoped>
.input,
.select,
.datePicker {
    width: 100%;
}
</style>

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
                    <el-input v-model="orderTable.id" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="工单类型">
                    <el-select v-model="orderTable.type" placeholder="please select your zone">
                        <el-option label="有线网络无法拨号" value="1" />
                        <el-option label="无线网络没有弹窗" value="2" />
                        <el-option label="不能拨号" value="22" />
                        <el-option label="其他" value="8" />
                    </el-select>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="orderTable.sender" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input v-model="orderTable.timeStart" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="故障位置">
                    <el-select v-model="orderTable.type" placeholder="please select your zone">
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
                    <el-select v-model="orderTable.timeSubscribe" placeholder="please select your zone">
                        <el-option label="12:00-12:30" value="1" />
                        <el-option label="12:30-13:00" value="2" />
                        <el-option label="08:00-08:30" value="3" />
                        <el-option label="09:40-09:55" value="4" />
                        <el-option label="10:30-16:00" value="5" />
                    </el-select>
                </el-form-item>
                <el-form-item label="故障描述">
                    <el-input v-model="orderTable.des" type="textarea" />
                </el-form-item>
                <el-form-item label="相关图片">
                    <div v-for="img, item in imgPathList">
                        <el-image style="width: 100px; height: 100px" :src="img" :initial-index="imgNumber"
                            :preview-src-list="imgPathList" fit="scale-down" @mouseover="imgNumber = item" />
                    </div>
                </el-form-item>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>用户信息</span>
                    </div>
                </template>
                <el-row>
                    <el-col :span="12">
                        创建人
                    </el-col>
                    <el-col :span="12">
                        学号
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        联系方式
                    </el-col>
                </el-row>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>审批信息</span>
                    </div>
                </template>
                <el-row>
                    <el-col :span="12">
                        管理员工号
                    </el-col>
                    <el-col :span="12">
                        审批时间
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        管理员留言
                    </el-col>
                </el-row>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>维修信息</span>
                    </div>
                </template>
                <el-row>
                    <el-col :span="12">
                        维修员工号
                    </el-col>
                    <el-col :span="12">
                        维修时间
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        维修员留言
                    </el-col>
                </el-row>
            </el-card>
        </el-space>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { order } from '@/interface/order';

const orderTable: order = reactive({
    //     id: null,
    //     username: "",
    //     sender: "",
    //     tel: "",
    //     type: "",
    //     des: "",
    //     position: "",
    //     timeSubscribe: "",
    //     progress: null,
    //     solver: "",
    //     timeStart: "",
    //     timeDistribution: "",
    //     timeEnd: "",
    //     feedback: "",
    //     stars: "",
    //     remark: "",
    //     imgPath: "",
    // }
    //     {
    "id": 17,
    "username": "12",
    "sender": "12",
    "tel": "1223",
    "type": "123",
    "des": "1231",
    "position": "324",
    "timeSubscribe": "2022-05-19 16:00-17:00",
    "progress": 0,
    "solver": null,
    "timeStart": "2022-05-18 22:37:19",
    "timeDistribution": null,
    "timeEnd": null,
    "feedback": null,
    "stars": null,
    "remark": null,
    "imgPath": "[https://imgs-repairnetwork-1257191112.cos.ap-nanjing.myqcloud.com/12/1652884637361.jpeg, https://imgs-repairnetwork-1257191112.cos.ap-nanjing.myqcloud.com/12/1652884638253.jpeg]"
});
const imgPathList = ref(orderTable.imgPath.split("]")[0].split("[")[1].split(","))

let imgNumber = ref(0);

console.log(imgPathList)
</script>

<style lang="less" scoped>
</style>

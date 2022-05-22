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
                    <el-input v-model="orderTable.des" autosize type="textarea" />
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
                    <el-input v-model="orderTable.sender" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="学号/工号">
                    <el-input v-model="orderTable.username" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="orderTable.tel" placeholder="Please input" />
                </el-form-item>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>审批信息</span>
                    </div>
                </template>
                <el-form-item label="管理员工号">
                    <el-input v-model="orderTable.solver" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="审批时间">
                    <el-input v-model="orderTable.timeDistribution" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="管理员留言">
                    <el-input v-model="orderTable.remark" autosize type="textarea" />
                </el-form-item>
            </el-card>

            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>维修信息</span>
                    </div>
                </template>
                <el-form-item label="维修员工号">
                    <el-input v-model="orderTable.solver" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="维修时间">
                    <el-input v-model="orderTable.timeDistribution" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="维修员留言">
                    <el-input v-model="orderTable.feedback" autosize type="textarea" />
                </el-form-item>
            </el-card>
        </el-space>
    </el-form>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue';
import { order } from '@/interface/order';
import { ElDivider } from 'element-plus'

const spacer = h(ElDivider, { direction: 'vertical' })
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
    "id": 19,
    "username": "user",
    "sender": "_user",
    "tel": "17797700864",
    "type": "wire",
    "des": "无线网络没有弹窗故障描述故障描述故障描述故障描述",
    "position": "行政楼201-A",
    "timeSubscribe": "2022-05-25 10:00-11:00",
    "progress": 2,
    "solver": "_repairman 17797700864",
    "timeStart": "2022-05-22 17:31:06",
    "timeDistribution": "2022-05-22 17:32:00",
    "timeEnd": "2022-05-22 17:32:53",
    "feedback": "维修员留言维修员留言维修员留言维修员留言",
    "stars": null,
    "remark": "管理员留言管理员留言管理员留言管理员留言",
    "imgPath": "[]"
});
const imgPathList = ref(orderTable.imgPath == null ? [] : orderTable.imgPath.split("]")[0].split("[")[1].split(","))

let imgNumber = ref(0);

</script>

<style lang="less" scoped>
</style>

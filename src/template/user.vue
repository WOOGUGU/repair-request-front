<template>
    <el-card>
        <el-form :model="userData" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="userData.id" placeholder="请输入编号" disabled></el-input>
            </el-form-item>
            <!-- XXX:此处实际为学号/工号，后期记得修改... -->
            <el-form-item label="用户名">
                <el-input v-model="userData.username" placeholder="请输入用户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="userData.name" placeholder="请输入姓名" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="userData.tel" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <!-- XXX：修改为从数据库查询用户等级列表，动态获取 -->
            <el-form-item label="用户等级">
                <el-checkbox-group v-model="userData.roleTypes">
                    <el-checkbox label="1">维修员</el-checkbox>
                    <el-checkbox label="2">管理员</el-checkbox>
                    <el-checkbox label="3">普通用户</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="handleSubmit" plain>提交更改</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { selectUserById, updateUser } from "@/api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from 'vue-router';
const route = useRoute();

// 用户信息
let userData: Ref<any> = ref({});

// 根据id查询用户信息
const getUserById = async (id: number) => {
    let res = await selectUserById(id);
    // console.log("res:", res);
    userData.value = res.data;
    // 提取用户权限等级
    userData.value.roleTypes = [];
    for (let i = 0; i < res.data.roles.length; i++) {
        userData.value.roleTypes.push(String(res.data.roles[i].id));
    }
    // console.log("roleTypes:", userData.value.roleTypes);
};

getUserById(Number(route.query.userId));

// 提交修改
const handleSubmit = () => {
    // 弹窗提醒
    ElMessageBox.confirm(
        '是否要更改该用户数据?',
        '请确认',
        {
            confirmButtonText: '确认修改',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await updateUser(userData.value);
            // console.log("res:", res);
            if (res.code === "00000") {
                ElMessage({ showClose: true, message: "修改成功~", type: "success", duration: 1000 });
                // FIXME: 刷新页面改为页面回退/刷新组件
                setTimeout(() => {
                    location.reload();
                }, 1100);
            } else {
                ElMessage({ showClose: true, message: "修改失败：" + res.userMsg, type: "error", duration: 1000 });
            }
        })
        .catch()
};

</script>

<style lang="less" scoped>
</style>

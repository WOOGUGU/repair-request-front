<template>
    <el-card>
        <el-form :model="formData" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="formData.id" placeholder="编号由系统自动分配" disabled></el-input>
            </el-form-item>
            <el-form-item label="故障类型">
                <el-input v-model="formData.value" placeholder="请输入故障类型"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { pickerDesParams, addPickerDes } from '@/api/pickerDes';
import { ElMessage } from 'element-plus';

let formData: Ref<pickerDesParams> = ref({})

// 提交故障类型
const submit = async () => {
    let params: pickerDesParams = {
        type: "des",
        value: formData.value.value,
    };
    let res = await addPickerDes(params);
    if (res.code === "00000") {
        ElMessage({ showClose: true, message: "修改成功~", type: "success", duration: 1000 });
        formData.value = {};
    } else {
        ElMessage({ showClose: true, message: "修改失败：" + res.userMsg, type: "error", duration: 1000 });
    }
}

</script>

<style lang="less" scoped>
</style>
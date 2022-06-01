<template>
    <el-card>
        <el-form :model="formData" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="formData.id" placeholder="编号由系统自动分配" disabled></el-input>
            </el-form-item>
            <el-form-item label="区域">
                <el-input v-model="formData.area" placeholder="请输入故障类型"></el-input>
            </el-form-item>
            <el-form-item label="位置">
                <el-input v-model="formData.position" placeholder="请输入故障类型"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { pickerLocationParams, addPickerLocation } from '@/api/pickerLocation';
import { ElMessage } from 'element-plus';

let formData: Ref<pickerLocationParams> = ref({})

// 提交故障位置
const submit = async () => {
    let params: pickerLocationParams = {
        area: formData.value.area,
        position: formData.value.position,
    };
    let res = await addPickerLocation(params);
    if (res.code === "00000") {
        ElMessage({ showClose: true, message: "提交成功~", type: "success", duration: 1000 });
        formData.value = {};
    } else {
        ElMessage({ showClose: true, message: "提交失败：" + res.userMsg, type: "error", duration: 1000 });
    }
}

</script>

<style lang="less" scoped>
</style>
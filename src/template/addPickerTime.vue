<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="编号">
        <el-input v-model="formData.id" placeholder="编号由系统自动分配" disabled></el-input>
      </el-form-item>
      <el-form-item label="上门时间段">
        <el-time-picker v-model="formData.times" value-format="HH:mm" format="HH:mm" :disabled-menutes="[0, 59]" is-range range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { pickerTimeParams, addPickerTime } from "@/api/pickerTime";
import { ElMessageBox, ElMessage } from "element-plus";

let formData: Ref<pickerTimeParams> = ref({});

// 提交故障类型
const submit = async () => {
  let params: pickerTimeParams = {
    type: "time",
    value: formData.value.times![0] + "-" + formData.value.times![1],
  };
  let res = await addPickerTime(params);
  if (res.code === "00000") {
    ElMessage({ showClose: true, message: "修改成功~", type: "success", duration: 1000 });
    formData.value = {};
  } else {
    ElMessage({ showClose: true, message: "修改失败：" + res.userMsg, type: "error", duration: 1000 });
  }
};
</script>

<style lang="less" scoped></style>

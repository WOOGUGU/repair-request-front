<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="loginTable" :rules="rules" class="form">
      <el-form-item class="item">
        <h2 class="title">用户登入</h2>
      </el-form-item>

      <el-form-item class="item" prop="usernumber">
        <el-input class="input" :prefix-icon="User" v-model="loginTable.usernumber" placeholder="请输入工号/学号" />
      </el-form-item>

      <el-form-item class="item" prop="password">
        <el-input class="input" :prefix-icon="Key" v-model="loginTable.password" type="password" placeholder="请输入密码"
          show-password />
      </el-form-item>

      <el-form-item class="item">
        <el-button class="button" type="primary" @click="submitForm(ruleFormRef)">登入
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Key, User } from "@element-plus/icons-vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { mainStore } from "@/store";
import { login, checkPermissions } from "@/api/login";
import router from "@/router";

const store = mainStore();

const loginTable = reactive({
  usernumber: "admin",
  password: "",
});

// 表单校验
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  usernumber: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 登入请求
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(loginTable);
      if (!checkPermissions(res.data.authorities, "ROLE_admin")) {
        ElMessage({ showClose: true, message: "登入失败：无管理员权限", type: "error", });
        return;
      }
      if (res.code === "00000") {
        store.userNumber = res.data.username;
        store.userName = res.data.name;
        store.telephoneNumber = res.data.tel;
        ElMessage({ showClose: true, message: "登入成功，即将跳转~", type: "success", duration: 900, });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        ElMessage({ showClose: true, message: "登入失败：" + res.userMsg, type: "error", });
      }
      console.log("res:", res);
    } else {
      console.log("错误!", fields);
    }
  });
};
</script>

<style lang="less" scoped>
@tableWidth: 70%;
@tableHeight: 12%;

.login {
  background-color: #e2e2e2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  height: 300px;
  width: 500px;
  background-color: #f4f4f4;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .item {
    width: @tableWidth;
    height: @tableHeight;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      letter-spacing: 0.2em;
    }

    .button {
      width: 100%;
    }
  }
}
</style>

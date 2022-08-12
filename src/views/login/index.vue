<template>
  <div class="login">
    <div class="mask">
      <el-form ref="ruleFormRef" :model="loginTable" :rules="rules" class="form">
        <el-form-item class="item">
          <h1 class="login-title">用户登入</h1>
        </el-form-item>

        <el-form-item class="item" prop="usernumber">
          <el-input class="login-input" size="large" :prefix-icon="User" v-model="loginTable.usernumber"
            placeholder="请输入工号/学号" />
        </el-form-item>

        <el-form-item class="item" prop="password">
          <el-input class="login-input" size="large" :prefix-icon="Key" v-model="loginTable.password" type="password"
            placeholder="请输入密码" show-password />
        </el-form-item>

        <el-form-item class="item">
          <el-button class="login-button" color="#626aef" size="large" type="primary" @click="submitForm(ruleFormRef)">
            登入
          </el-button>
        </el-form-item>
      </el-form>
    </div>
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
        ElMessage({ showClose: true, message: "登入成功，即将跳转~", type: "success", duration: 750, });
        setTimeout(() => {
          router.push("/");
        }, 800);
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
@tableHeight: 60px;

.login {
  // background: url('@/assets/images/login-background-1.jpg') no-repeat;
  background: url('@/assets/images/login-background-2.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mask {
  // // background: rgba(87, 105, 128, 0.349);
  // background-image: linear-gradient(0deg, rgba(49, 40, 84, 0) 0%, rgba(87, 105, 128, 0.75) 100%);
  // height: 380px;
  // width: 600px;
  // border-radius: 8px;
  background: rgba(0, 0, 0, 0.349);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  height: 400px;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .item {
    width: @tableWidth;
    height: @tableHeight;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .login-title {
      color: rgb(182, 184, 216);
      width: 100%;
      height: 50px;
      letter-spacing: 10px;
    }

    .login-button {
      width: 100%;
      height: 45px;
      font-size: 118%;
      letter-spacing: 20px;
      justify-content: center;
    }
  }
}
</style>

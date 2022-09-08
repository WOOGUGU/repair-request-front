<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧栏 -->
      <el-aside :style="{ width: asideWidth }">
        <div class="mb-2" :style="{ width: logoWidth }">
          <!-- <el-icon :size="25">
            <help-filled />
          </el-icon> -->
          <div class="logo-div">
            <img class="logo" :src="logo" />
          </div>
          <h3 v-if="!collapse">网络报修系统</h3>
        </div>

        <menusTemplate :isFolding="collapse" />
      </el-aside>

      <!-- 主体 -->
      <el-container>
        <!-- 首行 -->
        <el-header>
          <div class="header">
            <div class="main-body">
              <el-icon @click="changeCollapse" :size="22">
                <component :is="collapseIcon" />
              </el-icon>
            </div>
            <div class="self-center">
              <el-dropdown>
                <span>{{ userName }}</span>
                <el-icon>
                  <arrow-down />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import logo from "@/assets/logo/IT-logo-1.ico";
import { mainStore } from "@/store";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import { logout } from "@/api/logout";
import menusTemplate from "./menu/menus.vue";

// 菜单折叠相关
var collapse = ref<boolean>(false);
var collapseIcon = ref("Fold");
var asideWidth = ref("200px");
var logoWidth = ref("177px");
// 路由相关
const store = mainStore();
const userName = store.userName !== "" ? store.userName : "username";
const defaultActive = sessionStorage.getItem("path") || "/home";

const changeCollapse = () => {
  if (collapse.value) {
    collapse.value = false;
    collapseIcon.value = "Fold";
    asideWidth.value = "200px";
    logoWidth.value = "177px";
  } else {
    collapse.value = true;
    collapseIcon.value = "Expand";
    asideWidth.value = "64px";
    logoWidth.value = "64px";
  }
  console.log(collapse.value);
};

const savePath = (path: string) => {
  sessionStorage.setItem("path", `/${path}`);
  router.push(sessionStorage.path);
};

// 点击登出
const handleLogout = async () => {
  console.log("logout");
  // 弹窗提示
  ElMessageBox.confirm("是否要退出当前用户登录状态？", "提示", {
    confirmButtonText: "确认退出",
    cancelButtonText: "取消",
    type: "error",
  }).then(async () => {
    const res = await logout();
    if (res.code === "00000") {
      store.userName = "";
      store.userNumber = "";
      store.telephoneNumber = "";
      router.push("/login");
    }
  });
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    background-color: #cfd7e2;

    .mb-2 {
      height: 60px;
      // width: 180px;
      display: flex;
      justify-content: center;
      align-items: space-around;

      .logo-div {
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        .logo {
          width: 26px;
          height: 26px;
        }
      }
    }

    .children {
      background-color: #dbe0e8;
    }
  }
}

.el-header {
  background-color: #afb4c9;

  .header {
    height: 100%;
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;

    .main-body {
      flex: 7;
    }

    .self-center {
      font-size: 12px;
      flex: 1;
      display: inline-flex;
      // width: 80px;
      justify-content: flex-end;
    }
  }
}

.el-main {
  background-color: #e6e9ee;
}
</style>

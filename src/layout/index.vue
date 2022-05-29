<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧栏 -->
      <el-aside :style="{ width: asideWidth }">
        <div class="mb-2">
          <el-icon :size="25">
            <help-filled />
          </el-icon>
          <h3 v-if="!collapse">网络报修系统</h3>
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo" mode="vertical" :collapse="collapse"
          :collapse-transition="collapseTransition" background-color="#cfd7e2" :default-active="defaultActive"
          active-text-color="#626aef">
          <!-- 首页 -->
          <el-menu-item index="1" @click="savePath('home')">
            <el-icon>
              <house />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <!-- 工作台 -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <document />
              </el-icon>
              <span>工单管理</span>
            </template>
            <el-menu-item index="2-1" class="children" @click="savePath('reviewOrder')">
              <el-icon>
                <circle-plus />
              </el-icon>
              <span>待审核</span>
            </el-menu-item>
            <el-menu-item index="2-2" class="children" @click="savePath('repairOrder')">
              <el-icon>
                <clock />
              </el-icon>
              <span>待维修</span>
            </el-menu-item>
            <el-menu-item index="2-3" class="children" @click="savePath('completeOrder')">
              <el-icon>
                <circle-check />
              </el-icon>
              <span>已完成</span>
            </el-menu-item>
            <el-menu-item index="2-4" class="children" @click="savePath('rejectOrder')">
              <el-icon>
                <circle-close />
              </el-icon>
              <span>已驳回</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 人员管理 -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <user />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="3-1" class="children" @click="savePath('adminList')">
              <el-icon>
                <postcard />
              </el-icon>
              <span>管理员列表</span>
            </el-menu-item>
            <el-menu-item index="3-2" class="children" @click="savePath('repairmanList')">
              <el-icon>
                <postcard />
              </el-icon>
              <span>维修员列表</span>
            </el-menu-item>
            <el-menu-item index="3-3" class="children" @click="savePath('norUserList')">
              <el-icon>
                <postcard />
              </el-icon>
              <span>普通用户列表</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 轮播图管理 -->
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <Picture />
              </el-icon>
              <span>轮播图管理</span>
            </template>
            <el-menu-item index="4-1" class="children" @click="savePath('carouselList')">
              <el-icon>
                <Files />
              </el-icon>
              <span>轮播图列表</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 公告管理 -->
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <bell />
              </el-icon>
              <span>公告管理</span>
            </template>
            <el-menu-item index="5-1" class="children" @click="savePath('noticeList')">
              <el-icon>
                <bell />
              </el-icon>
              <span>公告列表</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 面板设置 -->
          <el-menu-item index="999" disabled>
            <el-icon>
              <setting />
            </el-icon>
            <span>面板设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-container>
        <!-- 首行 -->
        <el-header>
          <div class="header">
            <div class="main-body">
              <el-icon @click="changeCollapse" :size="22">
                <Fold v-if="!collapse" />
                <expand v-if="collapse" />
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
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
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
import { ref } from "vue";
import { mainStore } from "@/store";
import {
  HelpFilled, House, Document, CirclePlus, Clock, CircleCheck, CircleClose,
  User, Setting, Postcard, Fold, Expand, ArrowDown, Picture, Files, Bell,
} from "@element-plus/icons-vue";
import router from "@/router";

var collapse = ref<boolean>(false);
var collapseTransition = ref<boolean>(false);
var asideWidth = ref("200px");
const store = mainStore();
const userName = store.userName !== "" ? store.userName : "username";
const defaultActive = sessionStorage.getItem("path") || "/home";

const changeCollapse = () => {
  collapse.value = !collapse.value;
  asideWidth.value = asideWidth.value === "200px" ? "64px" : "200px";
  console.log(collapse.value);
};

const savePath = (path: string) => {
  sessionStorage.setItem("path", `/${path}`);
  router.push(sessionStorage.path);
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    background-color: #cfd7e2;

    .mb-2 {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
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

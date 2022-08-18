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
            <img class="logo" :src="logo">
          </div>
          <h3 v-if="!collapse">网络报修系统</h3>
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo" mode="vertical" :collapse="collapse"
          :unique-opened="true" :collapse-transition="collapseTransition" background-color="#cfd7e2"
          :default-active="defaultActive" active-text-color="#626aef">
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
                <document-add />
              </el-icon>
              <span>待审核</span>
            </el-menu-item>
            <el-menu-item index="2-2" class="children" @click="savePath('repairOrder')">
              <el-icon>
                <document-remove />
              </el-icon>
              <span>待维修</span>
            </el-menu-item>
            <el-menu-item index="2-3" class="children" @click="savePath('completeOrder')">
              <el-icon>
                <document-checked />
              </el-icon>
              <span>已完成</span>
            </el-menu-item>
            <el-menu-item index="2-4" class="children" @click="savePath('rejectOrder')">
              <el-icon>
                <document-delete />
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
            <el-menu-item index="3-4" class="children" @click="savePath('addUser')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加用户</span>
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
            <el-menu-item index="4-2" class="children" @click="savePath('carousel')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加轮播图</span>
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
            <el-menu-item index="5-2" class="children" @click="savePath('addNotice')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加公告</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 文章管理 -->
          <el-sub-menu index="6">
            <template #title>
              <el-icon>
                <collection />
              </el-icon>
              <span>文章管理</span>
            </template>
            <el-menu-item index="6-1" class="children" @click="savePath('articleList')">
              <el-icon>
                <collection />
              </el-icon>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="6-2" class="children" @click="savePath('addArticle')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加文章</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 选框管理 -->
          <el-sub-menu index="7">
            <template #title>
              <el-icon>
                <refrigerator />
              </el-icon>
              <span>选框管理</span>
            </template>
            <el-menu-item index="7-1" class="children" @click="savePath('pickerTime')">
              <el-icon>
                <clock />
              </el-icon>
              <span>上门时间段</span>
            </el-menu-item>
            <el-menu-item index="7-2" class="children" @click="savePath('addPickerTime')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加上门时间段</span>
            </el-menu-item>
            <el-menu-item index="7-3" class="children" @click="savePath('pickerLocation')">
              <el-icon>
                <location />
              </el-icon>
              <span>报修地点</span>
            </el-menu-item>
            <el-menu-item index="7-4" class="children" @click="savePath('addPickerLocation')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加报修地点</span>
            </el-menu-item>
            <el-menu-item index="7-5" class="children" @click="savePath('pickerDes')">
              <el-icon>
                <price-tag />
              </el-icon>
              <span>故障类型</span>
            </el-menu-item>
            <el-menu-item index="7-6" class="children" @click="savePath('addPickerDes')">
              <el-icon>
                <plus />
              </el-icon>
              <span>添加故障类型</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 反馈 -->
          <el-sub-menu index="8">
            <template #title>
              <el-icon>
                <chat-line-square />
              </el-icon>
              <span>反馈管理</span>
            </template>
            <el-menu-item index="8-1" class="children" @click="savePath('feedback')">
              <el-icon>
                <chat-line-square />
              </el-icon>
              <span>反馈列表</span>
            </el-menu-item>
          </el-sub-menu>
          <!-- 面板设置 -->
          <el-menu-item index="999" disabled>
            <el-icon>
              <help />
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
              <el-icon @click="changeCollapse" size="22">
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
import { ref } from "vue";
import logo from "@/assets/logo/IT-logo-1.ico";
import { mainStore } from "@/store";
import {
  HelpFilled, House, Document, CirclePlus, Clock, CircleCheck, CircleClose, ChatLineSquare, User, Setting, Postcard, Fold, Expand, ArrowDown, Picture, Files, Bell, Collection, Plus, Refrigerator, Location, PriceTag, DocumentAdd, DocumentDelete, DocumentChecked, DocumentRemove, Help
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import { logout } from "@/api/logout"

var collapse = ref<boolean>(false);
var collapseTransition = ref<boolean>(false);
var asideWidth = ref("200px");
var logoWidth = ref("177px")
const store = mainStore();
const userName = store.userName !== "" ? store.userName : "username";
const defaultActive = sessionStorage.getItem("path") || "/home";

const changeCollapse = () => {
  collapse.value = !collapse.value;
  asideWidth.value = asideWidth.value === "200px" ? "64px" : "200px";
  logoWidth.value = logoWidth.value === "177px" ? "64px" : "177px";
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
    confirmButtonText: '确认退出',
    cancelButtonText: '取消',
    type: 'error',
  }).then(async () => {
    const res = await logout();
    if (res.code === "00000") {
      store.userName = "";
      store.userNumber = "";
      store.telephoneNumber = "";
      router.push("/login");
    }
  })
}

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

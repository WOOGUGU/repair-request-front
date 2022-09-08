<template>
  <el-menu default-active="1" :collapse="isFolding" :unique-opened="true" :collapse-transition="false" background-color="#cfd7e2" active-text-color="#626aef">
    <template v-for="menuItem in menuList" :key="menuItem.id">
      <template v-if="!menuItem.haveChile">
        <el-menu-item :index="menuItem.id" @click="savePath(menuItem.path)" :disabled="menuItem.disabled">
          <el-icon>
            <component :is="menuItem.icon" />
          </el-icon>
          <span>{{ menuItem.label }}</span>
        </el-menu-item>
      </template>
      <template v-else-if="menuItem.haveChile">
        <el-sub-menu :index="menuItem.id" :disabled="menuItem.disabled">
          <template #title>
            <el-icon>
              <component :is="menuItem.icon" />
            </el-icon>
            <span>{{ menuItem.label }}</span>
          </template>
          <template v-for="menu in menuItem.children" :key="menu.id">
            <el-menu-item :index="menu.id" class="children" @click="savePath(menu.path)" :disabled="menu.disabled">
              <el-icon>
                <component :is="menu.icon" />
              </el-icon>
              <span>{{ menu.label }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { menuList } from "./menuListData";
import router from "@/router";

const prop = defineProps({
  isFolding: Boolean,
});

// console.log("menuList", menuList);
const savePath = (path: string) => {
  console.log("path", path);
  sessionStorage.setItem("path", `/${path}`);
  router.push(sessionStorage.path);
};
</script>

<style lang="less" scoped>
.el-menu {
  background-color: #cfd7e2;
  .children {
    background-color: #dbe0e8;
  }
}
</style>

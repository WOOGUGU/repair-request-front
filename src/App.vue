<template>
  <router-view />
  <!-- <login></login> -->
</template>

<script setup lang="ts">
import { useTransitionState, ref, nextTick, provide } from "vue";
import login from "./views/login/index.vue";

const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
</script>


<style lang="less">
</style>

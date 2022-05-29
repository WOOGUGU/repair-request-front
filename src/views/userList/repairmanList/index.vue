<template>
    <userList :role="role" />
</template>

<script setup lang="ts">
import userList from '@/template/userList.vue';

const role: number = 1
</script>

<style lang="less" scoped>
</style>
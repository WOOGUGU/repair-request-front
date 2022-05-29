<template>
    <p>adminList</p>
    <userList :role="role" />
</template>

<script setup lang="ts">
import userList from '@/template/userList.vue';

const role: number = 2
</script>

<style lang="less" scoped>
</style>
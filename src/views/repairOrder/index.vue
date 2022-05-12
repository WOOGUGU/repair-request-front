<template>
    <el-card>
        <orderList :state="state" />
    </el-card>
</template>

<script setup lang="ts">
import orderList from "@/template/orderList.vue"

const state: number = 1
</script>

<style lang="less" scoped>
</style>
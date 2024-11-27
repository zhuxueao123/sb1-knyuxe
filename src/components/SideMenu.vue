<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<template>
  <el-menu
    :default-active="activeMenu"
    class="side-menu"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
    router
  >
    <el-menu-item index="/orders">
      <el-icon><Document /></el-icon>
      <span>订单列表</span>
    </el-menu-item>
    <el-menu-item index="/vouchers">
      <el-icon><Ticket /></el-icon>
      <span>卡券列表</span>
    </el-menu-item>
    <el-menu-item index="/shipping">
      <el-icon><Van /></el-icon>
      <span>发货列表</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.side-menu {
  height: 100%;
  border-right: none;
}
</style>
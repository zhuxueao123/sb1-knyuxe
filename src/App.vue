<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import SideMenu from './components/SideMenu.vue'

const route = useRoute()
const authStore = useAuthStore()
</script>

<template>
  <template v-if="route.path === '/login'">
    <RouterView />
  </template>
  
  <el-container v-else class="layout-container">
    <el-aside width="200px">
      <SideMenu />
    </el-aside>
    <el-container>
      <el-header>
        <h2>订单管理系统</h2>
        <div class="header-right">
          <span class="username">{{ authStore.userInfo?.name }}</span>
          <el-button type="text" @click="authStore.logout">退出登录</el-button>
        </div>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.layout-container {
  height: 100vh;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.username {
  font-size: 14px;
  color: #606266;
}

.el-aside {
  background-color: #304156;
  color: #fff;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
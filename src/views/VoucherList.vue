<script setup lang="ts">
import { ref } from 'vue'

interface Voucher {
  id: string
  code: string
  type: string
  value: number
  status: string
  expireTime: string
}

const tableData = ref<Voucher[]>([
  {
    id: '1',
    code: 'VOUCHER001',
    type: '满减券',
    value: 50,
    status: '未使用',
    expireTime: '2024-12-31'
  },
  {
    id: '2',
    code: 'VOUCHER002',
    type: '折扣券',
    value: 0.8,
    status: '已使用',
    expireTime: '2024-12-31'
  }
])
</script>

<template>
  <div class="voucher-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>卡券列表</span>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="code" label="卡券编号" />
        <el-table-column prop="type" label="卡券类型" />
        <el-table-column label="面值">
          <template #default="scope">
            {{ scope.row.type === '折扣券' 
              ? `${(scope.row.value * 10).toFixed(1)}折` 
              : `¥${scope.row.value.toFixed(2)}` }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="使用状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '未使用' ? 'success' : 'info'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="expireTime" label="有效期至" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.voucher-list {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
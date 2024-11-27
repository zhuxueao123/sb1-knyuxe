<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Order {
  id: string
  orderNo: string
  customer: string
  amount: number
  status: string
  createTime: string
}

const router = useRouter()
const tableData = ref<Order[]>([
  {
    id: '1',
    orderNo: 'ORD20240301001',
    customer: '张三',
    amount: 299.99,
    status: '待付款',
    createTime: '2024-03-01 10:00:00'
  },
  {
    id: '2',
    orderNo: 'ORD20240301002',
    customer: '李四',
    amount: 599.99,
    status: '已付款',
    createTime: '2024-03-01 11:30:00'
  }
])

const handleView = (row: Order) => {
  router.push(`/orders/${row.id}`)
}
</script>

<template>
  <div class="order-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单列表</span>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="customer" label="客户名称" />
        <el-table-column prop="amount" label="订单金额">
          <template #default="scope">
            ¥{{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已付款' ? 'success' : 'warning'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.order-list {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
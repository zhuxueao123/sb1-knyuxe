<script setup lang="ts">
import { ref } from 'vue'

interface Shipping {
  id: string
  orderNo: string
  shippingNo: string
  customer: string
  address: string
  status: string
  shippingTime: string
}

const tableData = ref<Shipping[]>([
  {
    id: '1',
    orderNo: 'ORD20240301001',
    shippingNo: 'SF1234567890',
    customer: '张三',
    address: '北京市朝阳区xxx街道',
    status: '已发货',
    shippingTime: '2024-03-01 14:30:00'
  },
  {
    id: '2',
    orderNo: 'ORD20240301002',
    shippingNo: 'SF1234567891',
    customer: '李四',
    address: '上海市浦东新区xxx路',
    status: '运输中',
    shippingTime: '2024-03-01 15:00:00'
  }
])
</script>

<template>
  <div class="shipping-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>发货列表</span>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="shippingNo" label="快递单号" />
        <el-table-column prop="customer" label="收件人" />
        <el-table-column prop="address" label="收货地址" show-overflow-tooltip />
        <el-table-column prop="status" label="物流状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已发货' ? 'success' : 'warning'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="shippingTime" label="发货时间" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.shipping-list {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
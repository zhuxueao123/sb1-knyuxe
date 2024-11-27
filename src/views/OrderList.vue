<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const filter = ref({
  orderNumber: '',
  orderStatus: '',
  paymentStatus: '',
  start: null,
  end: null,
  productName: ''
})

const applyFilter = () => {
  // 这里可以添加筛选逻辑
}
</script>

<template>
  <div class="order-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单列表</span>
          <el-form :inline="true" :model="filter" class="filter-form">
            <el-form-item label="订单号">
              <el-input v-model="filter.orderNumber" placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="filter.orderStatus" placeholder="请选择订单状态">
                <el-option label="待付款" value="待付款"></el-option>
                <el-option label="已付款" value="已付款"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付状态">
              <el-select v-model="filter.paymentStatus" placeholder="请选择支付状态">
                <el-option label="未支付" value="未支付"></el-option>
                <el-option label="已支付" value="已支付"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker v-model="filter.start" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="filter.end" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="产品名称">
              <el-input v-model="filter.productName" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="applyFilter">查询</el-button>
            </el-form-item>
          </el-form>
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
        <el-table-column prop="orderStatus" label="订单状态">
          <template #default="scope">
            <el-tag :type="scope.row.orderStatus === 30 ? 'success' : 'warning'">
              {{ scope.row.orderStatus === 30 ? '已付款' : '待付款' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="创建时间" />
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

.filter-form {
  margin-bottom: 20px;
}
</style>
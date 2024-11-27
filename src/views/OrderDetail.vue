<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.params.id

const orderDetail = ref({
  id: orderId,
  orderNo: 'ORD20240301001',
  customer: '张三',
  phone: '13800138000',
  address: '北京市朝阳区xxx街道',
  amount: 299.99,
  status: '待付款',
  createTime: '2024-03-01 10:00:00',
  products: [
    {
      name: '商品1',
      price: 199.99,
      quantity: 1
    },
    {
      name: '商品2',
      price: 100.00,
      quantity: 1
    }
  ]
})
</script>

<template>
  <div class="order-detail">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单详情</span>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="订单号">{{ orderDetail.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag :type="orderDetail.status === '已付款' ? 'success' : 'warning'">
            {{ orderDetail.status }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ orderDetail.customer }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ orderDetail.phone }}</el-descriptions-item>
        <el-descriptions-item label="收货地址">{{ orderDetail.address }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ orderDetail.createTime }}</el-descriptions-item>
      </el-descriptions>

      <div class="products-list">
        <h3>商品清单</h3>
        <el-table :data="orderDetail.products" border style="width: 100%">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="price" label="单价">
            <template #default="scope">
              ¥{{ scope.row.price.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" />
          <el-table-column label="小计">
            <template #default="scope">
              ¥{{ (scope.row.price * scope.row.quantity).toFixed(2) }}
            </template>
          </el-table-column>
        </el-table>

        <div class="order-total">
          <span>订单总额：</span>
          <span class="amount">¥{{ orderDetail.amount.toFixed(2) }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.order-detail {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.products-list {
  margin-top: 20px;
}

.order-total {
  margin-top: 20px;
  text-align: right;
}

.amount {
  font-size: 20px;
  color: #f56c6c;
  font-weight: bold;
}
</style>
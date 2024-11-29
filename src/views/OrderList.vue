<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getOrders } from '../api/orders';
import type { Order } from '../api/types';
import BasePagination from '../components/BasePagination.vue';
import { PAYMENT_STATUS, getPaymentStatusText, getPaymentStatusType } from '../utils/constants';

const router = useRouter();

// 表格数据
const tableData = ref<Order[]>([]);
const loading = ref(false);

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 筛选条件
const filter = ref({
  orderNo: '',
  orderStatus: [], // 改为数组以支持多选
  paymentStatus: '', // 字符串，单选
  startTime: '',
  endTime: '',
});

// 订单状态选项
const orderStatusOptions = [
  { label: '审核中', value: 10 },
  { label: '已审核', value: 20 },
  { label: '配送中', value: 30 },
  { label: '完成', value: 40 },
  { label: '作废', value: 50 },
  { label: '退货中', value: 60 },
  { label: '退货成功', value: 70 }
];

// 支付状态选项
const paymentStatusOptions = [
  { label: '全部', value: '' },
  { label: '未付款', value: PAYMENT_STATUS.PENDING },
  { label: '授权提货', value: PAYMENT_STATUS.AUTHORIZED },
  { label: '未付全款', value: PAYMENT_STATUS.HALF },
  { label: '信用额度付款', value: PAYMENT_STATUS.CREDIT },
  { label: '已付款', value: PAYMENT_STATUS.PAID },
  { label: '退款', value: PAYMENT_STATUS.REFUNDED },
  { label: '作废', value: PAYMENT_STATUS.VOIDED }
];

// 获取订单列表
const fetchOrders = async () => {
  loading.value = true;
  try {
    const params = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      orderNumber: filter.value.orderNo || undefined,
      orderStatus: filter.value.orderStatus.length > 0 ? filter.value.orderStatus : undefined,
      paymentStatus: filter.value.paymentStatus || undefined,
      startTime: filter.value.startTime || undefined,
      endTime: filter.value.endTime || undefined
    };
    
    const res = await getOrders(params);
    tableData.value = res.List;
    total.value = res.Total;
  } catch (error) {
    ElMessage.error('获取订单列表失败');
  } finally {
    loading.value = false;
  }
};

// 查询
const handleSearch = () => {
  currentPage.value = 1;
  fetchOrders();
};

// 重置
const handleReset = () => {
  filter.value = {
    orderNo: '',
    orderStatus: [],
    paymentStatus: '',
    startTime: '',
    endTime: '',
  };
  currentPage.value = 1;
  fetchOrders();
};

// 查看详情
const handleView = (row: Order) => {
  router.push(`/orders/${row.Id}`);
};

// 格式化金额
const formatAmount = (amount: number) => {
  return (amount / 100).toFixed(2);
};

// 获取订单状态标签类型
const getOrderStatusType = (status: number) => {
  switch (status) {
    case 10: return 'warning'; // 审核中
    case 20: return 'primary'; // 已审核
    case 30: return 'success'; // 配送中
    case 40: return 'success'; // 完成
    case 50: return 'info';    // 作废
    case 60: return 'danger';  // 退货中
    case 70: return 'danger';  // 退货成功
    default: return 'info';
  }
};

// 获取订单状态文本
const getOrderStatusText = (status: number) => {
  const option = orderStatusOptions.find(option => option.value === status);
  return option ? option.label : '未知状态';
};

// 监听分页变化
const handlePageChange = () => {
  fetchOrders();
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div class="order-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单列表</span>
          <el-form :inline="true" :model="filter" class="filter-form">
            <el-form-item label="订单号">
              <el-input v-model="filter.orderNo" placeholder="请输入订单号" clearable />
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select
                v-model="filter.orderStatus"
                placeholder="请选择订单状态"
                multiple
                clearable
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option
                  v-for="option in orderStatusOptions.slice(1)"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="支付状态">
              <el-select v-model="filter.paymentStatus" placeholder="请选择支付状态" clearable>
                <el-option
                  v-for="option in paymentStatusOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="filter.startTime"
                type="datetime"
                placeholder="开始时间"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="-">
              <el-date-picker
                v-model="filter.endTime"
                type="datetime"
                placeholder="结束时间"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="OrderNumber" label="订单号" min-width="120" />
        <el-table-column label="订单金额" min-width="100">
          <template #default="{ row }">
            ¥{{ formatAmount(row.Amount) }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getOrderStatusType(row.OrderStatus)">
              {{ getOrderStatusText(row.OrderStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已付金额" min-width="100">
          <template #default="{ row }">
            ¥{{ formatAmount(row.PaymentMoney) }}
          </template>
        </el-table-column>
        <el-table-column label="付款状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getPaymentStatusType(row.PaymentStatus)">
              {{ getPaymentStatusText(row.PaymentStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="OrderDate" label="创建时间" min-width="160" />
        <el-table-column prop="Remark" label="备注" min-width="140" />
        
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <BasePagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        @update:current-page="handlePageChange"
        @update:page-size="handlePageChange"
      />
    </el-card>
  </div>
</template>

<style scoped>
.order-list {
  min-height: 100%;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-form :deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
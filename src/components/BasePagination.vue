<script setup lang="ts">
interface Props {
  currentPage: number
  pageSize: number
  total: number
  pageSizes?: number[]
}

interface Emits {
  (e: 'update:currentPage', page: number): void
  (e: 'update:pageSize', size: number): void
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 50, 100]
})

const emit = defineEmits<Emits>()

const handleCurrentChange = (val: number) => {
  emit('update:currentPage', val)
}

const handleSizeChange = (val: number) => {
  emit('update:pageSize', val)
}
</script>

<template>
  <div class="pagination-container">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
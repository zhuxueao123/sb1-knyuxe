import request from '../utils/request'
import type { ApiResponse, Order } from './types'

export const getOrders = (params?: {
  page?: number
  pageSize?: number
  status?: string
}) => {
  return request.get<ApiResponse<{
    list: Order[]
    total: number
  }>>('/Customer/OrderList', { params })
}

export const getOrderDetail = (id: string) => {
  return request.get<ApiResponse<Order>>(`/orders/${id}`)
}
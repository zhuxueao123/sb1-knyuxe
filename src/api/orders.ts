import request from '../utils/request'
import type { Order, ApiResponse } from './types'

export const getOrders = (params?: {
  page?: number
  pageSize?: number
  status?: string
}) => {
  return request.get<ApiResponse<{
    list: Order[]
    total: number
  }>>('/orders', { params })
}

export const getOrderDetail = (id: string) => {
  return request.get<ApiResponse<Order>>(`/orders/${id}`)
}
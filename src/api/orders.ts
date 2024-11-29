import request from '../utils/request'
import type { ApiResponse, Order } from './types'

export interface OrderQueryParams {
  pageIndex: number
  pageSize: number
  orderNo?: string
  status?: string
  startTime?: string
  endTime?: string
}

export const getOrders = (params: OrderQueryParams) => {
  return request.post<ApiResponse<{
    list: Order[]
    total: number
  }>>('/Customer/OrderList', params)
}

export const getOrderDetail = (id: string) => {
  return request.get<ApiResponse<Order>>(`/orders/${id}`)
}
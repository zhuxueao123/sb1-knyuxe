import request from '../utils/request'
<<<<<<< HEAD
import type { ApiResponse, Order } from './types'
=======
import type { Order, ApiResponse } from './types'
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b

export const getOrders = (params?: {
  page?: number
  pageSize?: number
  status?: string
}) => {
  return request.get<ApiResponse<{
    list: Order[]
    total: number
<<<<<<< HEAD
  }>>('/Customer/OrderList', { params })
=======
  }>>('/orders', { params })
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b
}

export const getOrderDetail = (id: string) => {
  return request.get<ApiResponse<Order>>(`/orders/${id}`)
}
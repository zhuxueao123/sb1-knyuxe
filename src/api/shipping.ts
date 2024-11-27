import request from '../utils/request'
import type { Shipping, ApiResponse } from './types'

export const getShippingList = (params?: {
  page?: number
  pageSize?: number
  status?: string
}) => {
  return request.get<ApiResponse<{
    list: Shipping[]
    total: number
  }>>('/shipping', { params })
}
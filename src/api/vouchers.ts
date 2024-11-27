import request from '../utils/request'
import type { Voucher, ApiResponse } from './types'

export const getVouchers = (params?: {
  page?: number
  pageSize?: number
  status?: string
}) => {
  return request.get<ApiResponse<{
    list: Voucher[]
    total: number
  }>>('/vouchers', { params })
}
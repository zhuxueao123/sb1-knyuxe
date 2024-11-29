import request from '../utils/request'
import type { ApiResponse, LoginParams, LoginResult } from './types'

export const login = (data: LoginParams) => {
  return request.post<ApiResponse<LoginResult>>('/Token/CustomerLogin', data)
}
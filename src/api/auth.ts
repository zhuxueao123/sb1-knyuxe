import request from '../utils/request'
import type { LoginParams, LoginResult, ApiResponse } from './types'

export const login = (data: LoginParams) => {
  return request.post<ApiResponse<LoginResult>>('/Token/CustomerLogin', data)
}
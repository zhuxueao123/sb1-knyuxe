// 通用响应类型
export interface ApiResponse<T> {
  State: number
  ErrorMsg: string
  Data: T
}

// 分页参数
export interface PaginationParams {
  page?: number
  pageSize?: number
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[]
  total: number
}

// 认证相关类型
export interface LoginParams {
  phone: string
  code: string
}

export interface UserInfo {
  Name: string
  Level: string | null
  Phone: string
  Email: string | null
}

export interface LoginResult {
  token: string
  existUser: UserInfo
}

// 订单相关类型
export interface Order {
  id: string
  orderNo: string
  customer: string
  phone: string
  address: string
  amount: number
  status: string
  createTime: string
  products: OrderProduct[]
}

export interface OrderProduct {
  name: string
  price: number
  quantity: number
}

// 卡券相关类型
export interface Voucher {
  id: string
  code: string
  type: string
  value: number
  status: string
  expireTime: string
}

// 物流相关类型
export interface Shipping {
  id: string
  orderNo: string
  shippingNo: string
  customer: string
  address: string
  status: string
  shippingTime: string
}
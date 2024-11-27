import axios from 'axios'
import { ElMessage } from 'element-plus'
<<<<<<< HEAD
import router from '../router'
import { useAuthStore } from '../stores/auth'
=======
import { useAuthStore } from '../stores/auth'
import router from '../router'
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
<<<<<<< HEAD
    const { State, ErrorMsg, Data } = response.data

    if (State === 1) {
      return Data
    }

    ElMessage.error(ErrorMsg || '请求失败')
    return Promise.reject(new Error(ErrorMsg || '请求失败'))
=======
    const { code, msg, data } = response.data

    if (code === 0) {
      return data
    }

    ElMessage.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b
  },
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
      ElMessage.error('登录已过期，请重新登录')
    } else {
      ElMessage.error(error.message || '网络错误')
    }
    return Promise.reject(error)
  }
)

export default request
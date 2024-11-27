import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin } from '../api/auth'
import type { UserInfo } from '../api/types'
import router from '../router'

// 从 localStorage 获取初始状态
const getStoredAuth = () => {
  const storedToken = localStorage.getItem('token')
  const storedUserInfo = localStorage.getItem('userInfo')
  return {
    token: storedToken || '',
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    isAuthenticated: !!storedToken
  }
}

export const useAuthStore = defineStore('auth', () => {
  const initialState = getStoredAuth()
  const isAuthenticated = ref(initialState.isAuthenticated)
  const token = ref(initialState.token)
  const userInfo = ref<UserInfo | null>(initialState.userInfo)

  const login = async (phone: string, code: string) => {
    try {
      const result = await apiLogin({ phone, code })
      token.value = result.token
      userInfo.value = result.existUser
      isAuthenticated.value = true
      
      // 保存到 localStorage
      localStorage.setItem('token', result.token)
      localStorage.setItem('userInfo', JSON.stringify(result.existUser))
      
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    token.value = ''
    userInfo.value = null
    
    // 清除 localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    
    router.push('/login')
  }

  return {
    isAuthenticated,
    token,
    userInfo,
    login,
    logout
  }
})
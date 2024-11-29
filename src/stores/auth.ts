import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin } from '../api/auth'
import type { UserInfo } from '../api/types'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  // 从 localStorage 获取初始状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<UserInfo | null>(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null)
  const isAuthenticated = ref(!!token.value)

  const login = async (phone: string, code: string) => {
    try {
      const response = await apiLogin({ phone, code })
      debugger
      const { accessToken: newToken, existUser } = response
      debugger
      
      // 更新状态
      token.value = newToken
      userInfo.value = existUser
      isAuthenticated.value = true
      
      // 保存到 localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('userInfo', JSON.stringify(existUser))
      
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    // 清除状态
    token.value = ''
    userInfo.value = null
    isAuthenticated.value = false
    
    // 清除 localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    
    router.push('/login')
  }

  return {
    token,
    userInfo,
    isAuthenticated,
    login,
    logout
  }
})
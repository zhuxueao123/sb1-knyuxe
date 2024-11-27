import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin } from '../api/auth'
import type { LoginResult } from '../api/types'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const token = ref<string>('')
  const userInfo = ref<LoginResult['userInfo'] | null>(null)

  const login = async (phone: string, code: string) => {
    try {
      const result = await apiLogin({ phone, code })
      token.value = result.token
      userInfo.value = result.userInfo
      isAuthenticated.value = true
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    token.value = ''
    userInfo.value = null
  }

  return {
    isAuthenticated,
    token,
    userInfo,
    login,
    logout
  }
})
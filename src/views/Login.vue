<script setup lang="ts">
<<<<<<< HEAD
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
=======
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b

const loginForm = ref({
  phone: '',
  code: ''
<<<<<<< HEAD
});

const loading = ref(false);
const countdown = ref(0);
const timer = ref<NodeJS.Timeout | null>(null);

const validatePhone = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone);
};

const handleSendCode = () => {
  if (!loginForm.value.phone) {
    ElMessage.warning('请输入手机号');
    return;
  }

  if (!validatePhone(loginForm.value.phone)) {
    ElMessage.warning('请输入正确的手机号');
    return;
  }

  countdown.value = 60;
  timer.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0 && timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }, 1000);

  ElMessage.success('验证码已发送');
};

const handleLogin = async () => {
  if (!loginForm.value.phone || !loginForm.value.code) {
    ElMessage.warning('请输入手机号和验证码');
    return;
  }

  if (!validatePhone(loginForm.value.phone)) {
    ElMessage.warning('请输入正确的手机号');
    return;
  }

  loading.value = true;
  try {
    const success = await authStore.login(loginForm.value.phone, loginForm.value.code);
    if (success) {
      ElMessage.success('登录成功');
      router.push('/orders');
    } else {
      ElMessage.error('验证码错误');
    }
  } finally {
    loading.value = false;
  }
};
=======
})

const loading = ref(false)
const countdown = ref(0)
const timer = ref<NodeJS.Timeout | null>(null)

const validatePhone = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone)
}

const handleSendCode = () => {
  if (!loginForm.value.phone) {
    ElMessage.warning('请输入手机号')
    return
  }

  if (!validatePhone(loginForm.value.phone)) {
    ElMessage.warning('请输入正确的手机号')
    return
  }

  countdown.value = 60
  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0 && timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }, 1000)

  // 模拟发送验证码
  ElMessage.success(`验证码已发送，测试验证码：123456`)
}

const handleLogin = async () => {
  if (!loginForm.value.phone || !loginForm.value.code) {
    ElMessage.warning('请输入手机号和验证码')
    return
  }

  if (!validatePhone(loginForm.value.phone)) {
    ElMessage.warning('请输入正确的手机号')
    return
  }

  loading.value = true
  try {
    const success = authStore.login(loginForm.value.phone, loginForm.value.code)
    if (success) {
      ElMessage.success('登录成功')
      router.push('/orders')
    } else {
      ElMessage.error('验证码错误')
    }
  } finally {
    loading.value = false
  }
}
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">订单管理系统</h2>
      </template>
      
      <el-form @submit.prevent="handleLogin">
        <el-form-item>
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            maxlength="11"
            prefix-icon="Iphone"
          />
        </el-form-item>
        
        <el-form-item>
          <div class="verification-code">
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              maxlength="6"
              prefix-icon="Lock"
            />
            <el-button
              type="primary"
              :disabled="countdown > 0"
              @click="handleSendCode"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-tips">
<<<<<<< HEAD
        <p>请输入手机号获取验证码登录</p>
=======
        <p>测试手机号：13800138000</p>
        <p>测试验证码：123456</p>
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin: 0;
  color: #303133;
}

.verification-code {
  display: flex;
  gap: 10px;
}

.verification-code .el-input {
  flex: 1;
}

.verification-code .el-button {
  width: 120px;
}

.login-button {
  width: 100%;
}

.login-tips {
  margin-top: 20px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

.login-tips p {
  margin: 5px 0;
}
</style>
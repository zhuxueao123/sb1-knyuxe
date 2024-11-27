import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import Login from '../views/Login.vue'
import OrderDetail from '../views/OrderDetail.vue'
import OrderList from '../views/OrderList.vue'
import ShippingList from '../views/ShippingList.vue'
import VoucherList from '../views/VoucherList.vue'
=======
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetail from '../views/OrderDetail.vue'
import VoucherList from '../views/VoucherList.vue'
import ShippingList from '../views/ShippingList.vue'
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      redirect: '/orders',
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderList,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders/:id',
      name: 'order-detail',
      component: OrderDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/vouchers',
      name: 'vouchers',
      component: VoucherList,
      meta: { requiresAuth: true }
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: ShippingList,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
<<<<<<< HEAD
  // 检查 localStorage 中的 token
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
=======
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
>>>>>>> c83094987e260725bf426f8a6d87826c43583b5b
    next('/orders')
  } else {
    next()
  }
})

export default router
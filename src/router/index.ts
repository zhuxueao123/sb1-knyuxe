import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetail from '../views/OrderDetail.vue'
import VoucherList from '../views/VoucherList.vue'
import ShippingList from '../views/ShippingList.vue'

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
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/orders')
  } else {
    next()
  }
})

export default router
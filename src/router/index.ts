import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import OrderDetail from '../views/OrderDetail.vue'
import OrderList from '../views/OrderList.vue'
import ShippingList from '../views/ShippingList.vue'
import VoucherList from '../views/VoucherList.vue'

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
  // 检查 localStorage 中的 token
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/orders')
  } else {
    next()
  }
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: ProductView
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('../views/Error.vue')
    },
    {
      path: '/dash',
      name: 'Dash',
      component: () => import('../views/ShopDashboard.vue')
    }
  ]
})

export default router

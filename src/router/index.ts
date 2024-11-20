import IndexView from '@/views/Index.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cocktailIndex',
      component: IndexView
    },
    {
      path: '/:cocktail_code',
      name: 'cocktail',
      component: IndexView
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound,
      meta: {
        layout: 'error'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import IndexGame from '../views/IndexGame.vue'
import CommonModel from '@/components/page/commonModel/CommonModel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexGame,
      children: [
        {
          path: '/common-model',
          component: CommonModel
        },
        {
          path: '/challenge-model',
          component: () => import('@/components/page/challengeModel/ChallengeModel.vue')
        },
        {
          path: '/taste-model',
          component: () => import('@/components/page/tasteModel/TasteModel.vue')
        },
        {
          path: '/rank-model',
          component: () => import('@/components/page/rankModel/RankModel.vue')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

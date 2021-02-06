import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue';

const routes = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/communes'
      },
      {
        path: '/communes',
        name : 'Communes',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: '/departments',
        name : 'Department',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: '/regions',
        name : 'Region',
        component: () => import('@/views/Tab3.vue')
      },  
      {
        path: '/welcome',
        name : 'Welcome',
        component: () => import('@/views/Welcome.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/welcome'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

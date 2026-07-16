import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Mnu1000 from '@/views/Mnu1000.vue'
import Mnu1001 from '@/views/Mnu1001.vue'
import Dhb1010 from '@/views/Dhb1010.vue'
const Dhb1020 = () => import('@/views/Dhb1020.vue')
const Dhb1030 = () => import('@/views/Dhb1030.vue')
const Dhb1040 = () => import('@/views/Dhb1040.vue')
const Dhb1050 = () => import('@/views/Dhb1050.vue')


const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {path: '/mnu1000', name: 'Mnu1000', component: Mnu1000},
  {path: '/mnu1001', name: 'Mnu1001', component: Mnu1001},
  {path: '/dhb1010', name: 'Dhb1010',  component: Dhb1010},
  {path: '/dhb1020', name: 'Dhb1020',  component: Dhb1020},
  {path: '/dhb1030', name: 'Dhb1030',  component: Dhb1030},
  {path: '/dhb1040', name: 'Dhb1040',  component: Dhb1040},
  {path: '/dhb1050', name: 'Dhb1050',  component: Dhb1050}
]

const router = createRouter({
   history: createWebHistory(), routes
})

export default router

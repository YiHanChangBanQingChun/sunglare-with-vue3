import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/guan-yu',
    name: 'guan-yu',
    component: () => import(/* webpackChunkName: "guan-yu" */ '../views/AboutView.vue')
  },
  {
    path: '/xuan-guang-qing-kuang',
    name: 'xuan-guang-qing-kuang',
    component: () => import(/* webpackChunkName: "xuan-guang-qing-kuang" */ '../views/SunglareView.vue')
  },
  {
    path: '/lu-jing-gui-hua',
    name: 'lu-jing-gui-hua',
    component: () => import(/* webpackChunkName: "lu-jing-gui-hua" */ '../views/RouteplanningView.vue')
  },
  {
    path: '/deng-lu',
    name: 'deng-lu',
    component: () => import(/* webpackChunkName: "deng-lu" */ '../views/LoginView.vue')
  },
  {
    path: '/lu-jing-gui-hua/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "lu-jing-gui-hua-result" */ '../views/RouteresultView.vue')
  },
  {
    path: '/lu-jing-gui-hua/intermediate-page',
    name: 'intermediate-page',
    component: () => import(/* webpackChunkName: "lu-jing-gui-hua-intermediate-page" */ '../views/IntermediatepageView.vue')
  },
  {
    path: '/lu-jing-gui-hua/route',
    name: 'route',
    component: () => import(/* webpackChunkName: "lu-jing-gui-hua-route" */ '../views/RouteView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

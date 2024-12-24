import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ProjectOverview from '../views/AboutMarkdown/ProjectOverview.vue'
import TechStack from '../views/AboutMarkdown/TechStack.vue'
import ResearchStack from '../views/AboutMarkdown/ResearchStack.vue'
import Features from '../views/AboutMarkdown/Features.vue'
import Architecture from '../views/AboutMarkdown/Architecture.vue'
import Contactus from '../views/AboutMarkdown/Contactus.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "lu-jing-gui-hua" */ '../views/RouteplanningView.vue')
  },
  {
    path: '/AboutView',
    name: 'AboutView',
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
  },
  {
    path: '/lu-jing-gui-hua/routesw',
    name: 'routesw',
    component: () => import(/* webpackChunkName: "lu-jing-gui-hua-routesw" */ '../views/RouteViewsw.vue')
  },
  {
    path: '/yong-hu-zhong-xin',
    name: 'yong-hu-zhong-xin',
    component: () => import(/* webpackChunkName: "yong-hu-zhong-xin" */ '../views/UserView.vue')
  },
  {
    path: '/yong-hu-zhong-xin/shu-ju-guan-li',
    name: 'shu-ju-guan-li',
    component: () => import(/* webpackChunkName: "shu-ju-guan-li" */ '../views/DatamanagerView.vue')
  },
  {
    path: '/about',
    component: AboutView,
    children: [
      { path: '', redirect: 'project-overview' },
      { path: 'project-overview', component: ProjectOverview },
      { path: 'tech-stack', component: TechStack },
      { path: 'research-stack', component: ResearchStack },
      { path: 'features', component: Features },
      { path: 'architecture', component: Architecture },
      { path: 'contactus', component: Contactus }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/sunglare-with-vue3/' : '/'),
  routes
})

export default router

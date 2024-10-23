import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 引入store
// import BootstrapVue3 from 'bootstrap-vue-3'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(store)
app.use(router)
// app.use(BootstrapVue3)

// 挂载应用
app.mount('#app')

// 将 store 暴露到全局范围
window.store = store

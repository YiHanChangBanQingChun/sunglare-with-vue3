import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 引入store

const app = createApp(App)
app.use(store).use(router).mount('#app')

// 将 store 暴露到全局范围
window.store = store

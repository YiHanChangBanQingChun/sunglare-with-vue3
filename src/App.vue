<template>
  <div>
    <div class="biao-ti">
      <h1>太阳眩光查询与规划系统</h1>
    </div>
    <div class="gong-neng-lan">
      <nav>
        <h3><router-link to="/">主页</router-link></h3> |
        <h3><router-link to="/lu-jing-gui-hua">路径规划</router-link></h3>|
        <h3><router-link to="/xuan-guang-qing-kuang">眩光状况</router-link></h3>|
        <h3><router-link to="/guan-yu">关于</router-link></h3>|
        <h3>
          <router-link v-if="!isLoggedIn" to="/deng-lu">请登录</router-link>
          <router-link v-else to="/yong-hu-zhong-xin">个人中心</router-link>
        </h3>
        <div class="avatar1"></div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup () {
    const store = useStore()
    const isLoggedIn = computed(() => store.state.isLoggedIn)

    const handleLogout = () => {
      store.dispatch('logout')
      // 这里可以添加更多的逻辑，比如跳转到登录页面
    }

    return {
      isLoggedIn,
      handleLogout
    }
  }
}
</script>

<style>
.biao-ti {
  position: absolute; /* 绝对定位 */
  top:-1%; /* 顶部对齐 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 仅水平居中 */
}

.biao-ti h1 {
  display: inline-block; /* 使背景只在文字区域显示 */
  padding: 5px 5px; /* 添加内边距 */
  background: rgba(109, 72, 72, 0.65); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid rgba(255, 255, 255, 0.45); /* 添加边框 */
  border-radius: 5px; /* 添加圆角 */
  color: rgb(255, 255, 255); /* 修改为您想要的颜色 */
}

.gong-neng-lan {
  position: absolute; /* 绝对定位 */
  top: 2%; /* 顶部对齐 */
  right: 0; /* 靠右对齐 */
  display: flex; /* 启用Flex布局 */
  align-items: center; /* 垂直居中对齐 */
  background: rgba(109, 72, 72, 0.65); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid rgba(255, 255, 255, 0.45); /* 添加边框 */
  border-radius: 5px; /* 添加圆角 */
  padding: 5px 10px; /* 添加内边距 */
}

nav {
  display: flex; /* 启用Flex布局 */
  align-items: center; /* 垂直居中对齐 */
}

nav h3 {
  display: inline; /* 保持h3标签在一行显示 */
  margin: 0; /* 移除h3的默认外边距 */
  padding: 5px 5px; /* 添加内边距 */
}

nav a {
  font-weight: bold;
  color: rgb(255, 255, 255);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc; /* 这里可以设置默认头像的背景颜色 */
  background-size: cover; /* 使图片覆盖整个容器 */
  background-position: center; /* 使图片居中 */
  display: inline-block;
  margin-left: 10px;
}

body {
  background-color: #EEDBBB;
  /* background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%); */
}
</style>

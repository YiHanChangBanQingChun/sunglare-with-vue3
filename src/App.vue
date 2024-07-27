<template>
  <div id="zhuang-tai-lan">
    <div class="biao-ti">
      <h2>太阳眩光查询与规划系统</h2>
    </div>
    <div class="gong-neng-lan">
      <nav>
        <h4><router-link to="/">主页</router-link></h4> |
        <h4><router-link to="/lu-jing-gui-hua">路径规划</router-link></h4>|
        <h4><router-link to="/xuan-guang-qing-kuang">眩光状况</router-link></h4>|
        <h4><router-link to="/guan-yu">关于</router-link></h4>|
        <h4><router-link to="/deng-lu">登录</router-link></h4>
      </nav>
    </div>
  </div>
  <router-view/>
</template>

<style>
#zhuang-tai-lan {
  display: flex; /* 启用Flex布局 */
  justify-content: space-between; /* 两个容器分别靠左和靠右 */
  align-items: center; /* 垂直居中对齐 */
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%); /* 设置背景颜色 */
}

.title-container {
  flex: 1; /* 允许标题容器根据内容调整大小，但有最大宽度限制 */
  max-width: 300px; /* 标题容器的最大宽度 */
}

.nav-container {
  flex: 3; /* 功能链接容器占据剩余空间 */
  text-align: right; /* 功能链接靠右对齐 */
}

nav h4 {
  display: inline; /* 保持h4标签在一行显示 */
  margin: 0; /* 移除h4的默认外边距 */
}

nav a {
  font-weight: bold;
  color: rgb(53, 94, 90);
}

nav h1 {
  margin: 0;
  text-decoration-color: rgb(53, 94, 90)
}

.biao-ti h2 {
  color: rgb(53, 94, 90); /* 修改为您想要的颜色 */
}
body {
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
</style>

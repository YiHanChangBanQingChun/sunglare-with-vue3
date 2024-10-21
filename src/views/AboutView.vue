<template>
  <div class="about-md-container">
    <div class="sidebar">
      <h1>目录</h1>
      <ul>
        <li><router-link to="/about/project-overview">项目概览</router-link></li>
        <li><router-link to="/about/tech-stack">项目研究与开发的技术栈</router-link></li>
        <!-- <li><router-link to="/about/research-stack">项目研究的主要技术栈</router-link></li> -->
        <li><router-link to="/about/features">项目的主要功能</router-link></li>
        <li><router-link to="/about/architecture">项目的系统架构图</router-link></li>
        <li><router-link to="/about/contactus">联系我们</router-link></li>
      </ul>
    </div>
    <div class="about-md-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style>
body {
  background-image: url('~@/assets/bg3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  margin: 0;
  padding: 0;
}

.sidebar h1 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: rgba(112, 73, 73, 0.75);
}

.about-md-container {
  display: flex;
  height: 90vh;
  margin-top: 10vh;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar {
  width: 20%;
  background-color: rgba(255, 255, 255, 0.65); /* 半透明背景 */
  backdrop-filter: blur(55px); /* 磨砂玻璃效果 */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bold;
  color: rgba(112, 73, 73, 0.75);
}

.sidebar li:hover {
  text-decoration: underline;
  background-color: rgba(112, 73, 73, 0.1); /* 鼠标悬停时的背景颜色 */
}

.about-md-content {
  width: 80%;
  margin-left: 5%;
  background-color: rgba(255, 255, 255, 0.65); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 磨砂玻璃效果 */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.about-md-content img {
  max-width: 50vw;
  height: auto; /* 保持图片的纵横比 */
  display: block; /* 确保图片是块级元素 */
  margin: 0 0;
}

.image-container1 {
  display: block; /* 确保容器是块级元素 */
  width: 100%; /* 容器宽度与网页宽度相同 */
  text-align: left; /* 水平居中图片 */
  margin-bottom: 10px; /* 图片与下方内容的间距 */
  margin-top: 20px;
}
</style>

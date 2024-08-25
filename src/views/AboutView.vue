<template>
  <div class="guan-yu">
    <!-- <div class="text1">
    <h1>关于网页</h1>
    </div> -->
  </div>
  <body>
    <div class="xiang-mu-jie-shao-container">
      <div class="xiang-mu-jie-shao">
        <h2>项目概览：</h2>
        <ul>
          <li>本项目是一个基于Vue3架构开发的武汉市实时炫光状况的展示页面。</li>
          <li>项目的主要功能是展示武汉市实时炫光状况，目前用于实验调用面在地图上显示。</li>
          <li>项目单位：广州大学地理科学与遥感学院</li>
          <li class="image-container1"><img src="@/assets/p1.png" alt="项目介绍图片" /></li>
        </ul>
    </div>
      <div class="xiang-mu-jie-shao">
        <h2>项目开发的主要技术栈是：</h2>
        <ul>
          <li>Vue.js：项目的前端框架</li>
          <li>ArcGIS API for JavaScript：项目的地图展示框架</li>
          <li>Postgis：项目的后端数据库</li>
          <li>Echarts：项目的数据可视化框架</li>
          <li>Python Flask：项目的后端框架</li>
          <li class="image-container1"><img src="@/assets/kaifa1.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
      <div class="xiang-mu-jie-shao">
        <h2>项目研究的主要技术栈是：</h2>
        <ul>
          <li>Geopandas：项目的地理数据处理库</li>
          <li>Pillow：项目的图像处理库</li>
          <li>Mxnet：项目的深度学习库</li>
          <li class="image-container1"><img src="@/assets/yanjiu11.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
      <div class="xiang-mu-jie-shao">
        <h2>项目的主要功能包括：</h2>
        <ul>
          <li>基于实时眩光状况的路径规划——以武汉市为例</li>
          <li>武汉市眩光状况的可视化</li>
          <li class="image-container1"><img src="@/assets/sunshine.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
    </div>
    <div class="image-container1">
      <img src="@/assets/final2.png" alt="项目介绍图片" />
    </div>
  </body>
</template>

<script>
export default {
  name: 'AboutView'
}
window.onload = function () {
// 页面所有元素加载完成后的代码
}
</script>

<style>
body {
  background-image: url('~@/assets/bg3.jpg'); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed; /* 背景图片固定，不随页面滚动 */
  background-position: center center; /* 背景图片居中显示 */
  margin: 0;
  padding: 0;
}

.xiang-mu-jie-shao li {
  text-decoration: underline dotted gray; /* 灰色虚线下划线 */
}

.image-container1 {
  display: block; /* 确保容器是块级元素 */
  width: 100%; /* 容器宽度与网页宽度相同 */
  text-align: left; /* 水平居中图片 */
  margin-bottom: 10px; /* 图片与下方内容的间距 */
  margin-top: 20px;
}

.image-container1 img {
  width: 100%; /* 图片宽度充满容器 */
  height: 100%; /* 图片高度充满容器 */
  display: block; /* 图片为块级元素，宽度充满容器 */
}

.guan-yu > h1 {
  text-align: center;
  background: -webkit-linear-gradient(rgba(238,174,202,1), rgba(148,187,233,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.xiang-mu-jie-shao-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 定义两列 */
  grid-template-rows: auto auto; /* 定义两行，高度根据内容自动调整 */
  gap: 20px; /* 定义网格项之间的间隔 */
  padding: 20px; /* 容器内边距 */
  margin-top: 10vh; /* 向下移动20px，可以根据需要调整这个值 */
}

.xiang-mu-jie-shao {
  background-image: linear-gradient( #fce3688e, #33b5fc76); /* 渐变 */;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 15px; /* 添加圆角 */
  padding: 20px; /* 内边距 */
  text-align: left;/* 文本居中 */
  font-size: 20px;
  /*text-shadow: 2px 2px 4px rgb(250, 249, 249);*/
  color: rgba(112, 73, 73, 0.75); /* 设置字体颜色为白色 */
  font-weight: bold;
}

.text1 > h1 {
  text-align: center; /* 文本居中 */
  background: -webkit-linear-gradient(rgba(238,174,202,1), rgba(148,187,233,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* 对于非WebKit浏览器的兼容 */
}

.text1 {
  margin-top: 5px; /* 顶部外边距 */
  margin-bottom: 5px; /* 底部外边距 */
  background: rgba(109, 72, 72, 0.45);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 15px; /* 添加圆角 */
  padding: 20px; /* 内边距 */
  text-align: left /* 文本居中 */
}
</style>

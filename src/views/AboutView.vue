<template>
  <!-- 以下是重构前格式 -->
  <!-- <div class="guan-yu">
  </div>
  <body>
    <div class="xiang-mu-jie-shao-container">
      <div class="xiang-mu-jie-shao">
        <h2>项目概览：</h2>
        <ul>
          <li>本项目是一个基于Vue3与GeoScene架构开发，专注服务于驾驶场景的太阳眩光查询与优化系统。</li>
          <li>项目通过使用50米间隙的武汉市路网点信息，收集到约13万张街景点图片。</li>
          <li>使用深度学习语义分割的方法进行天空提取，并通过半球模型计算不同经纬不同时间的情况下，太阳在街景的位置来判断是否受到眩光。</li>
          <li>最后进行路径规划算法的实现与眩光信息图表展示的平台搭建。</li>
          <li>项目单位：广州大学地理科学与遥感学院</li>
          <li class="image-container1"><img src="@/assets/p1.png" alt="项目介绍图片" /></li>
        </ul>
    </div>
      <div class="xiang-mu-jie-shao">
        <h2>项目开发的主要技术栈是：</h2>
        <ul>
          <li>Vue.js：项目的前端框架</li>
          <li>GeoScene API for JavaScript：项目的地图展示框架</li>
          <li>PostgreSQL：项目的后端数据库</li>
          <li>Echarts：项目的数据可视化框架</li>
          <li>Python Flask：项目的后端框架</li>
          <li class="image-container1"><img src="@/assets/kaifa1.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
      <div class="xiang-mu-jie-shao">
        <h2>项目研究的主要技术栈是：</h2>
        <ul>
          <li>Geopandas,GeoScene Pro：项目的地理数据处理库与软件</li>
          <li>Pillow,cv2：项目的图像处理库</li>
          <li>Mxnet,gluonCV：项目的深度学习库</li>
          <li class="image-container1"><img src="@/assets/yanjiu11.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
      <div class="xiang-mu-jie-shao">
        <h2>项目的主要功能包括：</h2>
        <ul>
          <li>基于实时眩光状况的路径规划——以武汉市为例</li>
          <li>武汉市眩光状况的图表可视化</li>
          <li class="image-container1"><img src="@/assets/sunshine.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
    </div>
    <div class="xiang-mu-jie-shao-container-single">
      <div class="xiang-mu-jie-shao">
        <h2>项目的系统架构图：</h2>
        <ul>
          <li class="image-container1"><img src="@/assets/final2.png" alt="项目介绍图片" /></li>
        </ul>
      </div>
    </div>
  </body> -->
  <!-- 以下是重构后格式 -->
  <h2>目录</h2>
  <div class="about-md-container">
    <div class="sidebar">
      <ul>
        <li @click="currentView = 'ProjectOverview'">项目概览</li>
        <li @click="currentView = 'TechStack'">项目开发的主要技术栈</li>
        <li @click="currentView = 'ResearchStack'">项目研究的主要技术栈</li>
        <li @click="currentView = 'Features'">项目的主要功能</li>
        <li @click="currentView = 'Architecture'">项目的系统架构图</li>
      </ul>
    </div>
    <div class="about-md-content">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
// 以下是重构后代码
import ProjectOverview from './AboutMarkdown/ProjectOverview.vue'
import TechStack from './AboutMarkdown/TechStack.vue'
import ResearchStack from './AboutMarkdown/ResearchStack.vue'
import Features from './AboutMarkdown/Features.vue'
import Architecture from './AboutMarkdown/Architecture.vue'

export default {
  components: {
    ProjectOverview,
    TechStack,
    ResearchStack,
    Features,
    Architecture
  },
  data () {
    return {
      currentView: 'ProjectOverview'
    }
  }
}
window.onload = function () {
// 页面所有元素加载完成后的代码
}
</script>

<style>
/* 以下是重构前样式 */
/* body {
  background-image: url('~@/assets/bg3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  margin: 0;
  padding: 0;
}

.xiang-mu-jie-shao li {
  text-decoration: underline dotted gray;
}

.image-container1 {
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 20px;
}

.image-container1 img {
  width: 100%;
  height: 100%;
  display: block;
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  padding: 20px;
  margin-top: 10vh;
}

.xiang-mu-jie-shao-container-single {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  padding: 20px;
  margin-top: 0vh;
}

.xiang-mu-jie-shao {
  background-image: linear-gradient( #fce3688e, #33b5fc76);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border-radius: 10px;
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 15px;
  padding: 20px;
  text-align: left;
  font-size: 20px;
  color: rgba(112, 73, 73, 0.75);
  font-weight: bold;
}

.text1 > h1 {
  text-align: center;
  background: -webkit-linear-gradient(rgba(238,174,202,1), rgba(148,187,233,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
} */

/* 以下是重构后样式 */
body {
  background-image: url('~@/assets/bg3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  margin: 0;
  padding: 0;
}

.sidebar h2 {
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
  background-color: rgba(240, 240, 240, 0.8); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 磨砂玻璃效果 */
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
}

.about-md-content {
  width: 80%;
  margin-left: 5%;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
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

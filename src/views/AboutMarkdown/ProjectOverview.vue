<template>
  <div>
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
</template>

<script>
export default {
  name: 'ProjectOverview'
}
</script>

<style scoped>
/* 添加组件特定的样式 */
</style>

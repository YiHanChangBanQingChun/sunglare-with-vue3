<template>
  <div class="markdown-content" v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'ProjectOverview',
  data () {
    return {
      markdownContent: `
# 项目概览：📋
------
![项目介绍图片](${require('@/assets/image/about/p1.png')})
- 本项目是一个基于 Vue3 与 GeoScene 架构开发，专注服务于*驾驶场景*的太阳眩光查询与优化系统。🚗🌞
- 项目通过使用 50 米间隙的武汉市路网点信息，收集到约 13 万张街景点图片。📸
- 这 13 万张街景图片分布以及时间如下：🗓️
![街景图片时空分布](${require('@/assets/image/about/p2.png')})
- 使用深度学习语义分割的方法进行天空提取，并通过半球模型计算不同经纬、不同时间的情况下，太阳在街景的位置来判断是否受到眩光。🌐
![数据处理流程图](${require('@/assets/image/about/p4.png')})
  1. 我们使用了一个开源的 Python 扩展包 [pysolar](https://pysolar.readthedocs.io/en/latest/) 来估计在任何特定时间在研究区域的样本地点的太阳位置。☀️
![太阳位置计算](${require('@/assets/image/about/p8.png')})
  2. 由于研究区域的纬度不大于北 72°，因此不考虑大气反射的影响。[(NOAA 太阳位置计算器)](https://www.esrl.noaa.gov/gmd/grad/solcalc/azel.html) 🌍
  3. 使用的主要深度学习语义分割环境是 [Mxnet](https://mxnet.apache.org/versions/1.9.1/)、[gluonCV](https://cv.gluon.ai/)，其模型是 DeepLabV3_Cityscapes_101，这是一个使用 cityscapes 数据集预训练的 deeplabv3+ 模型，在深度学习语义分割中表现出色。💻
![深度学习语义分割](${require('@/assets/image/about/p5.png')})
  4. 半球模型建立以及街景图像转换为半球模型鱼眼图像的方法参考自 [X Li,et al.(2019)](https://www.sciencedirect.com/science/article/abs/pii/S0968090X18311252)。🔬
![半球模型建立](${require('@/assets/image/about/p3.png')})
- 最后进行 PostgreSQL 路径规划算法的实现与眩光信息图表展示的平台搭建。📊
      `
    }
  },
  computed: {
    compiledMarkdown () {
      const md = new MarkdownIt()
      return md.render(this.markdownContent)
    }
  }
}
</script>

<style scoped>
/* 添加组件特定的样式 */
.markdown-content img {
  width: 200px; /* 限制图片最大宽度为200px */
  height: auto; /* 保持图片的纵横比 */
}
</style>

<template>
  <!-- <div>
    <h2>项目概览：</h2>
    <ul>
      <li>本项目是一个基于Vue3与GeoScene架构开发，专注服务于驾驶场景的太阳眩光查询与优化系统。</li>
      <li>项目通过使用50米间隙的武汉市路网点信息，收集到约13万张街景点图片。</li>
      <li>使用深度学习语义分割的方法进行天空提取，并通过半球模型计算不同经纬不同时间的情况下，太阳在街景的位置来判断是否受到眩光。</li>
      <li>最后进行路径规划算法的实现与眩光信息图表展示的平台搭建。</li>
      <li>项目单位：广州大学地理科学与遥感学院</li>
      <li class="image-container1"><img src="@/assets/p1.png" alt="项目介绍图片" /></li>
    </ul>
  </div> -->
  <!-- <vue-markdown>
    # 项目概览：
    - 本项目是一个基于Vue3与GeoScene架构开发，专注服务于驾驶场景的太阳眩光查询与优化系统。
    - 项目通过使用50米间隙的武汉市路网点信息，收集到约13万张街景点图片。
    - 使用深度学习语义分割的方法进行天空提取，并通过半球模型计算不同经纬不同时间的情况下，太阳在街景的位置来判断是否受到眩光。
    - 最后进行路径规划算法的实现与眩光信息图表展示的平台搭建。
    - 项目单位：广州大学地理科学与遥感学院
    ![项目介绍图片](@/assets/p1.png)
  </vue-markdown> -->
  <div class="markdown-content" v-html="compiledMarkdown"></div>
</template>

<script>
// export default {
//   name: 'ProjectOverview'
// }
import MarkdownIt from 'markdown-it'

export default {
  name: 'ProjectOverview',
  data () {
    return {
      markdownContent: `
# 项目概览：
------
![项目介绍图片](${require('@/assets/p1.png')})
- 本项目是一个基于Vue3与GeoScene架构开发，专注服务于*驾驶场景*的太阳眩光查询与优化系统。
- 项目通过使用50米间隙的武汉市路网点信息，收集到约13万张街景点图片。
- 这13万张街景图片分布以及时间如下：
![街景图片时空分布](${require('@/assets/p2.png')})
- 使用深度学习语义分割的方法进行天空提取，并通过半球模型计算不同经纬、不同时间的情况下，太阳在街景的位置来判断是否受到眩光。
![数据处理流程图](${require('@/assets/p4.png')})
  1. 我们使用了一个开源的Python扩展包[pysolar](https://pysolar.readthedocs.io/en/latest/)来估计在任何特定时间在研究区域的样本地点的太阳位置。
![太阳位置计算](${require('@/assets/p8.png')})
  2. 由于研究区域的纬度不大于北72°，因此不考虑大气反射的影响。[(NOAA太阳位置计算器)](https://www.esrl.noaa.gov/gmd/grad/solcalc/azel.html).
  3. 使用的主要深度学习语义分割环境是[Mxnet](https://mxnet.apache.org/versions/1.9.1/),[gluonCV](https://cv.gluon.ai/)，其模型是DeepLabV3_Cityscapes_101，这是一个使用cityscapes数据集预训练的deeplabv3+模型，在深度学习语义分割中表现出色。
![深度学习语义分割](${require('@/assets/p5.png')})
  4. 半球模型建立以及街景图像转换为半球模型鱼眼图像的方法参考自[X Li,et al.(2019)](https://www.sciencedirect.com/science/article/abs/pii/S0968090X18311252)。
![半球模型建立](${require('@/assets/p3.png')})
- 最后进行PostgreSQL路径规划算法的实现与眩光信息图表展示的平台搭建。
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

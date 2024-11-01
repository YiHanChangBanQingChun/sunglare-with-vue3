<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'Features',
  data () {
    return {
      markdownContent: `
# 项目的主要功能包括：
------
- **结合太阳眩光因素的驾驶路径规划——以武汉市为例**
  - 规划速度快，平均四到五秒完成默认路径以及无眩光路径规划，然后进行前端可视化。
  - 功能齐全完善，不仅可以快捷交换起点终点，还可以可以进行地图的快速测量、信息查询、图层可视化切换、底图切换等。
  - 这些功能都基于Geoscene的API接口完善与丰富的功能。
  - 在未来，用户还可以保存常用路径，这有助于进一步提高体验。
![项目介绍图片](${require('@/assets/image/about/p6.png')})
- **武汉市眩光状况的图表可视化**
  - 通过对武汉市的街景图像进行深度学习语义分割，提取出天空部分，然后通过半球模型计算不同经纬不同时间的情况下，太阳在街景的位置来判断是否受到眩光。
  - 右侧使用Geoscene Web APP 快速搭建，可以实现更多分析功能，例如数据过滤，查询时空眩光分布信息，可以进行基础信息分析，分析区域眩光特点。性能强，多点展示兼容性高。
  - 左侧使用Echarts进行数据可视化，可以实现更多图表展示功能，例如眩光发生率查询，当日温度，太阳高度角方位角实时查询以及当日预测等。
![项目介绍图片](${require('@/assets/image/about/p7.png')})
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
</style>

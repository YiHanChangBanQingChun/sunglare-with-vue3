<template>
  <!-- <div>
    <h2>项目研究的主要技术栈是：</h2>
    <ul>
      <li>Geopandas,GeoScene Pro：项目的地理数据处理库与软件</li>
      <li>Pillow,cv2：项目的图像处理库</li>
      <li>Mxnet,gluonCV：项目的深度学习库</li>
      <li class="image-container1"><img src="@/assets/yanjiu11.png" alt="项目介绍图片" /></li>
    </ul>
  </div> -->
    <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'ResearchStack',
  data () {
    return {
      markdownContent: `
# 项目研究的主要技术栈是：
------
- Geopandas, GeoScene Pro：项目的地理数据处理库与软件
- Pillow, cv2：项目的图像处理库
- Mxnet, gluonCV：项目的深度学习库
![项目介绍图片](${require('@/assets/yanjiu11.png')})
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

<template>
  <!-- <div>
    <h2>项目的系统架构图：</h2>
    <ul>
      <li class="image-container1"><img src="@/assets/final2.png" alt="项目介绍图片" /></li>
    </ul>
  </div> -->
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'Architecture',
  data () {
    return {
      markdownContent: `
# 项目的系统架构图：
------
![项目介绍图片](${require('@/assets/final2.png')})
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

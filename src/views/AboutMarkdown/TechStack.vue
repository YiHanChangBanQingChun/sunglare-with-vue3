<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'TechStack',
  data () {
    return {
      markdownContent: `
# **项目研究与开发的技术栈是：** 🚀
------
- **深度学习环境:** 🧠
  - **Mxnet**：深度学习框架 🖥️
  - **gluonCV**：深度学习库 📚
  - **Linux**：深度学习环境平台 🐧
- **Vue.js**：项目的前端框架 🌐
  - **Vue Router**：路由管理 🛤️
  - **Vuex**：状态管理 📊
  - **Axios**：HTTP 请求 🌐
  - **Vue CLI**：项目构建 🛠️
  - **npm**：包管理 📦
- **Geoscene**：项目的地图展示、地理处理框架，数据处理软件 🗺️
  - **Geoscene API for JavaScript**：地图展示以及交互工具 🛠️
  - **Geoscene Online**：地图制作，地图托管，简易Web APP搭建 🌍
- **PostgreSQL**：项目的后端数据库 🗄️
  - **PostGIS**: 空间数据处理,空间索引,空间查询 🗺️
  - **pgrouting**：路径规划 🛤️
- **Echarts**：项目的数据可视化框架 📊
- **Python Flask**：项目的后端框架 🐍
  - **Flask-RESTful**：RESTful API 🌐
  - **Flask-CORS**：跨域 🌍
  - **Flask-Script**：命令行 💻
  - **Flask-Login**：用户认证 🔐
  - **Flask-Bcrypt**：密码哈希 🔑
  - **Flask-SQLAlchemy**：ORM（对象关系映射） 🗄️
  - **Psycopg2**：PostgreSQL 数据库适配器 🗄️
- **开发工具：** 🛠️
  - **ESLint**：代码质量 ✅
  - **GitHub**：版本管理 🗂️
  - **Nginx**：反向代理 🔄
  - **Visual Studio Code、Pycharm**：代码编辑器 📝
- **云服务：** ☁️
  - **阿里云 ECS**：云服务器 🖥️
![项目介绍图片](${require('@/assets/image/about/kaifa1.png')})
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

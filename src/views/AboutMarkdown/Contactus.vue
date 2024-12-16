<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'Contactus',
  data () {
    return {
      markdownContent: `
# 联系我们 📞

------
## 如果您有任何问题或建议，或者遇到了漏洞，请联系我们：
+ 项目单位：广州大学地理科学与遥感学院 🏫
+ 项目GitHub地址：[sun-glare-with-vue3](https://github.com/YiHanChangBanQingChun/sunglare-with-vue3) 🌐
+ 贡献者：[YiHanChangBanQingChun](https://github.com/YiHanChangBanQingChun) 👤、[5769812](https://github.com/5769812) 👤、[lxf-731](https://github.com/lxf-731) 👤
+ 邮箱：yihanchangbanqingchun@gmail.com ✉️

------
### *此项目为2024易智瑞杯中国大学生GIS软件开发竞赛·GIS应用开发组C913组作品。* 🏆
### *2024年11月6日，本项目在北京国际会展中心参与决赛，获得一等奖。* 🥇
### *感谢广州大学地理科学与遥感学院的支持以及岳瀚老师的指导！也感谢易智瑞公司提供的平台和机会！* 🙏
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

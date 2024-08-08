<template>
    <div class="yong-hu-zhong-xin">
      <div class="text">
        <!-- <h1>这是用户界面</h1> -->
        <p>用户名: {{ userInfo.username }}</p>
        <p>邮箱: {{ userInfo.email }}</p>
        <p>安全问题: {{ userInfo.security_question }}</p>
        <p>生日: {{ userInfo.birthday }}</p>
        <div class="button-div">
        <button @click="handleLogout">退出登录</button>
      </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'UserView',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  },
  methods: {
    ...mapActions(['logout']),
    async fetchUserInfo () {
      try {
        const response = await axios.get('http://localhost:5000/user_info', {
          params: { username: this.username }
        })
        this.userInfo = response.data
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },
    handleLogout () {
      this.logout()
      alert('退出成功')
      setTimeout(() => {
        this.$router.push({ name: 'home' })
      }, 3000)
    }
  },
  mounted () {
    this.fetchUserInfo()
  }
}

</script>

<style>
.yong-hu-zhong-xin {
display: flex;
flex-direction: column; /* 使子元素垂直排列 */
align-items: center; /* 水平居中对齐子元素 */
}

.text > h1 {
text-align: center; /* 文本居中 */
background: -webkit-linear-gradient(rgba(238,174,202,1), rgba(148,187,233,1));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
color: transparent; /* 对于非WebKit浏览器的兼容 */
}

.text {
margin-top: 5px; /* 顶部外边距 */
margin-bottom: 5px; /* 底部外边距 */
background: rgba(109, 72, 72, 0.45);
-webkit-backdrop-filter: blur(25px);
backdrop-filter: blur(25px);
border: 1px solid rgba(255,255,255,0.45);
border-radius: 15px; /* 添加圆角 */
padding: 20px; /* 内边距 */
text-align: left; /* 文本居中 */
margin-top: 10vh; /* 向下移动20px，可以根据需要调整这个值 */
}

/* 查询按钮的容器样式 */
.button {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  position: absolute; /* 绝对定位 */
  bottom: 10px; /* 与底部保持一定距离 */
  width: 100%; /* 宽度为父容器的100% */
}

/* 查询按钮样式 */
.button-div button {
  padding: 10px 20px; /* 按钮内边距 */
  background-color: #007bff; /* 按钮背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  margin-top: 10px; /* 在按钮之间添加一些间距 */
}

/* 鼠标悬停在按钮上时的样式 */
.button-div button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

/* 第一个按钮（重新选择）不需要顶部间距 */
.button-div button:first-child {
  margin-top: 0;
}

</style>

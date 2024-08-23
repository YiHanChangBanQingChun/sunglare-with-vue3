<template>
  <div class="yong-hu-zhong-xin">
    <div class="text">
      <div class="avatar-container">
        <img :src="userInfo.avatarUrl || require('@/assets/touxiang1.png')" alt="" class="avatar">
        <button class="avatar-change-button" @click="toggleAvatarModal">更换头像</button>
      </div>
      <!-- 用户信息显示 -->
      <p>用户名: {{ userInfo.username }}</p>
      <p>邮箱: {{ userInfo.email }}</p>
      <p>安全问题: {{ userInfo.security_question }}</p>
      <p>生日: {{ userInfo.birthday }}</p>
            <div class="button-div">
      <!-- 添加修改密码按钮 -->
      <button @click="showPasswordModal">修改密码</button>
      <!-- 退出登录按钮 -->
      <button @click="handleLogout">退出登录</button>
    </div>
    </div>
        <!-- 修改密码模态窗口 -->
        <div v-if="passwordModalVisible" class="modal-overlay">
        <div class="modal">
          <h2>修改密码</h2>
          <div class="form-group">
            <label for="currentPassword">当前密码：</label>
            <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" :class="{'invalid-input': passwordErrors.currentPassword}">
          </div>
          <div class="form-group">
            <label for="newPassword">新密码：</label>
            <input type="password" id="newPassword" v-model="passwordForm.newPassword" :class="{'invalid-input': passwordErrors.newPassword}">
          </div>
          <div class="form-group">
            <label for="confirmPassword">确认新密码：</label>
            <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" :class="{'invalid-input': passwordErrors.confirmPassword}">
          </div>
          <div class="button-group">
            <button @click="passwordModalVisible = false">取消</button>
            <button @click="handleSubmitPassword">提交</button>
          </div>
        </div>
      </div>
      <!-- 头像上传模态框 -->
      <div v-if="showAvatarModal" class="modal-overlay">
          <div class="avatar-modal">
            <div class="modal-content">
              <h2>请上传新头像</h2>
              <input type="file" @change="handleAvatarUpload" />
              <button class="avatar-change-button" @click="showAvatarModal = false">取消</button>
              <button class="avatar-change-button" @click="uploadAvatar">确认上传</button>
            </div>
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
      // 头像上传模态框控制
      showAvatarModal: false,
      // 用户信息，包括头像UR,
      userInfo: {
        avatarUrl: require('@/assets/touxiang1.png'), // 默认头像
        username: '', // 假设这些属性来自异步获取的用户信息
        email: '',
        security_question: '',
        birthday: ''
      },
      passwordModalVisible: false, // 控制修改密码模态窗口的显示
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 表单验证结果
      passwordErrors: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  },
  methods: {
    ...mapActions(['logout']),
    async fetchUserInfo () { // 修正：添加了分号
      try {
        const response = await axios.get('http://localhost:5000/user_info', {
          params: { username: this.username }
        })
        this.userInfo = response.data
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    },
    handleAvatarUpload (event) {
      const file = event.target.files[0]
      if (file) {
      // 这里可以添加代码来处理文件，例如使用FormData上传
      }
    },
    uploadAvatar () {
      // 这里添加上传头像的逻辑
      // 上传成功后，更新userInfo.avatarUrl
    },
    handleLogout () {
      this.logout()
      alert('退出成功')
      setTimeout(() => {
        this.$router.push({ name: 'home' })
      }, 3000)
    },
    toggleAvatarModal () {
      this.showAvatarModal = !this.showAvatarModal // 切换模态框的显示状态
    },
    showPasswordModal () {
      // 显示模态框
      this.passwordModalVisible = true
    },
    // 验证密码
    validatePassword () {
      // 这里可以添加密码验证逻辑，例如检查密码强度等
      // 如果有错误，设置错误信息
      // 例如：
      // if (this.passwordForm.newPassword.length < 8) {
      //   this.passwordErrors.newPassword = '密码长度至少为8位';
      // }
    },
    // 提交密码修改请求
    handleSubmitPassword () {
      this.validatePassword()
      // 检查是否有错误
      if (Object.values(this.passwordErrors).some(error => error)) {
        return // 如果有错误，不提交表单
      }
      // 发送请求到服务器
      axios.post('/api/change-password', {
        currentPassword: this.passwordForm.currentPassword,
        newPassword: this.passwordForm.newPassword
      })
        .then(response => {
        // 处理成功逻辑
          alert('密码修改成功！')
          this.passwordModalVisible = false
        })
        .catch(error => {
          // 处理失败逻辑
          console.error('密码修改失败:', error)
          alert('密码修改失败，请重试。')
        })
    }
  },
  mounted () {
    this.fetchUserInfo()
  }
}

</script>

<style>
body {
  background-image: url('~@/assets/bg4.jpg'); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed; /* 背景图片固定，不随页面滚动 */
  background-position: center center; /* 背景图片居中显示 */
}
.yong-hu-zhong-xin {
  display: flex;
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 水平居中对齐子元素 */
  justify-content: center; /* 垂直居中对齐子元素 */
  height: 100vh; /* 设置容器高度为视口的 100% */
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
background-image: linear-gradient( #fce3688e, #4dbdf976); /* 渐变 */
-webkit-backdrop-filter: blur(25px);
backdrop-filter: blur(25px);
border: 1px solid rgba(255,255,255,0.45);
border-radius: 15px; /* 添加圆角 */
padding: 20px; /* 内边距 */
text-align: left; /* 文本居中 */
margin-top: 10vh; /* 向下移动20px，可以根据需要调整这个值 */
width:30%;
}

.text p {
  background-color: transparent; /* 设置背景色为透明 */
  font-weight: bold;              /* 字体加粗 */
  color: #ffffff;                  /* 设置字体颜色，这里假设为白色，您可以根据需要调整 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1); /* 添加字体阴影效果 */
  border-top: 2px dashed #868686; /* 上边框为虚线 */
  border-right: none;            /* 右边框设置为无 */
  border-bottom: none; /* 下边框为虚线 */
  border-left: none;             /* 左边框设置为无 */
  padding: 10px 20px;             /* 设置按钮内边距 */
  border-radius: 0px;              /* 设置圆角边框 */
  cursor: pointer;                 /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease;      /* 平滑过渡效果 */
  margin: 0 10px;                 /* 设置按钮外边距，根据需要调整 */
  text-align: center;
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
  background-image: linear-gradient( #15d3f98e,  #fce3688e); /* 渐变 */;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1); /* 添加字体阴影效果 */
  color: white; /* 文字颜色 */
  border-color: rgba(134, 133, 133, 0.5); /* 去除边框 */
  border-radius: 10px; /* 圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  margin: 5px 0; /* 仅设置上下外边距，保证按钮垂直方向的间距一致 */
  width: 100%; /* 按钮宽度设为100%，确保按钮宽度一致 */
  font-size: 16px; /* 设置文字大小，您可以根据需要调整这个值 */
  font-weight: bold; /* 设置文字为加粗 */
}

/* 鼠标悬停在按钮上时的样式 */
.button-div button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

.button-div {
  display: flex;
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 水平居中对齐 */
  justify-content: center; /* 垂直居中对齐 */ }

.button-div :first-child{
  margin-left: 20px;
}
.avatar-container {
  display: flex;          /* 使用flex布局 */
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center;     /* 水平居中对齐 */
  margin-bottom: 20px;     /* 根据需要调整头像容器与下方内容的距离 */
}

.avatar-container img {
  margin-bottom: 10px; /* 头像与按钮之间的间距 */
}

.avatar-container button {
  margin-top: 10px; /* 按钮与头像之间的间距，可根据需要调整 */
}
/* 添加遮罩层的样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  z-index: 1000; /* 遮罩层的层级 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 模态框内容的样式 */
.avatar-modal {
  background-image: linear-gradient( #fce368d3, #33b5fc76); /* 渐变 */;
  padding: 20px; /* 内边距 */
  border-radius: 5px; /* 圆角边框 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影 */
  width: 100%; /* 宽度 */
  max-width: 500px; /* 最大宽度，根据需要调整 */
  position: relative; /* 模态框内容相对于遮罩层固定 */
  z-index: 1001; /* 模态框内容层级高于遮罩层 */
}

/* 媒体查询：根据屏幕尺寸调整模态框大小 */
@media (min-width: 768px) {
  .avatar-modal {
    width: 50%; /* 在大屏幕上宽度为视口宽度的一半 */
  }
}
.avatar {
  width: 150px;  /* 设置头像的宽度 */
  height: 150px; /* 设置头像的高度 */
}
.modal-content h2 {
  margin-bottom: 5px;
  color:rgb(255, 255, 255);
  font-size: 25px;         /* 增大字体大小 */
  font-weight: bold;        /* 字体加粗 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 给文字添加阴影效果 */
  text-align: center;
  padding-bottom: 25px;
}

.modal h2 {
  margin-bottom: 5px;
  color:rgb(255, 255, 255);
  font-size: 25px;         /* 增大字体大小 */
  font-weight: bold;        /* 字体加粗 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 给文字添加阴影效果 */
  text-align: center;
}
.button-div button:first-child {
  margin-right: 20px; /* 第一个按钮和第二个按钮之间的间距 */
}
.button-div button:last-child {
  background:linear-gradient( #fc706e,  #fce3688e); /* 第一个按钮和第二个按钮之间的间距 */
}
.button-div button:last-child:hover {
  background-color: #440101;}
/* 在模态框按钮组中为取消按钮添加右侧外边距 */
/* 在模态框按钮组中为确认上传按钮添加左侧外边距 */

.avatar-modal .modal-content {
  background-image: linear-gradient( #33b6fcee, #fce368d3); /* 渐变 */;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-content button{
  padding: 10px 20px; /* 确保所有按钮的内边距一致 */
  font-size: 16px; /* 统一字体大小 */
  line-height: 1.5; /* 统一行高，可以根据您的设计调整 */
  background-color: #57b6f6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px; /* 确保没有外边距影响垂直对齐 */
  /* 如果有图标，确保图标的大小和行高一致 */
}

.modal {
  background-image: linear-gradient( #33b6fcee, #fce368d3); /* 渐变 */;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  z-index: 1001;
}

.avatar-change-button {
  padding: 10px 20px; /* 内边距 */
  background-color: #fcbf4fb3; /* 背景颜色 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* 添加字体阴影效果 */
  color: white; /* 文字颜色 */
  border:  1px solid #7b7b7bb3; /* 无边框 */
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  margin: 10px 0; /* 按钮外边距，根据需要调整 */
  font-size: 14px; /* 设置文字大小，您可以根据需要调整这个值 */
  font-weight: bold; /* 设置文字为加粗 */
}
.avatar-change-button:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景颜色 */
}

.avatar-change-button:first-child {
  margin-right: 20px; /* 第一个按钮和第二个按钮之间的间距 */
}

.button-group button {
  padding: 10px 20px; /* 按钮内边距 */
  background-color: #57b6f6; /* 按钮背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  margin-top: 10px; /* 在按钮之间添加一些间距 */
}

/* 鼠标悬停在按钮上时的样式 */
.button-group button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

/* 第一个按钮（重新选择）不需要顶部间距 */
.button-group button:first-child {
  margin-top: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group label {
  margin-bottom: 5px;
  color:rgb(255, 255, 255);
}

.form-group input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.form-group input {
  padding: 10px 20px; /* 调整内边距以匹配按钮 */
  border-radius: 5px; /* 圆角边框，与按钮一致 */
  /* border: none; 去除边框 */
  background-color: #f0f0f0; /* 背景颜色，可以根据需要调整 */
  color: #333; /* 文字颜色，可以根据需要调整 */
  margin-bottom: 10px; /* 在输入框之间添加一些间距，可根据需要调整 */
  width: 90%;
}

.form-group input:focus {
  border-color: #007bff; /* 焦点时的边框颜色 */
  outline: none; /* 去除默认的焦点样式 */
  border-width: 2px; /* 边框粗细 */
}

.form-group input.invalid-input {
  border-color: red !important;
}

.form-group input.invalid-input:focus {
  border-color: red !important;
  outline: none;
  border-width: 2px;
}

.button-group button {
  padding: 10px 20px; /* 确保所有按钮的内边距一致 */
  font-size: 16px; /* 统一字体大小 */
  line-height: 1.5; /* 统一行高，可以根据您的设计调整 */
  background-color: #57b6f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0; /* 确保没有外边距影响垂直对齐 */
  /* 如果有图标，确保图标的大小和行高一致 */
}
.button-group {
  display: flex;
  justify-content: center; /* 水平居中按钮 */
  align-items: center; /* 垂直居中按钮，如果需要 */
  gap: 50px; /* 按钮之间的间距，根据需要调整 */
}
.button-group {
  margin-top: 20px; /* 根据需要调整间距 */
  /* 其他样式保持不变 */
}

</style>

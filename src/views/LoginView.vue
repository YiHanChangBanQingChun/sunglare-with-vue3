<template>
    <div class="deng-lu">
      <!-- <div class="text">
        <h1>欢迎登录</h1>
      </div> -->
      <div class="parent">
      <div class="login-container">
            <div class="login-box">
               <!-- 头像容器 -->
          <div class="avatar-container">
            <img :src="loggedInUser.avatarUrl || require('@/assets/touxiang.png')" alt="" class="avatar">
            <!-- 用户自定义头像按钮 -->
          </div>
          <!-- 头像上传模态框 -->
  <div v-if="showAvatarModal" class="avatar-modal">
    <div class="modal-content">
      <h2>上传头像</h2>
      <!-- 头像文件输入 -->
      <input type="file" @change="handleAvatarUpload" />
      <!-- 取消按钮 -->
      <button @click="closeAvatarUploadModal">取消</button>
      <!-- 确认上传按钮 -->
      <button @click="uploadAvatar">确认上传</button>
    </div>
  </div>
        <div class="form-container">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="loginUsername">
        </div>
      </div>
      <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="loginPassword">
      </div>
      <div class="login-button"><button @click="login">登  录</button>
      </div>
      <div class="button-group">
        <button @click="showRegisterModal = true">没有账号，注册一个？</button>
        <button @click="showResetPasswordModal = true">忘记密码？</button>
      </div>
      </div>
    </div>
  </div>
  </div>
    <!-- 忘记密码模态窗口 -->
  <div v-if="showResetPasswordModal" class="modal-overlay">
    <div class="modal">
      <h2>忘记密码</h2>
      <div class="reset-form-group">
        <label for="reset-password-answer">请输入您的安全问题的答案：</label>
        <input type="text" id="reset-password-answer" v-model="resetPasswordAnswer">
      </div>
      <div class="button-group">
        <button @click="showResetPasswordModal = false">取消</button>
        <button @click="submitResetPassword">提交</button>
      </div>
    </div>
  </div>
  <!-- 注册模态窗口 -->
  <div v-if="showRegisterModal" class="modal-overlay">
    <div class="modal">
      <h2>注册</h2>
      <div class="form-group">
        <label for="reg-username">用户名：</label>
        <input type="text" id="reg-username" v-model="username" :class="{'invalid-input': !isUsernameValid}">
        <span class="note">注意：用户名只能使用2到10字符数的中文、数字、英文三种组合。</span>
      </div>
      <div class="form-group">
        <label for="reg-password">密码：</label>
        <input type="password" id="reg-password" v-model="password" :class="{'invalid-input': !isPasswordValid}">
        <span class="note">注意：密码需要使用包含英文和数字的6到10字符数。</span>
      </div>
      <div class="form-group">
        <label for="reg-email">邮箱：</label>
        <input type="email" id="reg-email" v-model="email" :class="{'invalid-input': !isEmailValid}">
      </div>
      <div class="form-group">
        <label for="reg-security-question">安全问题：</label>
        <input type="text" id="reg-security-question" v-model="securityQuestion">
        <span class="note">注意：用于忘记密码时找回。</span>
      </div>
      <div class="form-group">
        <label for="reg-security-answer">回答：</label>
        <input type="text" id="reg-security-answer" v-model="securityAnswer">
      </div>
      <div class="form-group">
        <label for="reg-birthday">生日：</label>
        <input type="date" id="reg-birthday" v-model="birthday">
      </div>
      <div class="button-group">
        <button @click="showRegisterModal = false">取消</button>
        <button @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup () {
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const securityQuestion = ref('')
    const securityAnswer = ref('')
    const birthday = ref('')
    const loginUsername = ref('') // 你的用户名绑定
    const loginPassword = ref('') // 你的密码绑定
    const showRegisterModal = ref(false)
    const isUsernameValid = ref(true)
    const isPasswordValid = ref(true)
    const isEmailValid = ref(true)
    const store = useStore()
    const router = useRouter()

    // 添加新的状态来控制忘记密码模态框的显示和用户输入
    const showResetPasswordModal = ref(false)
    const resetPasswordAnswer = ref('')
    const securityQuestionText = ref('')

    // 定义 openResetPasswordModal 函数
    const openResetPasswordModal = () => {
      console.log('忘记密码按钮被点击')
      openResetPasswordModal.value = true
    }

    const submitResetPassword = async () => {
      if (!resetPasswordAnswer.value) {
        alert('请输入您的安全问题答案')
      }
    }
    const loggedInUser = computed(() => {
      const user = store.state.user || {} // 确保 user 是一个对象，即使是空对象
      return {
        ...user,
        avatarUrl: require('@/assets/touxiang.png')// 提供默认头像
      }
    })
    // 清空注册表单，注册时调用
    const clearRegisterForm = () => {
      username.value = ''
      password.value = ''
      email.value = ''
      securityQuestion.value = ''
      securityAnswer.value = ''
      birthday.value = ''
    }

    // 验证用户名
    const validateUsername = (username) => {
      if (username === '') {
        return true // 空字符串时不进行验证
      }
      const regex = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$/
      return regex.test(username)
    }

    const checkUsername = () => {
      isUsernameValid.value = validateUsername(username.value)
      console.log('Username valid:', isUsernameValid.value)
    }

    watch(username, checkUsername)

    // 验证密码
    const validatePassword = (password) => {
      if (password === '') {
        return true // 空字符串时不进行验证
      }
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/
      return regex.test(password)
    }

    const checkPassword = () => {
      isPasswordValid.value = validatePassword(password.value)
      console.log('Password valid:', isPasswordValid.value)
    }

    watch(password, checkPassword)

    // 验证邮箱
    const validateEmail = (email) => {
      if (email === '') {
        return true // 空字符串时不进行验证
      }
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    }

    const checkEmail = () => {
      isEmailValid.value = validateEmail(email.value)
      console.log('Email valid:', isEmailValid.value)
    }

    watch(email, checkEmail)

    // 注册
    const register = async () => {
      if (!username.value || !password.value || !email.value || !securityQuestion.value || !securityAnswer.value || !birthday.value) {
        alert('请填写所有字段')
        return
      }

      if (!isUsernameValid.value) {
        alert('用户名必须是2-10个字母、数字或汉字的组合')
        return
      }

      if (!isPasswordValid.value) {
        alert('密码必须是6-10个字符，并包含字母和数字')
        return
      }

      if (!isEmailValid.value) {
        alert('邮箱格式不正确')
        return
      }

      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            email: email.value,
            security_question: securityQuestion.value,
            security_answer: securityAnswer.value,
            birthday: birthday.value
          })
        })
        if (response.ok) {
          const data = await response.json()
          alert(data.message)
          showRegisterModal.value = false
          clearRegisterForm() // 清空注册表单
        } else if (response.status === 400) {
          const errorData = await response.json()
          if (errorData.message === 'Username already exists') {
            alert('用户名已存在，请重新输入')
          } else {
            alert(errorData.message) // 显示其他错误消息
          }
        } else {
          const errorData = await response.json()
          alert(errorData.message)
        }
      } catch (error) {
        console.error('注册请求失败:', error)
        clearRegisterForm() // 清空注册表单
        alert('注册请求失败，请稍后再试。')
      }
    }

    // 登录
    const login = async () => {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: loginUsername.value,
            password: loginPassword.value
          })
        })
        if (response.ok) {
          const data = await response.json()
          alert(data.message) // 弹窗提示登录成功
          // 更新Vuex Store
          store.dispatch('login', { username: loginUsername.value, avatarUrl: 'your-avatar-url' })
          console.log('登录成功:', data)
          console.log('当前登录状态:', store.state)
          // 这里可以添加更多的逻辑，比如跳转到另一个页面
          // 等待三秒后跳转到用户中心界面
          setTimeout(() => {
            router.push({ name: 'yong-hu-zhong-xin' })
          }, 3000)
        } else {
          const errorData = await response.json()
          alert(errorData.message) // 弹窗提示登录失败
        }
      } catch (error) {
        console.error('登录请求失败:', error)
        alert('登录请求失败，请稍后再试。')
      }
    }

    return {
      // 用户信息
      username,
      password,
      email,
      securityQuestion,
      securityAnswer,
      birthday,

      // 登录信息
      loginUsername,
      loginPassword,

      // 模态框控制
      showRegisterModal,

      // 验证方法
      validateUsername,
      checkUsername,

      // 注册方法
      register,
      clearRegisterForm,

      // 验证状态
      isUsernameValid,
      isEmailValid,
      isPasswordValid,

      // 登录方法
      login,

      // 登录用户信息
      loggedInUser,

      showResetPasswordModal,
      resetPasswordAnswer,
      securityQuestionText,
      openResetPasswordModal,
      submitResetPassword
    }
  }
}
</script>

<style>
body {
  background-image: url('~@/assets/bg2.jpg'); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
  background-attachment: fixed; /* 背景图片固定，不随页面滚动 */
  background-position: center center; /* 背景图片居中显示 */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/bg4.jpg'); /* 替换为你的图片路径 */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-image: radial-gradient(circle, #fce3688e, #33b5fc76); /* 渐变 */;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  padding: 20px;
  border-radius: 10px;
  width: 500px; /* 增加宽度 */
  max-width: 90%; /* 确保在小屏幕上不会过宽 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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
  text-align: left /* 文本居中 */
}

.login-container {
   display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-container {
  aspect-ratio: 1 / 1; /* 设置容器的长宽比为1:1 */
  display: flex; /* 使用flex布局使得图片能够居中 */
  justify-content: center; /* 水平居中图片 */
  align-items: center; /* 垂直居中图片 */
  width: 55%; /* 或者根据需要设置一个具体的宽度 */
  margin: auto; /* 如果需要，可以使容器在其父元素中居中 */
  margin-left: 0; /* 确保图片没有左边距 */
}

.image-container img {
  width: 100%; /* 图片宽度填满容器 */
  height: 100%; /* 图片高度填满容器 */
  object-fit: contain; /* 图片缩放以适应容器大小，保持原始长宽比 */
  max-width: 100%; /* 确保图片最大宽度不超过容器 */
  max-height: 100%; /* 确保图片最大高度不超过容器 */
  margin-left: 0; /* 确保图片没有左边距 */
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .image-container {
    width: 100%; /* 在较小屏幕上允许容器占据更多空间 */
  }

  .image-container img {
    max-width: 100%; /* 在较小屏幕上允许图片占据更多空间 */
    margin-left: 0; /* 确保图片没有左边距 */
  }
}

.login-box {
  width: 90%; /* 设置宽度为页面的三分之一 */
  max-width: 600px; /* 设置一个最大宽度以避免在大屏幕上过宽 */
  padding: 20px; /* 内边距，根据需要调整 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 子元素居中对齐 */
  background-image: linear-gradient( #fce3688e, #33b5fc76); /* 渐变 */;
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 15px; /* 添加圆角 */
  text-align: left; /* 文本左对齐 */
  margin: 10px auto; /* 水平居中，注意这里只影响左右方向 */
}

/* 增加以下样式到包裹.login-box的父元素 */
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 确保父容器至少为视窗高度 */
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
}

.form-group label {
  margin-bottom: 5px;
  color:rgb(255, 255, 255);
  font-size: 16px;         /* 增大字体大小 */
  font-weight: bold;        /* 字体加粗 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* 给文字添加阴影效果 */
}

.form-group input {
  padding: 8px;
  border-radius: 10px;
  border: 1.5px solid #a8a7a7;
}

button {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: rgb(44, 47, 50);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* 按钮之间的间隙 */
  margin-top: 20px; /* 按钮组与上方内容的间隙 */
}

.button-group button {
  background-color: #fdfcd45d; /* 设置背景色为透明 */
  font-weight: bold;              /* 字体加粗 */
  color: #ffffff;                  /* 设置字体颜色，这里假设为白色，您可以根据需要调整 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1); /* 添加字体阴影效果 */
  border: 1px solid transparent;  /* 设置边框为透明，如有需要可以设置边框颜色 */
  padding: 10px 20px;             /* 设置按钮内边距 */
  border-radius: 5px;              /* 设置圆角边框 */
  cursor: pointer;                 /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease;      /* 平滑过渡效果 */
  margin: 0 10px;                 /* 设置按钮外边距，根据需要调整 */
  font-size: 14px;
}

.button-group button:hover {
  background-color: rgba(234, 201, 69, 0.667); /* 鼠标悬浮时添加轻微的背景色 */
  color: #ffffff;                  /* 鼠标悬浮时的字体颜色 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* 鼠标悬浮时的字体阴影效果增强 */
}
.form-group input {
  padding: 10px 20px; /* 调整内边距以匹配按钮 */
  border-radius: 25px; /* 圆角边框，与按钮一致 */
  /* border: none; 去除边框 */
  background-color: #ffffff2d; /* 背景颜色，可以根据需要调整 */
  color: #333; /* 文字颜色，可以根据需要调整 */
  margin-bottom: 10px; /* 在输入框之间添加一些间距，可根据需要调整 */
  width: 90%;
}

/* 调整按钮样式以匹配提供的样式 */
button {
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
button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

.form-group input:focus {
  border-color: #007bff; /* 焦点时的边框颜色 */
  outline: none; /* 去除默认的焦点样式 */
  border-width: 2px; /* 边框粗细 */
}

.note {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  margin-top: 5px;
  font-style: italic;
}

.form-group input.invalid-input {
  border-color: red !important;
}

.form-group input.invalid-input:focus {
  border-color: red !important;
  outline: none;
  border-width: 2px;
}

.modal h2 {
  text-align: center;
  color: rgb(255, 255, 255); /* 设置文本颜色为白色 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* 给文字添加阴影效果 */
}

.avatar-container {
  display: flex;          /* 使用flex布局 */
  justify-content: center; /* 水平居中头像 */
  align-items: center;     /* 垂直居中头像 */
  /* 可以根据需要添加其他样式，如边距等 */
  margin-bottom: 20px;     /* 头像和下方内容的距离 */
}

/* 添加或更新头像图片的样式 */
.avatar {
  width: 100px;    /* 设置头像的宽度 */
  height: 100px;   /* 设置头像的高度，保持宽高比 */
  object-fit: cover;/* 确保图片覆盖整个区域，不被拉伸变形 */
  border-radius: 50%; /* 设置圆形头像 */
  border: 4px solid #fff; /* 添加白色边框，根据需要调整宽度和颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.login-button {
  display: flex;          /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  gap: 10px;              /* 如果有多个按钮或元素，设置间距 */
  text-align: center; /* 文本居中 */
  padding-top: 20px; /* 根据需要调整内边距 */
}

/* 按钮样式 */
.login-button button {
  width: 350px;
  padding: 15px 30px;      /* 增加内边距，使按钮变大 */
  font-size: 18px;         /* 增大字体大小 */
  font-weight: bold;        /* 字体加粗 */
  background-image: linear-gradient(45deg, #57b6f6, #f8a602); /* 45度角的线性渐变 */
  color: white;            /* 字体颜色 */
  border: none;            /* 去除边框 */
  border-radius: 25px;       /* 圆角边框 */
  cursor: pointer;          /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
}

/* 鼠标悬停在按钮上时的样式 */
.login-button button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

.reset-form-group{
  margin-bottom: 5px;
  color:rgb(255, 255, 255);
  font-size: 16px;         /* 增大字体大小 */
  font-weight: bold;        /* 字体加粗 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* 给文字添加阴影效果 */
}
.reset-form-group input{
  padding: 10px 20px; /* 调整内边距以匹配按钮 */
  border-radius: 25px; /* 圆角边框，与按钮一致 */
  /* border: none; 去除边框 */
  background-color: #ffffff2d; /* 背景颜色，可以根据需要调整 */
  color: #333; /* 文字颜色，可以根据需要调整 */
  margin-bottom: 10px; /* 在输入框之间添加一些间距，可根据需要调整 */
  margin-top: 30px;
  width: 90%;
}
</style>

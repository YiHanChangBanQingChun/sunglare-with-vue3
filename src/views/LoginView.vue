<template>
    <div class="deng-lu">
      <div class="text">
        <h1>This is a login page</h1>
      </div>
      <div class="login-container">
        <div class="image-container">
          <img src="/login.png" alt="Login Image">
        </div>
      <div class="login-box">
        <div class="form-container">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="loginUsername">
        </div>
      </div>
      <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginPassword">
      </div>
      <button @click="login">Login</button>
        <button @click="register">Register</button>
        <button @click="resetPassword">Forgot Password?</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// 数据库还没搭，先随便写个结构出来，flask的后端也还没做，估计不难
export default {
  setup () {
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const securityQuestion = ref('')
    const securityAnswer = ref('')
    const birthday = ref('')
    const loginUsername = ref('')
    const loginPassword = ref('')
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
          // 这里可以添加更多的逻辑，比如跳转到另一个页面
        } else {
          const errorData = await response.json()
          alert(errorData.message) // 弹窗提示登录失败
        }
      } catch (error) {
        console.error('登录请求失败:', error)
        alert('登录请求失败，请稍后再试。')
      }
    }

    const register = async () => {
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
          alert(data.message) // 弹窗提示注册成功
          // 这里可以添加更多的逻辑，比如跳转到登录页面
        } else {
          const errorData = await response.json()
          alert(errorData.message) // 弹窗提示注册失败
        }
      } catch (error) {
        console.error('注册请求失败:', error)
        alert('注册请求失败，请稍后再试。')
      }
    }

    return {
      username,
      password,
      email,
      securityQuestion,
      securityAnswer,
      birthday,
      loginUsername,
      loginPassword,
      login,
      register
    }
  }
}
</script>

<style>

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

.login-box{
  margin-top: 5px; /* 顶部外边距 */
  margin-bottom: 5px; /* 底部外边距 */
  background: rgba(109, 72, 72, 0.65);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 15px; /* 添加圆角 */
  padding: 20px; /* 内边距 */
  text-align: left /* 文本居中 */
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
}

.form-group label {
  margin-bottom: 5px;
  color:#ccc;
}

.form-group input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
}

.form-group input {
  padding: 10px 20px; /* 调整内边距以匹配按钮 */
  border-radius: 5px; /* 圆角边框，与按钮一致 */
  border: none; /* 去除边框 */
  background-color: #f0f0f0; /* 背景颜色，可以根据需要调整 */
  color: #333; /* 文字颜色，可以根据需要调整 */
  margin-bottom: 10px; /* 在输入框之间添加一些间距，可根据需要调整 */
  width: 90%;
}

/* 调整按钮样式以匹配提供的样式 */
button {
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
button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

.login-box {
  width: 33.33%; /* 设置宽度为页面的三分之一 */
  max-width: 400px; /* 设置一个最大宽度以避免在大屏幕上过宽 */
  margin: 0 auto; /* 水平居中 */
  padding: 20px; /* 内边距，根据需要调整 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 子元素居中对齐 */
}

</style>

<template>
  <div class="yong-hu-zhong-xin">
    <div class="left-panel">
      <div class="avatar-container">
        <img :src="previewAvatarUrl || avatarUrl" alt="" class="avatar">
      </div>
      <h2 class="welcome">欢迎,{{ userInfo.username }}</h2>
      <div class="button-div">
        <button @click="showSection('userInfo')">查看个人信息</button>
        <button @click="showSection('feedback')">用户反馈</button>
        <button @click="showSection('innerinformation')">站内消息</button>
        <button @click="showPasswordModal">修改密码</button>
        <button @click="toggleAvatarModal">更换头像</button>
        <button @click="gotodatamanager">后台数据管理</button>
        <button @click="handleLogout">退出登录</button>
      </div>
    </div>
    <div class="right-panel">
      <div v-if="currentSection === 'userInfo'" class="text">
        <div class="imagepalce-user">
        <ImageCarousel :images="images" />
      </div>
        <h1>用户信息</h1>
        <div class="info-item" v-for="field in fields" :key="field.name">
          <p>
            {{ field.label }}:
            <span v-if="editingField !== field.name">{{ userInfo[field.name] }}</span>
            <input v-else :type="field.type" v-model="editForm[field.name]" />
            <span v-if="tooltipVisible && tooltipField === field.name" class="tooltip">点击修改{{ field.label }}</span>
          </p>
          <button v-if="editingField !== field.name" @click="editField(field.name)">修改</button>
          <div v-else>
            <button @click="saveField(field.name)">确认</button>
            <button @click="cancelEdit">取消</button>
          </div>
        </div>
      </div>
      <div v-if="currentSection === 'feedback'" class="text feedback-form">
        <h1>用户反馈</h1>
        <textarea v-model="feedbackContent" class="feedback-textarea" placeholder="请输入您的反馈内容..."></textarea>
        <div class="button-group-feedback">
          <button @click="clearFeedback" class="btn btn-secondary">清除</button>
          <button @click="submitFeedback" class="feedback-button">提交反馈</button>
        </div>
      </div>
      <div v-if="currentSection === 'innerinformation'" class="text">
        <h1>站内消息</h1>
        <p>暂无消息</p>
    </div>
        <div v-if="passwordModalVisible" class="modal-overlay">
        <div class="modal">
          <h2>修改密码</h2>
          <div class="form-group-user">
            <label for="currentPassword">当前密码：</label>
            <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" @input="checkCurrentPassword" :class="{'invalid-input': passwordErrors.currentPassword}">
          </div>
          <div class="form-group-user">
            <label for="newPassword">新密码：</label>
            <input type="password" id="newPassword" v-model="passwordForm.newPassword" @input="validateNewPassword" :class="{'invalid-input': passwordErrors.newPassword}">
            <span class="note">注意：密码需要使用包含英文和数字的6到10字符数。</span>
          </div>
          <div class="form-group-user">
            <label for="confirmPassword">确认新密码：</label>
            <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" @input="validateConfirmPassword" :class="{'invalid-input': passwordErrors.confirmPassword}">
            <span class="note">注意：请输入和新密码相同的密码。</span>
          </div>
          <div class="button-group">
            <button @click="cancelPasswordChange">取消</button>
            <button @click="handleSubmitPassword">提交</button>
          </div>
        </div>
      </div>
    <div v-if="showAvatarModal" class="modal-overlay">
      <div class="avatar-modal">
        <div class="modal-content">
          <h2>请上传新头像</h2>
          <div class="avatar-preview">
            <img :src="previewAvatarUrl || avatarUrl" alt="预览头像" class="avatar-preview-img">
          </div>
          <input type="file" @change="handleAvatarUpload" />
          <div class="button-group">
            <button class="avatar-change-button" @click="showAvatarModal = false">取消</button>
            <button class="avatar-change-button" @click="uploadAvatar">确认上传</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import ImageCarousel from '@/components/ImageCarousel.vue'

export default {
  name: 'UserView',
  data () {
    return {
      // 头像上传模态框控制
      showAvatarModal: false,
      // 用户信息，包括头像UR,
      userInfo: {
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
      passwordErrors: {
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
      },
      isPasswordValid: false,
      avatarUrl: require('@/assets/image/avatar/touxiang1.png'), // 默认头像URL
      previewAvatarUrl: null, // 预览头像URL
      selectedFile: null, // 选中的文件
      editingField: null, // 当前正在编辑的字段
      editForm: {}, // 用于保存编辑的字段
      tooltipVisible: false, // 控制提示信息的显示
      tooltipField: '', // 当前显示提示信息的字段
      currentUsername: '',
      originalUsername: null, // 用于保存旧用户名
      currentSection: 'userInfo', // 当前显示的部分
      fields: [
        { name: 'username', label: '用户名', type: 'text' },
        { name: 'email', label: '邮箱', type: 'email' },
        { name: 'security_question', label: '安全问题', type: 'text' },
        { name: 'birthday', label: '生日', type: 'date' }
      ],
      feedbackContent: '', // 反馈内容
      images: [
        { src: require('@/assets/image/about/gzhubg.jpg'), caption: '', text: '' },
        { src: require('@/assets/image/about/gzhubg2.jpg'), caption: '', text: '' },
        { src: require('@/assets/image/about/gzhubg3.jpg'), caption: '', text: '' },
        { src: require('@/assets/image/about/gzhubg4.jpg'), caption: '', text: '' }
        // { src: require('@/assets/image3.jpg'), caption: '图片3', text: '描述3' }
      ]
    }
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  },
  components: {
    ImageCarousel
  },
  methods: {
    ...mapActions(['logout', 'updateUsername']),
    /**
     * Fetches user information from the API and updates the component state.
     *
     * This function makes an asynchronous request to the user information endpoint
     * using the current username. It updates the component's userInfo, originalUsername,
     * and avatarUrl properties based on the response. If an error occurs during the request,
     * it logs the error to the console.
     */
    async fetchUserInfo () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/user_info`, {
          params: { username: this.username } // Ensure the current username is used
        })
        this.userInfo = response.data
        this.originalUsername = this.userInfo.username // Save the initial username
        this.updateCurrentUsername(this.userInfo.username) // Update the current username
        if (this.userInfo.avatar) {
          this.avatarUrl = `${process.env.VUE_APP_API_URL}/api/avatar/${this.userInfo.avatar}` // Set the avatar URL if available
        }
      } catch (error) {
        console.error('Failed to fetch user information:', error) // Log the error if the request fails
      }
    },
    /**
     * Clear the feedback content.
     */
    clearFeedback () {
      this.feedbackContent = '' // Clear the feedback content
    },
    /**
     * Submit the feedback.
     * Sends a POST request to the API with the feedback content, username, and timestamp.
     */
    submitFeedback () {
      const feedbackContent = this.feedbackContent // Get the feedback content
      const username = this.username // Get the username
      const timestamp = new Date().toISOString() // Get the current timestamp

      axios.post(`${process.env.VUE_APP_API_URL}/api/submit_feedback`, {
        username,
        feedbackContent,
        timestamp
      })
        .then(response => {
          alert('Feedback submitted successfully, thank you for your feedback!') // Alert success message
        })
        .catch(error => {
          console.error('Feedback submission failed:', error) // Log the error
          alert('Feedback submission failed, please try again later.') // Alert failure message
        })
    },
    /**
     * Show the specified section.
     * @param {String} section - The section to be displayed.
     */
    showSection (section) {
      this.currentSection = section // Set the current section
    },
    /**
     * Update the current username.
     * @param {String} username - The new username.
     */
    updateCurrentUsername (username) {
      this.currentUsername = username // Update the current username
    },
    /**
     * Edit the specified field.
     * @param {String} field - The field to be edited.
     */
    editField (field) {
      this.editingField = field // Set the field being edited
      this.editForm[field] = this.userInfo[field] // Populate the edit form with the current field value
      if (field === 'username') {
        this.originalUsername = this.userInfo.username // Save the old username when editing the username
      }
    },
    cancelEdit () {
      this.editingField = null // Reset the editing field to null
    },
    /**
     * Save the specified field for the user.
     *
     * This function updates the user information by sending a POST request to the server.
     * Depending on the field being updated, it constructs the appropriate data payload.
     *
     * @param {string} field - The field to be saved (e.g., 'username', 'email', etc.).
     */
    async saveField (field) {
      try {
        const originalUsername = this.originalUsername || this.userInfo.username // Get the original username
        let updateData

        if (field === 'username') {
          updateData = {
            username: originalUsername, // Current username
            new_username: this.editForm.username // New username to be updated
          }
        } else {
          updateData = {
            username: originalUsername, // Current username
            [field]: this.editForm[field] // New value for the specified field
          }
        }

        await axios.post(`${process.env.VUE_APP_API_URL}/api/update_user_info`, updateData) // Send POST request to update user info
        this.userInfo[field] = this.editForm[field] // Update local userInfo with new value
        this.editingField = null // Reset editing field
      } catch (error) {
        console.error('Failed to update user information:', error) // Log error if update fails
      }
    },
    /**
     * Displays the tooltip with the specified field information.
     * @param {string} field - The field information to be displayed in the tooltip.
     */
    showTooltip (field) {
      this.tooltipVisible = true // Set tooltip visibility to true
      this.tooltipField = field // Set the tooltip field to the provided field
    },
    /**
     * Hides the tooltip and clears the field information.
     */
    hideTooltip () {
      this.tooltipVisible = false // Set tooltip visibility to false
      this.tooltipField = '' // Clear the tooltip field
    },
    /**
     * This method clears the current password, new password, and confirm password fields,
     * and resets the error states for each of these fields.
     */
    resetPasswordForm () {
      this.passwordForm.currentPassword = '' // Clear current password field
      this.passwordForm.newPassword = '' // Clear new password field
      this.passwordForm.confirmPassword = '' // Clear confirm password field
      this.passwordErrors.currentPassword = false // Reset current password error state
      this.passwordErrors.newPassword = false // Reset new password error state
      this.passwordErrors.confirmPassword = false // Reset confirm password error state
    },
    /**
     * Handle the upload of an avatar image.
     *
     * This function is triggered when a user selects a file to upload as their avatar.
     * It reads the selected file and generates a preview URL for the avatar image.
     *
     * @param {Event} event - The event object from the file input change event.
     */
    handleAvatarUpload (event) {
      const file = event.target.files[0] // Get the first selected file
      if (file) {
        this.selectedFile = file // Store the selected file
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewAvatarUrl = e.target.result // Set the preview URL to the file's data URL
        }
        reader.readAsDataURL(file) // Read the file as a data URL
      }
    },
    /**
     * Uploads the user's avatar to the server.
     *
     * This function checks if a file is selected, then creates a FormData object
     * containing the avatar file and the username. It sends a POST request to the
     * server to upload the avatar. Upon successful upload, it updates the avatar URL,
     * hides the avatar modal, and resets the selected file and preview URL. If the
     * upload fails, it logs an error message to the console.
     */
    uploadAvatar () {
      if (this.selectedFile) { // Check if a file is selected
        const formData = new FormData()
        formData.append('avatar', this.selectedFile) // Append the avatar file to formData
        formData.append('username', this.username) // Append the username to formData
        axios.post(`${process.env.VUE_APP_API_URL}/api/upload_avatar`, formData)
          .then(response => {
            this.avatarUrl = `${process.env.VUE_APP_API_URL}/api/avatar/${response.data.avatar}` // Update avatar URL
            this.showAvatarModal = false // Hide the avatar modal
            this.previewAvatarUrl = null // Reset the preview URL
            this.selectedFile = null // Reset the selected file
          })
          .catch(error => {
            console.error('Failed to upload avatar:', error) // Log error message
          })
      }
    },
    /**
     * Navigates to the data management page.
     */
    gotodatamanager () {
      this.$router.push({ name: 'shu-ju-guan-li' }) // Pushes the route named 'shu-ju-guan-li' to the router
    },
    /**
     * Handles user logout process.
     *
     * This function performs the following steps:
     * 1. Calls the `logout` method to log the user out.
     * 2. Displays an alert message indicating successful logout.
     * 3. Redirects the user to the 'lu-jing-gui-hua' route after a 1-second delay.
     */
    handleLogout () {
      this.logout() // Call the logout method
      alert('退出成功') // Show success message
      setTimeout(() => {
        this.$router.push({ name: 'lu-jing-gui-hua' }) // Redirect to 'lu-jing-gui-hua' route
      }, 1000) // Delay of 1 second
    },
    /**
     * Toggles the visibility state of the avatar modal.
     * This function switches the value of `showAvatarModal` between true and false,
     * effectively showing or hiding the avatar modal.
     */
    toggleAvatarModal () {
      this.showAvatarModal = !this.showAvatarModal // Toggle the visibility state of the modal
    },
    /**
     * Show the password modification modal
     */
    showPasswordModal () {
      // Display the modal
      this.passwordModalVisible = true
    },
    /**
     * Validates the new password based on specific criteria.
     * The password must be between 6 to 10 characters long and contain at least one letter and one number.
     * Updates the `passwordErrors.newPassword` property based on the validation result.
     */
    validateNewPassword () {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/ // Regular expression to validate password
      this.passwordErrors.newPassword = !regex.test(this.passwordForm.newPassword) // Update error state based on validation
    },
    /**
     * Validates that the confirm password matches the new password.
     * Updates the passwordErrors.confirmPassword property with the result.
     */
    validateConfirmPassword () {
      // Check if newPassword and confirmPassword are not the same
      this.passwordErrors.confirmPassword = this.passwordForm.newPassword !== this.passwordForm.confirmPassword
    },
    /**
     * Validates the current password by sending a POST request to the API.
     *
     * This function sends the username and current password to the API endpoint
     * specified in the environment variables. If the password is correct, it sets
     * the `currentPassword` error flag to false. If the password is incorrect, it
     * sets the `currentPassword` error flag to true and logs the error to the console.
     */
    checkCurrentPassword () {
      axios.post(`${process.env.VUE_APP_API_URL}/api/check_password`, {
        username: this.username, // Username to be validated
        currentPassword: this.passwordForm.currentPassword // Current password to be validated
      })
        .then(response => {
          this.passwordErrors.currentPassword = false // Password is correct
        })
        .catch(error => {
          console.error('Current password validation failed:', error) // Log error
          this.passwordErrors.currentPassword = true // Password is incorrect
        })
    },
    /**
     * Submits a password change request.
     *
     * This function validates the new password and confirm password fields.
     * If there are any validation errors, the form is not submitted.
     * If validation passes, it sends a request to the server to reset the password.
     * On success, it displays a success message, hides the password modal, and resets the form.
     * On failure, it logs the error, displays a failure message, and resets the form.
     */
    handleSubmitPassword () {
      this.validateNewPassword() // Validate the new password
      this.validateConfirmPassword() // Validate the confirm password
      // Check for errors
      if (Object.values(this.passwordErrors).some(error => error)) {
        return // If there are errors, do not submit the form
      }
      // Send request to the server
      axios.post(`${process.env.VUE_APP_API_URL}/api/reset_password`, {
        username: this.username,
        currentPassword: this.passwordForm.currentPassword,
        newPassword: this.passwordForm.newPassword
      })
        .then(response => {
          // Handle success logic
          alert('Password changed successfully!')
          this.passwordModalVisible = false
          this.resetPasswordForm()
        })
        .catch(error => {
          // Handle failure logic
          console.error('Password change failed:', error)
          alert('Password change failed, please try again.')
          this.resetPasswordForm()
        })
    },
    /**
     * Cancel the password change process.
     * This function hides the password modal and resets the password form.
     */
    cancelPasswordChange () {
      this.passwordModalVisible = false // Hide the password modal
      this.resetPasswordForm() // Reset the password form
    }
  },
  mounted () {
    this.fetchUserInfo()
  }
}

</script>

<style scoped>
.yong-hu-zhong-xin {
  display: flex;
  height: 88vh;
  margin-top: 10vh;
  background-image: url('~@/assets/image/background/bg4.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
}

/* 查询按钮的容器样式 */
.button {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  position: absolute; /* 绝对定位 */
  bottom: 10px; /* 与底部保持一定距离 */
  width: 100%; /* 宽度为父容器的100% */
}

.imagepalce-user {
  margin-bottom: 20px;
  width: 100%;
}

/* 查询按钮样式 */
.button-div button {
  padding: 10px 20px; /* 按钮内边距 */
  background-image: linear-gradient( #15d3f98e,  #fce3688e); /*渐变;*/
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
  background:linear-gradient( #fc706e,  #fce3688e);
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
  background-image: linear-gradient( #33b6fcee, #fce368d3);
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

.form-group-user {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group-user label {
  margin-bottom: 5px;
  color:rgb(255, 255, 255);
}

.form-group-user input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.form-group-user input {
  padding: 10px 20px; /* 调整内边距以匹配按钮 */
  border-radius: 5px; /* 圆角边框，与按钮一致 */
  /* border: none; 去除边框 */
  background-color: #f0f0f0; /* 背景颜色，可以根据需要调整 */
  color: #333; /* 文字颜色，可以根据需要调整 */
  margin-bottom: 10px; /* 在输入框之间添加一些间距，可根据需要调整 */
  width: 90%;
}

.form-group-user input:focus {
  border-color: #007bff; /* 焦点时的边框颜色 */
  outline: none; /* 去除默认的焦点样式 */
  border-width: 2px; /* 边框粗细 */
}

.form-group-user input.invalid-input {
  border-color: red !important;
}

.form-group-user input.invalid-input:focus {
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
  margin-top: 20px; /* 根据需要调整间距 */
}

.note {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  margin-top: 5px;
  font-style: italic;
}

.invalid-input {
  border: 1px solid red;
}

.avatar-preview {
  margin-top: 10px;
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.avatar-preview-img {
  max-width: 100%;
  max-height: 100%;
}

.tooltip {
  display: inline-block;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  position: absolute;
  z-index: 1000;
  font-size: 12px;
  margin-left: 10px;
}

.left-panel {
  width: 20%;
  background-color: rgba(255, 255, 255, 0.65); /* 半透明背景 */
  backdrop-filter: blur(55px); /* 磨砂玻璃效果 */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  margin-left: 20px; /* 调整左侧面板位置 */
}

.right-panel {
  width: 70%;
  padding: 20px;
  margin-left: 20px; /* 调整右侧面板位置 */
  margin-top: 0px;
  padding-top: 0px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-div button {
  padding: 10px 20px;
  background-image: linear-gradient(#15d3f98e, #fce3688e);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  color: white;
  border-color: rgba(134, 133, 133, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px 0;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
}

.button-div button:hover {
  background-color: #0056b3;
}

.text {
  background-color: rgba(255, 255, 255, 0.65); /* 半透明背景 */
  backdrop-filter: blur(25px); /* 磨砂玻璃效果 */
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 15px;
  padding: 20px;
  padding-bottom: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 使内容垂直排列 */
  flex-wrap: wrap; /* 允许内容换行 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-item p {
  margin: 0;
  flex: 1;
  font-size: 18px; /* 增加字体大小 */
}

.info-item button {
  padding: 10px 20px;
  background-image: linear-gradient(#15d3f98e, #fce3688e);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  color: white;
  border-color: rgba(134, 133, 133, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
}

.info-item button:hover {
  background-color: #0056b3;
}

.text.feedback-form {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.feedback-textarea {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  height: 50%;
  max-height: 60%;
  max-width: 95%;
  resize: both; /* 允许从右下角缩放 */
  overflow: auto; /* 确保内容溢出时显示滚动条 */
}

.text.feedback-form button {
  padding: 10px 20px;
  background-image: linear-gradient(#15d3f98e, #fce3688e);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  color: white;
  border-color: rgba(134, 133, 133, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
}

.button-group-feedback {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: auto;
  min-width: 40%;
  max-width: 50%;
  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
}

.text.feedback-form button {
  padding: 10px 20px;
  background-image: linear-gradient(#15d3f98e, #fce3688e);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  color: white;
  border-color: rgba(134, 133, 133, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
}

.text.feedback-form button:hover {
  background-color: #0056b3;
}

.welcome{
  margin:auto;
  text-align: center;
}

</style>

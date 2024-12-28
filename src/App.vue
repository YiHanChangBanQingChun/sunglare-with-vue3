<template>
  <div>
    <div class="biao-ti">
      <h1>太阳眩光查询与规划系统</h1>
    </div>
    <div class="gong-neng-lan">
      <nav>
        <h3 v-if="weatherInfo" @mouseover="showWeatherDetails" @mouseleave="hideWeatherDetails" @click="toggleWeatherDetails">
            <router-link to="">{{ greetingMessage }}</router-link>
        </h3>
        <div class="weather-info" @mouseover="showWeatherDetails" @mouseleave="hideWeatherDetails" @click="toggleWeatherDetails">
          <h3 v-if="weatherInfo">
            <img :src="currentWeatherIcon" alt="天气图标" class="weather-icon">
          </h3>|
        </div>
        <!--  <h3><router-link to="/">主页</router-link></h3> |-->
        <h3><router-link to="/lu-jing-gui-hua?BasemapLayer=tianditu-vector">路径规划</router-link></h3>|
        <h3><router-link to="/xuan-guang-qing-kuang">眩光状况</router-link></h3>|
        <h3><router-link to="/about/project-overview">关于</router-link></h3>|
        <h3>
          <router-link v-if="!isLoggedIn" to="/deng-lu">请登录</router-link>
          <router-link v-else to="/yong-hu-zhong-xin">个人中心</router-link>
        </h3>
        <div class="avatar1"></div>
      </nav>
    </div>
    <router-view/>
    <div :class="['weather-details', { show: showDetails }]">
        <table>
          <thead>
            <tr>
              <th>日期</th>
              <th>白天天气</th>
              <th>白天温度</th>
              <th>白天风向</th>
              <th>白天风力</th>
              <th>夜晚天气</th>
              <th>夜晚温度</th>
              <th>夜晚风向</th>
              <th>夜晚风力</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="forecast in weatherForecasts" :key="forecast.date">
              <td>{{ forecast.date }}</td>
              <!-- <td>{{ forecast.dayweather }}</td> -->
              <td><img :src="forecast.dayIcon" :alt="forecast.dayweather" class="weather-icon"></td>
              <td>{{ forecast.daytemp }}°C</td>
              <td>{{ forecast.daywind }}</td>
              <td>{{ forecast.daypower }}级</td>
              <!-- <td>{{ forecast.nightweather }}</td> -->
              <td><img :src="forecast.nightIcon" :alt="forecast.nightweather" class="weather-icon"></td>
              <td>{{ forecast.nighttemp }}°C</td>
              <td>{{ forecast.nightwind }}</td>
              <td>{{ forecast.nightpower }}级</td>
            </tr>
          </tbody>
        </table>
        <div class="app-cancel-icon-container">
          <img src="@/assets/image/map_icon/cancel_dark.png" alt="关闭" class="app-cancel-icon" @click="hideWeatherDetailsImmediately">
        </div>
      </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const weatherIconMap = {
  日出: require('@/assets/image/weather_icon/日出.png'),
  日落: require('@/assets/image/weather_icon/日落.png'),
  雪: require('@/assets/image/weather_icon/雪.png'),
  夜多云: require('@/assets/image/weather_icon/夜多云.png'),
  夜晴: require('@/assets/image/weather_icon/夜晴png.png'),
  小雨: require('@/assets/image/weather_icon/小雨.png'),
  多云: require('@/assets/image/weather_icon/多云.png'),
  雨: require('@/assets/image/weather_icon/雨.png'),
  尘: require('@/assets/image/weather_icon/尘png.png'),
  雷: require('@/assets/image/weather_icon/雷.png'),
  阴: require('@/assets/image/weather_icon/阴.png'),
  局部阵雪: require('@/assets/image/weather_icon/局部阵雪.png'),
  强雪雹交加: require('@/assets/image/weather_icon/强雪雹交加.png'),
  晴: require('@/assets/image/weather_icon/晴.png'),
  未知: require('@/assets/image/weather_icon/未知.png')
}

export default {
  name: 'App',
  data () {
    return {
      weatherInfo: null,
      currentWeather: '',
      currentWind: '',
      currentPower: '',
      currentWeatherIcon: '',
      showDetails: false,
      weatherForecasts: [],
      isDaytime: this.checkDaytime(),
      isClicked: false
    }
  },
  /**
   * Setup function for the App component.
   *
   * This function initializes the store and defines reactive properties and methods
   * for handling user authentication state and logout functionality.
   *
   * @returns {Object} - An object containing the reactive properties and methods.
   */
  setup () {
    const store = useStore() // Access the Vuex store
    const isLoggedIn = computed(() => store.state.isLoggedIn) // Reactive property for login state

    const handleLogout = () => {
      store.dispatch('logout') // Dispatch the logout action
    }
    return {
      isLoggedIn,
      handleLogout
    }
  },
  methods: {
    /**
     * Fetches weather information from the API and updates the weather forecasts and current weather.
     *
     * This function makes an asynchronous request to the weather API endpoint defined in the environment variables.
     * It processes the response to extract the weather forecast for the current day and the upcoming days.
     * The weather information is then stored in the component's state and the current weather is updated.
     *
     * @async
     * @function fetchWeatherInfo
     * @returns {Promise<void>} - A promise that resolves when the weather information has been successfully fetched and processed.
     * @throws {Error} - Throws an error if the API request fails.
     */
    // 获取天气信息
    async fetchWeatherInfo () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/get_weather`)
        const data = response.data
        const forecast = data.forecasts[0].casts[0] // 获取当天的天气信息
        this.weatherForecasts = data.forecasts[0].casts.map(cast => ({
          ...cast,
          dayIcon: this.getWeatherIcon(cast.dayweather),
          nightIcon: this.getWeatherIcon(cast.nightweather)
        })) // 获取未来几天的天气信息并添加图标路径
        this.weatherInfo = forecast
        this.updateCurrentWeather()
      } catch (error) {
        console.error('Error fetching weather information:', error)
      }
    },
    /**
     * Get the weather icon based on the weather description.
     *
     * @param {string} weather - The weather description.
     * @returns {string} - The path to the corresponding weather icon.
     */
    getWeatherIcon (weather) {
      if (weather.includes('雷')) { // If the weather description contains '雷' (thunder)
        return weatherIconMap['雷']
      } else if (weather.includes('雨')) { // If the weather description contains '雨' (rain)
        return weatherIconMap['雨']
      } else if (weather.includes('冰雹')) { // If the weather description contains '冰雹' (hail)
        return weatherIconMap['强雪雹交加']
      } else if (weather.includes('雪')) { // If the weather description contains '雪' (snow)
        return weatherIconMap['雪']
      } else if (weather.includes('晴')) { // If the weather description contains '晴' (sunny)
        return weatherIconMap['晴']
      } else if (weather.includes('多云')) { // If the weather description contains '多云' (cloudy)
        return weatherIconMap['多云']
      } else { // If the weather description does not match any of the above
        return weatherIconMap[weather] || require('@/assets/image/weather_icon/未知.png') // Return the corresponding icon or a default 'unknown' icon
      }
    },
    /**
     * Updates the current weather information based on the current time.
     * Determines whether it is daytime or nighttime and sets the weather, wind, and power accordingly.
     * Handles special cases for sunrise, sunset, and specific weather conditions to set the appropriate weather icon.
     */
    updateCurrentWeather () {
      const currentHour = new Date().getHours() // Get the current hour
      // const currentHour = 19 // Debug: Set a specific hour for testing
      const currentMinute = new Date().getMinutes() // Get the current minute
      const isDaytime = currentHour >= 6 && currentHour < 18 // Determine if it is daytime

      if (currentHour >= 6 && currentHour < 18) {
        // Daytime
        this.currentWeather = this.weatherInfo.dayweather // Set daytime weather
        // this.currentWeather = '多云' // Debug: Set specific weather for testing
        this.currentWind = this.weatherInfo.daywind // Set daytime wind
        this.currentPower = this.weatherInfo.daypower // Set daytime power
      } else {
        // Nighttime
        this.currentWeather = this.weatherInfo.nightweather // Set nighttime weather
        this.currentWind = this.weatherInfo.nightwind // Set nighttime wind
        this.currentPower = this.weatherInfo.nightpower // Set nighttime power
      }

      // Handle special cases for weather icons
      if (currentHour === 6 && currentMinute < 30) {
        this.currentWeatherIcon = weatherIconMap['日出'] // Set icon for sunrise
      } else if (currentHour === 17 && currentMinute >= 30) {
        this.currentWeatherIcon = weatherIconMap['日落'] // Set icon for sunset
      } else if (this.currentWeather.includes('雷')) {
        this.currentWeatherIcon = weatherIconMap['雷'] // Set icon for thunder
      } else if (this.currentWeather.includes('雨')) {
        this.currentWeatherIcon = weatherIconMap['雨'] // Set icon for rain
      } else if (this.currentWeather.includes('冰雹')) {
        this.currentWeatherIcon = weatherIconMap['强雪雹交加'] // Set icon for hail
      } else if (this.currentWeather.includes('雪')) {
        this.currentWeatherIcon = weatherIconMap['雪'] // Set icon for snow
      } else if (isDaytime && this.currentWeather.includes('晴')) {
        this.currentWeatherIcon = weatherIconMap['晴'] // Set icon for sunny day
      } else if (!isDaytime && this.currentWeather.includes('晴')) {
        this.currentWeatherIcon = weatherIconMap['夜晴'] // Set icon for clear night
      } else if (!isDaytime && this.currentWeather.includes('多云')) {
        this.currentWeatherIcon = weatherIconMap['夜多云'] // Set icon for cloudy night
      } else {
        this.currentWeatherIcon = weatherIconMap[this.currentWeather] || require('@/assets/image/weather_icon/未知.png') // Set default icon
      }
    },
    /**
     * Displays the weather details.
     * If the weather details have not been clicked, it sets the showDetails property to true.
     */
    // 显示天气详情
    showWeatherDetails () {
      // this.showDetails = true
      if (!this.isClicked) {
        this.showDetails = true
      }
    },
    /**
     * Hides the weather details.
     * If the element has not been clicked, it sets showDetails to false.
     */
    // 隐藏天气详情
    hideWeatherDetails () {
      // this.showDetails = false
      if (!this.isClicked) {
        this.showDetails = false
      }
    },
    /**
     * Toggles the visibility of weather details.
     *
     * This function switches the state of `isClicked` between true and false,
     * and sets `showDetails` to the current value of `isClicked`.
     */
    toggleWeatherDetails () {
      this.isClicked = !this.isClicked // Toggle the isClicked state
      this.showDetails = this.isClicked // Update showDetails based on isClicked state
    },
    /**
     * Hides the weather details immediately by setting the relevant flags to false.
     */
    hideWeatherDetailsImmediately () {
      this.isClicked = false // Set the clicked state to false
      this.showDetails = false // Hide the weather details
    },
    /**
     * Checks if the current time is during daytime.
     *
     * This function retrieves the current hour from the system's date and time,
     * and determines if it falls within the range of 6 AM to 6 PM.
     *
     * @returns {boolean} - Returns true if the current hour is between 6 AM and 6 PM, inclusive; otherwise, returns false.
     */
    checkDaytime () {
      const currentHour = new Date().getHours() // Get the current hour
      return currentHour >= 6 && currentHour < 18 // Check if the hour is between 6 AM and 6 PM
    }
  },
  computed: {
    /**
     * Generates a greeting message based on the current time of day and appends the current weather.
     *
     * @returns {string} The greeting message with the current weather.
     */
    greetingMessage () {
      const currentHour = new Date().getHours() // Get the current hour
      let greeting = ''

      if (currentHour >= 5 && currentHour < 8) {
        greeting = '清晨好，武汉市' // Early morning greeting
      } else if (currentHour >= 8 && currentHour < 12) {
        greeting = '早上好，武汉市' // Morning greeting
      } else if (currentHour >= 12 && currentHour < 14) {
        greeting = '中午好，武汉市' // Noon greeting
      } else if (currentHour >= 14 && currentHour < 18) {
        greeting = '下午好，武汉市' // Afternoon greeting
      } else if (currentHour >= 18 && currentHour < 20) {
        greeting = '傍晚好，武汉市' // Evening greeting
      } else if (currentHour >= 20 && currentHour < 23) {
        greeting = '晚上好，武汉市' // Night greeting
      } else {
        greeting = '深夜好，武汉市' // Late night greeting
      }

      return `${greeting}${this.currentWeather}` // Append the current weather to the greeting
    }
  },
  mounted () {
    this.fetchWeatherInfo()
  }
}
</script>

<style>
.biao-ti {
  position: absolute; /* 绝对定位 */
  top:-1%; /* 顶部对齐 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 仅水平居中 */
}

.biao-ti h1 {
  display: inline-block; /* 使背景只在文字区域显示 */
  padding: 5px 5px; /* 添加内边距 */
  background: rgba(255, 255, 255,0.5);
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
  border-radius: 10px; /* 添加圆角 */
  color: rgba(109, 72, 72, 0.65); /* 修改为您想要的颜色 */
}

.gong-neng-lan {
  position: absolute; /* 绝对定位 */
  top: 1.4%; /* 顶部对齐 */
  right: 5px; /* 靠右对齐 */
  display: flex; /* 启用Flex布局 */
  align-items: center; /* 垂直居中对齐 */
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
  border-radius: 10px; /* 添加圆角 */
  padding: 5px 10px; /* 添加内边距 */
  height: 5.6%;
}

nav {
  display: flex; /* 启用Flex布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 3px; /* 设置子元素之间的间距 */
  margin:auto;
}

nav h3 {
  display: inline; /* 保持h3标签在一行显示 */
  margin: 0; /* 移除h3的默认外边距 */
  padding: 5px 5px; /* 添加内边距 */
}

nav a {
  font-weight: bold;
  color: rgba(109, 72, 72, 0.65);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc; /* 这里可以设置默认头像的背景颜色 */
  background-size: cover; /* 使图片覆盖整个容器 */
  background-position: center; /* 使图片居中 */
  display: inline-block;
  margin-left: 10px;
}

.weather-info {
  display: flex; /* 启用Flex布局 */
  align-items: center; /* 垂直居中对齐 */
  margin-right: 10px; /* 调整右边距 */
  font-size: 16px;
  position: relative;
}

.weather-icon {
  width: 30px;
  height: 30px;
  padding: 0px;
  margin:0px;
}

.weather-details {
  position: fixed;
  top: 10%; /* 调整为合适的顶部位置 */
  left: 90%;
  transform: translateX(-90%); /* 水平居中 */
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 100000; /* 确保它在最上面 */
  margin-top: 10px; /* 与功能栏保持一定的距离 */
  white-space: nowrap; /* 确保所有文字在一行显示而不换行 */
  opacity: 0; /* 初始透明度为0 */
  visibility: hidden; /* 初始状态为隐藏 */
  transition: opacity 0.8s ease-in-out, visibility 0.6s ease-in-out; /* 添加过渡效果 */
}

.weather-details.show {
  opacity: 1; /* 鼠标悬停时透明度为1 */
  visibility: visible; /* 鼠标悬停时显示 */
}

.weather-details table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角 */
}

.weather-details th, .weather-details td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
  white-space: nowrap; /* 确保所有文字在一行显示而不换行 */
}

.weather-details th {
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.weather-details td {
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.weather-details .forecast-item {
  margin-bottom: 5px;
}

.forecast-item {
  margin-bottom: 5px;
}

body {
  background-color: #EEDBBB;
  /* background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%); */
}

.app-cancel-icon-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.app-cancel-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>

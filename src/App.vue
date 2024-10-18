<template>
  <div>
    <div class="biao-ti">
      <h1>太阳眩光查询与规划系统</h1>
    </div>
    <div class="gong-neng-lan">
      <nav>
        <h3 v-if="weatherInfo" @mouseover="showWeatherDetails" @mouseleave="hideWeatherDetails">
            <router-link to="">{{ greetingMessage }}</router-link>
        </h3>
        <div class="weather-info" @mouseover="showWeatherDetails" @mouseleave="hideWeatherDetails">
          <h3 v-if="weatherInfo">
            <img :src="currentWeatherIcon" alt="天气图标" class="weather-icon">
          </h3>|
        </div>
        <!--  <h3><router-link to="/">主页</router-link></h3> |-->
        <h3><router-link to="/lu-jing-gui-hua">路径规划</router-link></h3>|
        <h3><router-link to="/xuan-guang-qing-kuang">眩光状况</router-link></h3>|
        <h3><router-link to="/guan-yu">关于</router-link></h3>|
        <h3>
          <router-link v-if="!isLoggedIn" to="/deng-lu">请登录</router-link>
          <router-link v-else to="/yong-hu-zhong-xin">个人中心</router-link>
        </h3>
        <div class="avatar1"></div>
      </nav>
      <!-- <div v-if="showDetails" class="weather-details">
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
              <td>{{ forecast.dayweather }}</td>
              <td>{{ forecast.daytemp }}°C</td>
              <td>{{ forecast.daywind }}</td>
              <td>{{ forecast.daypower }}级</td>
              <td>{{ forecast.nightweather }}</td>
              <td>{{ forecast.nighttemp }}°C</td>
              <td>{{ forecast.nightwind }}</td>
              <td>{{ forecast.nightpower }}级</td>
            </tr>
          </tbody>
        </table>
      </div> -->
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
      </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const weatherIconMap = {
  日出: require('@/assets/weather_icon/日出.png'),
  日落: require('@/assets/weather_icon/日落.png'),
  雪: require('@/assets/weather_icon/雪.png'),
  夜多云: require('@/assets/weather_icon/夜多云.png'),
  夜晴: require('@/assets/weather_icon/夜晴.png'),
  小雨: require('@/assets/weather_icon/小雨.png'),
  多云: require('@/assets/weather_icon/多云.png'),
  雨: require('@/assets/weather_icon/雨.png'),
  尘: require('@/assets/weather_icon/尘.png'),
  雷: require('@/assets/weather_icon/雷.png'),
  阴: require('@/assets/weather_icon/阴.png'),
  局部阵雪: require('@/assets/weather_icon/局部阵雪.png'),
  强雪雹交加: require('@/assets/weather_icon/强雪雹交加.png'),
  晴: require('@/assets/weather_icon/晴.png'),
  未知: require('@/assets/weather_icon/未知.png')
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
      isDaytime: this.checkDaytime()
    }
  },
  setup () {
    const store = useStore()
    const isLoggedIn = computed(() => store.state.isLoggedIn)

    const handleLogout = () => {
      store.dispatch('logout')
    }
    return {
      isLoggedIn,
      handleLogout
    }
  },
  methods: {
    // 获取天气信息
    async fetchWeatherInfo () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/get_weather`)
        const data = response.data
        // console.log('Weather information:', data)
        const forecast = data.forecasts[0].casts[0] // 获取当天的天气信息
        this.weatherForecasts = data.forecasts[0].casts.map(cast => ({
          ...cast,
          dayIcon: this.getWeatherIcon(cast.dayweather),
          nightIcon: this.getWeatherIcon(cast.nightweather)
        })) // 获取未来几天的天气信息并添加图标路径
        this.weatherInfo = forecast
        this.updateCurrentWeather()
        console.log('Successfully fetched weather information:', this.weatherInfo)
      } catch (error) {
        console.error('Error fetching weather information:', error)
      }
    },
    // 获取天气图标
    getWeatherIcon (weather) {
      if (weather.includes('雷')) {
        return weatherIconMap['雷']
      } else if (weather.includes('雨')) {
        return weatherIconMap['雨']
      } else if (weather.includes('冰雹')) {
        return weatherIconMap['强雪雹交加']
      } else if (weather.includes('雪')) {
        return weatherIconMap['雪']
      } else if (weather.includes('晴')) {
        return weatherIconMap['晴']
      } else if (weather.includes('多云')) {
        return weatherIconMap['多云']
      } else {
        return weatherIconMap[weather] || require('@/assets/weather_icon/未知.png')
      }
    },
    // 更新当前天气
    updateCurrentWeather () {
      const currentHour = new Date().getHours()
      // 调试
      // const currentHour = 19
      const currentMinute = new Date().getMinutes()
      const isDaytime = currentHour >= 6 && currentHour < 18

      if (currentHour >= 6 && currentHour < 18) {
        // 白天
        this.currentWeather = this.weatherInfo.dayweather
        // 调试
        // this.currentWeather = '多云'
        this.currentWind = this.weatherInfo.daywind
        this.currentPower = this.weatherInfo.daypower
      } else {
        // 夜晚
        this.currentWeather = this.weatherInfo.nightweather
        this.currentWind = this.weatherInfo.nightwind
        this.currentPower = this.weatherInfo.nightpower
      }
      // 特殊情况处理
      if (currentHour === 6 && currentMinute < 30) {
        this.currentWeatherIcon = weatherIconMap['日出']
      } else if (currentHour === 17 && currentMinute >= 30) {
        this.currentWeatherIcon = weatherIconMap['日落']
      } else if (this.currentWeather.includes('雷')) {
        this.currentWeatherIcon = weatherIconMap['雷']
      } else if (this.currentWeather.includes('雨')) {
        this.currentWeatherIcon = weatherIconMap['雨']
      } else if (this.currentWeather.includes('冰雹')) {
        this.currentWeatherIcon = weatherIconMap['强雪雹交加']
      } else if (this.currentWeather.includes('雪')) {
        this.currentWeatherIcon = weatherIconMap['雪']
      } else if (isDaytime && this.currentWeather.includes('晴')) {
        this.currentWeatherIcon = weatherIconMap['晴']
      } else if (!isDaytime && this.currentWeather.includes('晴')) {
        this.currentWeatherIcon = weatherIconMap['夜晴']
      } else if (!isDaytime && this.currentWeather.includes('多云')) {
        this.currentWeatherIcon = weatherIconMap['夜多云']
      } else {
        this.currentWeatherIcon = weatherIconMap[this.currentWeather] || require('@/assets/weather_icon/未知.png')
      }
    },
    // 显示天气详情
    showWeatherDetails () {
      this.showDetails = true
    },
    // 隐藏天气详情
    hideWeatherDetails () {
      this.showDetails = false
    },
    checkDaytime () {
      const currentHour = new Date().getHours()
      return currentHour >= 6 && currentHour < 18
    }
  },
  computed: {
    greetingMessage () {
      const currentHour = new Date().getHours()
      let greeting = ''

      if (currentHour >= 5 && currentHour < 8) {
        greeting = '清晨好，武汉市'
      } else if (currentHour >= 8 && currentHour < 12) {
        greeting = '早上好，武汉市'
      } else if (currentHour >= 12 && currentHour < 14) {
        greeting = '中午好，武汉市'
      } else if (currentHour >= 14 && currentHour < 18) {
        greeting = '下午好，武汉市'
      } else if (currentHour >= 18 && currentHour < 20) {
        greeting = '傍晚好，武汉市'
      } else if (currentHour >= 20 && currentHour < 23) {
        greeting = '晚上好，武汉市'
      } else {
        greeting = '深夜好，武汉市'
      }

      return `${greeting}${this.currentWeather}`
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
  background: rgb(255, 255, 255); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid rgba(255, 255, 255, 0.45); /* 添加边框 */
  border-radius: 5px; /* 添加圆角 */
  color: rgba(109, 72, 72, 0.65); /* 修改为您想要的颜色 */
}

.gong-neng-lan {
  position: absolute; /* 绝对定位 */
  top: 2%; /* 顶部对齐 */
  right: 0; /* 靠右对齐 */
  display: flex; /* 启用Flex布局 */
  align-items: center; /* 垂直居中对齐 */
  background: rgb(255, 255, 255); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid rgba(255, 255, 255, 0.45); /* 添加边框 */
  border-radius: 5px; /* 添加圆角 */
  padding: 5px 10px; /* 添加内边距 */
  height: 5%;
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
  left: 80%;
  transform: translateX(-50%); /* 水平居中 */
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
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
}

.weather-details th, .weather-details td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
  white-space: nowrap; /* 确保所有文字在一行显示而不换行 */
}

.weather-details th {
  background-color: #f9f9f9; /* 添加表头背景颜色 */
}

.weather-details td {
  background-color: #fff; /* 添加单元格背景颜色 */
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

</style>

<template>
  <!-- 输入了起点和终点之后,还没有摁查询路径的画面 -->
  <div class="lu-jing-gui-hua">
    <!-- 搜索框 -->
    <!-- 外层容器 -->
    <div class="search-containers">
      <!-- 交换的侧边栏 -->
      <div class="revert-containers">
        <div class="car"><img src='@/assets/car.png'></div>
        <div class="swap-action">
          <!-- 绑定 swap 方法到点击事件 -->
          <button @click="swap" title="切换起终点">
            <img :src="require('@/assets/revert_new.png')" alt="" class="revert">
          </button>
        </div>
      </div>
      <!-- 搜索起点的容器 -->
      <div class="search-container start">
        <!-- 图片 -->
        <div class="search-icon-wrapper">
          <img src='@/assets/pink-circle.png' alt="pink">
        </div>
        <!-- 输入框 -->
        <input type="text" v-model="searchQueryStart" @input="onSearchInputChange($event, true)" placeholder="请输入起点" class="search-box search-box-start"/>
        <!-- 搜索框内部的删除图片 -->
        <span class="search-box-img">
          <div class="delete" title="清空" @click="clc1">
            <img src='@/assets/cancel.png' alt="delete1">
          </div>
        </span>
        <!-- 起点搜索结果展示 -->
        <div class="search-results" v-if="searchResults.length && searchQueryStart" ref="searchResultsStart">
    <ul>
      <li v-for="(result, index) in searchResults" :key="index" :class="{ 'highlighted': index === highlightedIndex }" @click="selectResult(result, true)">
        {{ result.name }}
      </li>
        </ul>
        </div>
    </div>
      <!-- 搜索终点的容器 -->
      <div class="search-container end">
        <!-- 图片容器 -->
        <div class="search-icon-wrapper">
          <img src='@/assets/green-circle.png' alt="green">
        </div>
        <!-- 输入框 -->
        <input type="text" v-model="searchQueryEnd" @input="onSearchInputChange($event, false)" placeholder="请输入终点" class="search-box search-box-end"/>
         <!-- 搜索框内部的删除图片 -->
        <span class="search-box-img">
          <div class="delete" title="清空" @click="clc2">
            <img src='@/assets/cancel.png' alt="delete1">
          </div>
        </span>
        <!-- 终点搜索结果展示 -->
        <div class="search-results" v-if="searchResultsEnd.length && searchQueryEnd" ref="searchResultsEnd">
    <ul>
      <li v-for="(result, index) in searchResultsEnd" :key="index" :class="{ 'highlighted': index === highlightedIndex }" @click="selectResult(result, false)">
        {{ result.name }}
      </li>
          </ul>
        </div>
      </div>
      <div class="search-action" @click="onSearch" title="搜索">
        <img :src="require('@/assets/search.png')" alt="" class="search">
      </div>
    <!-- 新的覆盖层容器 -->
    <div v-if="isLoading" class="loader-overlay">
      <div class="loader">
      </div>
    </div>
    </div>
  </div>
  <!-- 地图展示 -->
  <div id="viewDiv"></div>
  <div v-if="ismaploading" class="maploader-overlay">
    <div class="maploader">
    </div>
  </div>
  <!-- 时间选择框和路径展示框 -->
  <div class="main-container">
    <!-- 时间选择框 -->
    <div class="choose-time">
      <div class="form-group">
        <label for="date-input">选择日期：</label>
        <input id="date-input" type="date" v-model="selectedDate" :min="minDate" :max="maxDate" :class="{ 'invalid-date': isDateDisabled(selectedDate) }" @change="handleDateChange">
        <label for="time-input">选择时间：</label>
        <input id="time-input" type="time" v-model="formattedTime" @input="onTimeInputChange" step="600"> <!-- 600秒 = 10分钟 -->
      </div>
    </div>
    <div>
   <!-- 路线展示 -->
   <transition name="fade">
      <div class="routelist" v-show="isRouteListVisible">
        <ul class="cardlist">
          <div class="route" data-index="1" @click="highlightRoute('noGlareRouteId')">
            <div class="introduction" :style="{ color: getColor(1) }">无眩光路径</div>
            <p class="intro">
              <span>用时：{{totalHours}}小时{{totalMinutes}}分钟</span> |
              <!-- <span></span> -->
              <span>路长：{{totalDistance}}</span>
              <!-- <span></span> -->
            </p>
            <p class="intro">
              <span>途径：{{totalPass }}</span>
              <!-- <span></span> -->
            </p>
          </div>
          <div class="route" data-index="0" @click="highlightRoute('defaultRouteId')">
            <div class="introduction" :style="{ color: getColor(0) }">常规路径</div>
            <p class="intro">
              <span>用时：{{noGlareTotalHours}}小时{{noGlareTotalMinutes}}分钟</span> |
              <!-- <span></span> -->
              <span>路长：{{noGlareTotalDistance}}</span>
              <!-- <span></span> -->
            </p>
            <p class="intro">
              <span>途径：{{noGlareTotalPass}}</span>
              <!-- <span></span> -->
            </p>
          </div>
        </ul>
        <span class="toggle-button" @click="toggleRouteList" title="隐藏">
          <img src='@/assets/cancel.png' alt="delete1">
        </span>
      </div>
    </transition>
    <button v-if="!isRouteListVisible" @click="toggleRouteList" class="open-button">展开路线结果</button>
  </div>
  </div>
</template>

<script>
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js'
import Graphic from '@geoscene/core/Graphic'
import Point from '@geoscene/core/geometry/Point.js'
import GraphicsLayer from '@geoscene/core/layers/GraphicsLayer'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer'
import Extent from '@geoscene/core/geometry/Extent'
import axios from 'axios'
import { nextTick, markRaw } from 'vue'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery.js'
import Compass from '@geoscene/core/widgets/Compass.js'
import ScaleBar from '@geoscene/core/widgets/ScaleBar.js'
import DistanceMeasurement2D from '@geoscene/core/widgets/DistanceMeasurement2D.js'
import LayerList from '@geoscene/core/widgets/LayerList.js'

export default {
  name: 'RouteView',
  data () {
    return {
      searchQueryStart: '',
      searchQueryEnd: '',
      selectedResultStart: null,
      selectedResultEnd: null,
      searchResults: [],
      searchResultsEnd: [],
      isLoading: false,
      ismaploading: false,
      totalHours: 0,
      totalMinutes: 0,
      totalDistance: '0千米',
      selectedDate: '', // 用户选择的日期
      selectedTime: '', // 用户选择的时间
      noGlareTotalHours: 0, // 无眩光路径的总时长（小时）
      noGlareTotalMinutes: 0, // 无眩光路径的总时长（分钟）
      highlightedIndex: -1, // 高亮的搜索结果索引
      noGlareTotalDistance: '0千米', // 无眩光路径的总距离
      highlightedRouteId: null, // 当前高亮显示的路径ID
      routeLayers: {}, // 存储路径的FeatureLayer实例
      // 闪烁路径的相关数据
      blinkingTimers: {}, // 存储每条路径的闪烁定时器 ID
      highlightedColor: [0, 123, 255, 1], // 浅蓝色，完全不透明
      highlightedBlinkColor: [0, 123, 255, 0.2], // 浅蓝色，半透明
      noGlareColor: [244, 96, 108], // 无眩光路径为红色
      defaultColor: [25, 202, 173], // 常规路径为绿色
      noGlareRouteId: 'noGlareRouteId',
      defaultRouteId: 'defaultRouteId',
      isRouteListVisible: true, // 路线列表是否可见
      totalPass: '',
      noGlareTotalPass: '',
      BasemapName: null
    }
  },
  // 在组件挂载时初始化地图
  mounted () {
    // this.parseUrlParams()
    this.created()
    this.initMap()
    if (this.$route.query.start && this.$route.query.end) {
      this.selectedResultStart = JSON.parse(this.$route.query.start)
      this.selectedResultEnd = JSON.parse(this.$route.query.end)
    }
    this.parseUrlParams()
    // 设置定时器，每隔1分钟更新时间
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  computed: {
    minDate () {
      return '2024-01-01'
    },
    maxDate () {
      return '2024-12-31'
    },
    formattedTime () {
      // 格式化时间为10分钟间隔
      if (!this.selectedTime) return ''
      const [hours, minutes] = this.selectedTime.split(':').map(Number)
      const roundedMinutes = Math.floor(minutes / 10) * 10
      return `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`
    }
  },
  methods: {
    toggleRouteList () {
      this.isRouteListVisible = !this.isRouteListVisible
    },
    // 获取颜色
    getColor (index) {
      if (index === 0) {
        return 'rgb(25, 202, 173)' // 绿色，耗时少路径
      } else if (index === 1) {
        return 'rgb(244, 96, 108)' // 红色，无眩光路径
      }
      return 'black' // 默认颜色
    },

    // 绘制路径
    highlightRoute (routeId) {
      // console.log('用户点击了路径:', routeId)
      routeId = routeId === 'defaultRouteId' ? 'noGlareRouteId' : 'defaultRouteId'
      // 如果之前有高亮的路径且不是当前点击的路径，重置其样式
      if (this.highlightedRouteId && this.highlightedRouteId !== routeId) {
        this.resetRouteStyle(this.highlightedRouteId)
      }

      // 如果当前点击的路径已经在闪烁中，先停止闪烁
      if (this.blinkingTimers[routeId]) {
        clearInterval(this.blinkingTimers[routeId])
        delete this.blinkingTimers[routeId]
        this.resetRouteStyle(routeId)
      }

      // 只更新被点击的路径的渲染器样式
      const layer = this.routeLayers[routeId]
      if (layer) {
        const color = this.highlightedColor
        const newRenderer = {
          type: 'simple',
          title: '路径',
          symbol: {
            type: 'simple-line',
            color: color,
            width: 5
          }
        }
        layer.renderer = newRenderer
      }

      // 更新高亮路径 ID
      this.highlightedRouteId = routeId
      // 启动闪烁效果
      this.startBlinking(routeId)
    },

    // 开始闪烁
    startBlinking (routeId) {
      const layer = this.routeLayers[routeId]
      if (!layer) return

      let isBlinkOn = false
      const originalColor = routeId === this.noGlareRouteId ? this.noGlareColor : this.defaultColor

      // 每隔300毫秒切换一次透明度
      const intervalId = setInterval(() => {
        isBlinkOn = !isBlinkOn
        const color = isBlinkOn ? this.highlightedColor : this.highlightedBlinkColor

        // 更新渲染器以实现闪烁效果
        const newRenderer = {
          type: 'simple',
          title: '路径',
          symbol: {
            type: 'simple-line',
            color: color,
            width: 4.5
          }
        }
        layer.renderer = newRenderer
      }, 300)

      // 存储定时器 ID
      this.blinkingTimers[routeId] = intervalId

      // 三秒后停止闪烁并恢复原始颜色
      setTimeout(() => {
        clearInterval(this.blinkingTimers[routeId])
        delete this.blinkingTimers[routeId]

        // 恢复原始颜色
        const finalRenderer = {
          type: 'simple',
          title: '路径',
          symbol: {
            type: 'simple-line',
            color: this.highlightedColor, // 固定为完全不透明的浅蓝色
            width: 4.5
          }
        }
        layer.renderer = finalRenderer

        // 三秒后恢复为原始颜色
        setTimeout(() => {
          this.resetRouteStyle(routeId, originalColor)
        }, 3000)
      }, 3000) // 闪烁三秒
    },
    resetRouteStyle (routeId, originalColor = null) {
      // 清除任何现有的闪烁定时器
      if (this.blinkingTimers[routeId]) {
        clearInterval(this.blinkingTimers[routeId])
        delete this.blinkingTimers[routeId]
      }

      // 重置路径样式为原始颜色或默认颜色
      const layer = this.routeLayers[routeId]
      if (layer) {
        const isNoGlare = routeId === this.noGlareRouteId
        // const color = (isNoGlare ? this.noGlareColor : this.defaultColor)
        const color = (isNoGlare ? this.defaultColor : this.noGlareColor)
        const newRenderer = {
          type: 'simple',
          title: '路径',
          symbol: {
            type: 'simple-line',
            color: color,
            width: isNoGlare ? 4.5 : 3
          }
        }
        layer.renderer = newRenderer
      }
    },
    // 绘制路径
    onTimeInputChange (event) {
      const value = event.target.value
      const [hours, minutes] = value.split(':').map(Number)
      const roundedMinutes = Math.floor(minutes / 10) * 10
      this.selectedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`
    },
    // 判断日期是否可用
    isDateDisabled (date) {
      if (!date) return false
      const selected = new Date(date)
      const month = selected.getMonth() + 1 // 月份从0开始
      const day = selected.getDate()
      if (month >= 1 && month <= 7 && day !== 15) {
        return true
      }
      if (month === 8 && day <= 25) {
        return true
      }
      if ((month === 10 || month === 12) && day !== 15) {
        return true
      }
      if (month === 11 && day >= 9) {
        return true
      }
      return false
    },
    // 处理日期变化
    handleDateChange (event) {
      const date = event.target.value
      if (this.isDateDisabled(date)) {
        // alert('选择的日期未进行模拟，请选择其他日期。可选日期为，1-7月的15日，8月20日-9月30日，10-12月的15日。')
        alert('抱歉，选择的日期未进行模拟，请选择其他日期。可选日期为，9月1日-9月30日，11月1日到9日，以及其他月份的15日.')
        this.selectedDate = ''
      }
    },
    // 处理键盘事件
    handleKeydown (event) {
      if (this.searchResults.length && this.searchQueryStart) {
        switch (event.key) {
          case 'Escape':
            this.searchResults = []
            break
          case 'Tab':
            event.preventDefault()
            this.highlightedIndex = (this.highlightedIndex + 1) % this.searchResults.length
            nextTick(() => {
              const highlightedElement = this.$refs.searchResultsStart.querySelector('li.highlighted')
              if (highlightedElement) {
                highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
              }
            })
            break
          case 'Enter':
            if (this.highlightedIndex >= 0 && this.highlightedIndex < this.searchResults.length) {
              this.selectResult(this.searchResults[this.highlightedIndex], true)
            }
            break
        }
      } else if (this.searchResultsEnd.length && this.searchQueryEnd) {
        switch (event.key) {
          case 'Escape':
            this.searchResultsEnd = []
            break
          case 'Tab':
            event.preventDefault()
            this.highlightedIndex = (this.highlightedIndex + 1) % this.searchResultsEnd.length
            nextTick(() => {
              const highlightedElement = this.$refs.searchResultsEnd.querySelector('li.highlighted')
              if (highlightedElement) {
                highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
              }
            })
            break
          case 'Enter':
            if (this.highlightedIndex >= 0 && this.highlightedIndex < this.searchResultsEnd.length) {
              this.selectResult(this.searchResultsEnd[this.highlightedIndex], false)
            }
            break
        }
      }
    },
    // 更新时间，日期
    updateTime () {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      // 只有当 selectedTime 是当前时间时，才更新
      if (!this.isTimeFromUrl || this.selectedTime === currentTime) {
        this.selectedTime = currentTime
        this.isTimeFromUrl = false // 重置标志位
      }
    },
    // 清空搜索框
    clc1 () {
      // 清空搜索框1
      this.searchQueryStart = ''
    },
    // 清空搜索框2
    clc2 () {
      this.searchQueryEnd = ''
    },
    // 交换起点和终点
    swap () {
      this.isSwapping = true // 设置标志位
      // 交换 searchQueryStart 和 searchQueryEnd
      const tempQuery = this.searchQueryStart
      this.searchQueryStart = this.searchQueryEnd
      this.searchQueryEnd = tempQuery
      // 交换 selectedResultStart 和 selectedResultEnd
      const tempResult = this.selectedResultStart
      this.selectedResultStart = this.selectedResultEnd
      this.selectedResultEnd = tempResult
      // 调用 onSearch 方法重新查询路径
      this.onSearch().then(() => {
        this.parseUrlParams()
        this.initMap()
        // 确保在交换操作完成后，更新搜索框的值
        this.searchQueryStart = this.selectedResultStart.name
        this.searchQueryEnd = this.selectedResultEnd.name
        this.isSwapping = false // 重置标志位
      }).catch(() => {
        this.isSwapping = false // 确保在错误情况下也重置标志位
      })
    },
    // 解析URL参数
    parseUrlParams () {
      const urlParams = new URLSearchParams(window.location.search)
      const startParam = urlParams.get('start')
      const endParam = urlParams.get('end')
      const dateParam = urlParams.get('date')
      const timeParam = urlParams.get('time')
      const defaultRouteIdParam = urlParams.get('default_id')
      const timeBasedRouteIdParam = urlParams.get('time_based_id')
      if (startParam) {
        try {
          const startObj = JSON.parse(decodeURIComponent(startParam))
          if (startObj && startObj.address) {
            this.searchQueryStart = startObj.name
          }
        } catch (e) {
          console.error('Error parsing start parameter:', e)
        }
      }
      if (endParam) { // 如果有终点参数，进行解析
        try {
          const endObj = JSON.parse(decodeURIComponent(endParam))
          if (endObj && endObj.address) {
            this.searchQueryEnd = endObj.name // 绑定终点查询字符串
          }
        } catch (e) {
          console.error('Error parsing end parameter:', e)
        }
      }
      // 如果有日期参数，进行解析
      if (dateParam) {
        this.selectedDate = dateParam
      }
      // 如果有时间参数，进行解析
      if (timeParam) {
        this.selectedTime = timeParam
        this.isTimeFromUrl = true // 设置标志位
      }
      // 如果有默认路径ID参数，进行解析
      if (defaultRouteIdParam) {
        this.defaultRouteId = defaultRouteIdParam
      }
      // 如果有基于时间的路径ID参数，进行解析
      if (timeBasedRouteIdParam) {
        this.timeBasedRouteId = timeBasedRouteIdParam
      }

      // 如果有底图参数，进行解析
      this.created()
    },
    // 处理搜索框输入变化事件
    onSearchInputChange (event, isStart) {
      const query = event.target.value
      const searchResultsField = isStart ? 'searchResults' : 'searchResultsEnd'
      if (query.includes("'")) {
        console.log('输入法临时输入，不发送请求')
        return
      }
      if (query.length >= 2) {
        fetch(`${process.env.VUE_APP_API_URL}/api/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ searchQueryStart: query })
        })
          .then(response => response.json())
          .then(data => {
            this[searchResultsField] = data
          })
          .catch((error) => {
            console.error('错误:', error)
          })
      } else {
        this[searchResultsField] = []
      }
    },
    // 处理选择搜索结果事件
    selectResult (result, isStart = true) {
      console.log('用户选择了搜索结果:', result)
      const simplifiedResult = {
        name: result.name,
        address: result.address,
        wgs84_latitude: result.wgs84_latitude,
        wgs84_longitude: result.wgs84_longitude,
        location: [result.wgs84_longitude, result.wgs84_latitude],
        baidu_index: result.baidu_index,
        baidu_latitude: result.baidu_latitude,
        baidu_longitude: result.baidu_longitude,
        id: result.id,
        label: result.label
      }
      // 获取当前的起点和终点信息
      let currentStart = this.selectedResultStart ? JSON.stringify(this.selectedResultStart) : null
      let currentEnd = this.selectedResultEnd ? JSON.stringify(this.selectedResultEnd) : null
      // 根据isStart参数选择起点或终点
      if (isStart) {
        this.selectedResultStart = simplifiedResult
        this.searchQueryStart = simplifiedResult.name
        this.searchResults = []
        currentStart = JSON.stringify(simplifiedResult)
      } else {
        this.selectedResultEnd = simplifiedResult
        this.searchQueryEnd = simplifiedResult.name
        this.searchResultsEnd = []
        currentEnd = JSON.stringify(simplifiedResult)
      }
      // 跳转到结果页面，带上起点和终点信息，并添加一个时间戳作为唯一查询参数
      this.$router.push({
        path: '/lu-jing-gui-hua/Intermediate-page',
        query: {
          start: currentStart,
          end: currentEnd,
          date: this.selectedDate,
          time: this.selectedTime,
          BasemapLayer: this.BasemapName
        }
      })
    },
    onSearch () {
      return new Promise((resolve, reject) => {
        // 检查是否两个结果都已选择
        if (this.selectedResultStart && this.selectedResultEnd) {
          // 显示加载动画
          this.isLoading = true
          // 构造包含location属性的起点和终点对象
          const startWithLocation = {
            ...this.selectedResultStart,
            location: [this.selectedResultStart.wgs84_longitude, this.selectedResultStart.wgs84_latitude]
          }
          const endWithLocation = {
            ...this.selectedResultEnd,
            location: [this.selectedResultEnd.wgs84_longitude, this.selectedResultEnd.wgs84_latitude]
          }
          const formattedTime = this.selectedTime.length === 5 ? `${this.selectedTime}:00` : this.selectedTime
          console.log('Formatted Time:', formattedTime) // 打印时间参数
          // 发送请求到后端进行路径规划
          axios.post(`${process.env.VUE_APP_API_URL}/api/route/plan`, { start: startWithLocation, end: endWithLocation, date: this.selectedDate, time: formattedTime })
            .then(response => {
              // 后端返回的路径规划结果ID
              const defaultRoutePlanId = response.data.default_id
              const timeBasedRoutePlanId = response.data.time_based_id
              console.log('默认路径规划结果ID:', defaultRoutePlanId)
              console.log('基于时间的路径规划结果ID:', timeBasedRoutePlanId)
              console.log('路径规划成功，时间日期是:', this.selectedDate, this.selectedTime)
              // 隐藏加载动画
              this.isLoading = false
              // 使用Vue Router跳转到结果页面，并传递路径规划结果ID
              this.$router.push({
                path: '/lu-jing-gui-hua/route',
                query: {
                  start: JSON.stringify(startWithLocation),
                  end: JSON.stringify(endWithLocation),
                  default_id: defaultRoutePlanId,
                  time_based_id: timeBasedRoutePlanId,
                  date: this.selectedDate,
                  time: formattedTime,
                  BasemapLayer: this.BasemapName
                }
              })
              // 更新搜索框的值
              this.searchQueryStart = startWithLocation.name
              this.searchQueryEnd = endWithLocation.name
              resolve()
            })
            .catch(error => {
              console.error(error)
              // 隐藏加载动画
              this.isLoading = false
              // 错误处理，例如显示提示信息
              alert('路径规划失败，请稍后再试。')
              reject(error)
            })
        } else {
          // 如果起点或终点未选择，显示提示信息
          alert('请确保起点和终点都已选择。')
          reject(new Error('请确保起点和终点都已选择。'))
        }
      })
    },
    // 初始化地图
    initMap (basemapName) {
      const map = new Map({
        // basemap: 'tianditu-vector' // 使用适合的底图
        // basemap: this.BasemapName || 'tianditu-vector' // 使用适合的底图
        basemap: basemapName || this.BasemapName || 'tianditu-vector' // 使用适合的底图
      })
      this.map = map
      // console.log('当前底图名称:', this.BasemapName, basemapName)
      this.view = new MapView({
        container: 'viewDiv', // 使用正确的容器ID
        map: map,
        center: [114.3, 30.7], // 默认中心点坐标
        zoom: 4, // 默认缩放级别
        constraints: {
          geometry: {
            type: 'extent',
            xmin: 113.6,
            ymin: 29.9,
            xmax: 115.0,
            ymax: 31.3
          },
          minScale: 500,
          maxScale: 2000000,
          rotationEnabled: false,
          // 假设tileInfo.lods已经在某处定义，否则这里需要调整
          // lods: tileInfo.lods,
          snapToZoom: false
        }
      })
      // 创建 BasemapGallery 实例
      const basemapGallery = new BasemapGallery({
        view: this.view,
        source: {
          query: {
            title: '"Basemaps for Developers" AND owner:geoscenedev'
          }
        }
      })
      // 监听底图选择事件
      basemapGallery.watch('activeBasemap', (newBasemap) => {
        this.handleBasemapChange(newBasemap)
      })
      const compass = new Compass({
        view: this.view
      })
      // 创建 ScaleBar 实例
      const scaleBar = new ScaleBar({
        view: this.view,
        unit: 'metric', // 使用公制单位
        style: 'ruler' // 使用标尺样式
      })
      // 创建 DistanceMeasurement2D 实例
      const distanceMeasurement2D = new DistanceMeasurement2D({
        view: this.view,
        unit: 'metric',
        unitOptions: {
          metric: ['kilometers', 'meters'],
          nonMetric: ['miles', 'feet']
        },
        iconClass: 'esri-icon-measure-line' // 设置图标类
      })
      // 创建 LayerList 实例
      const layerList = new LayerList({
        view: this.view
      })
      // 将 DistanceMeasurement2D 添加到地图视图的左下角
      this.view.ui.add(distanceMeasurement2D, {
        position: 'bottom-leading',
        index: 0 // 确保它在最上面
      })
      // 将 BasemapGallery 添加到地图视图的右下角
      this.view.ui.add(basemapGallery, {
        position: 'bottom-right',
        index: 0
      })
      // 将 LayerList 添加到地图视图的右下角
      this.view.ui.add(layerList, {
        position: 'bottom-right',
        index: 1
      })
      // 移动缩放控件到左下角
      this.view.ui.move('zoom', {
        position: 'bottom-left',
        index: 1
      })
      // 将指南针添加到地图视图的左下角
      this.view.ui.add(compass, {
        position: 'bottom-left',
        index: 2
      })
      // 将 ScaleBar 添加到地图视图的左下角
      this.view.ui.add(scaleBar, {
        position: 'bottom-left',
        index: 3
      })

      // 创建一个新的GraphicsLayer实例，以便在地图上绘制点
      const graphicsLayer = new GraphicsLayer(
        {
          title: '起点与终点'
        }
      )
      map.add(graphicsLayer)

      // 创建 FeatureLayer 实例
      const featureLayer = new FeatureLayer({
        url: 'https://www.geosceneonline.cn/server/rest/services/Hosted/wuhan_village/FeatureServer',
        title: '武汉县区面', // 设置图层名称
        renderer: {
          type: 'simple', // 使用简单渲染器
          title: '县区边界',
          symbol: {
            type: 'simple-fill', // 使用简单填充符号
            color: [0, 0, 0, 0], // 填充颜色透明
            outline: {
              color: [0, 0, 0, 1], // 轮廓颜色红色
              width: 1
            }
          }
        },
        popupTemplate: {
          content: [{
            type: 'fields',
            fieldInfos: [{
              fieldName: '县区name',
              label: '县区名称'
            }]
          }]
        }
      })
      // 将 FeatureLayer 添加到地图
      map.add(featureLayer)
      map.add(graphicsLayer)

      this.view.when(() => {
        this.drawPoints(graphicsLayer)
        this.adjustView()
        this.drawRoutes(map)
      }).catch((err) => {
        console.error('MapView initialization error:', err)
      })
    },
    // 处理底图选择
    handleBasemapChange (basemap) {
      const basemapMapping = {
        '天地图-矢量（球面墨卡托投影）': 'tianditu-vector',
        '天地图-影像（球面墨卡托投影）': 'tianditu-image',
        '天地图-地形（球面墨卡托投影）': 'tianditu-topography'
      }
      // 检查 basemap.title 是否是中文
      if (basemapMapping[basemap.title]) {
        this.BasemapName = basemapMapping[basemap.title]
      } else {
        this.BasemapName = basemap.title
      }
      console.log('Basemap changed:', this.BasemapName)
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set('BasemapLayer', this.BasemapName)
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
    },
    created () {
      const BasemapLayer = this.$route.query.BasemapLayer
      const basemapMapping = {
        '天地图-矢量（球面墨卡托投影）': 'tianditu-vector',
        '天地图-影像（球面墨卡托投影）': 'tianditu-image',
        '天地图-地形（球面墨卡托投影）': 'tianditu-topography',
        '天地图-矢量（含注记）（球面墨卡托投影）': 'tianditu-vector'
      }

      // 如果有底图参数，进行解析
      if (BasemapLayer) {
        // 检查 BasemapLayer 是否是中文
        if (basemapMapping[BasemapLayer]) {
          this.BasemapName = basemapMapping[BasemapLayer]
        } else {
          this.BasemapName = BasemapLayer
        }
      }
      console.log('BasemapLayer is update', this.BasemapName)
    },
    // 调整视图以适应起点和终点
    adjustView () {
      if (this.selectedResultStart && this.selectedResultEnd) {
        const padding = 0.01 // 调整这个值以增加或减少边界的放宽程度
        const extent = new Extent({
          xmin: Math.min(this.selectedResultStart.location[0], this.selectedResultEnd.location[0]) - 10 * padding,
          ymin: Math.min(this.selectedResultStart.location[1], this.selectedResultEnd.location[1]) - 10 * padding,
          xmax: Math.max(this.selectedResultStart.location[0], this.selectedResultEnd.location[0]) + 10 * padding,
          ymax: Math.max(this.selectedResultStart.location[1], this.selectedResultEnd.location[1]) + 10 * padding
        })
        this.view.goTo(extent).catch((err) => {
          console.error('Error adjusting view:', err)
        })
      } else if (this.selectedResultStart) {
        this.view.goTo({
          center: [this.selectedResultStart.location[0], this.selectedResultStart.location[1]],
          zoom: 10
        }).catch((err) => {
          console.error('Error adjusting view:', err)
        })
      } else if (this.selectedResultEnd) {
        this.view.goTo({
          center: [this.selectedResultEnd.location[0], this.selectedResultEnd.location[1]],
          zoom: 10
        }).catch((err) => {
          console.error('Error adjusting view:', err)
        })
      }
    },
    drawPoints (graphicsLayer) {
      // 检查this.$route.query.start和this.$route.query.end是否定义
      if (!this.$route.query.start || !this.$route.query.end) {
        console.error('Start or end point is undefined.')
        return // 如果未定义，直接返回
      }
      const start = JSON.parse(this.$route.query.start)
      const end = JSON.parse(this.$route.query.end)
      // 检查start和end是否有location属性
      if (!start.location || !end.location) {
        console.error('Start or end point does not have a location.')
        return // 如果没有location属性，直接返回
      }
      // 创建起点和终点的Point对象
      const startPoint = new Point({
        longitude: start.location[0],
        latitude: start.location[1]
      })
      const endPoint = new Point({
        longitude: end.location[0],
        latitude: end.location[1]
      })
      const startGraphic = new Graphic({
        geometry: startPoint,
        title: '起点',
        symbol: {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          color: 'red',
          size: '20px'
        },
        // 添加popupTemplate
        popupTemplate: {
          title: '起点信息',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'address',
                  label: '地址'
                },
                {
                  fieldName: 'name',
                  label: '名称'
                },
                // 可以继续添加更多字段
                {
                  fieldName: 'wgs84_latitude',
                  label: 'WGS84纬度'
                },
                {
                  fieldName: 'wgs84_longitude',
                  label: 'WGS84经度'
                },
                {
                  fieldName: 'baidu_index',
                  label: '百度索引'
                },
                {
                  fieldName: 'baidu_latitude',
                  label: '百度纬度'
                },
                {
                  fieldName: 'baidu_longitude',
                  label: '百度经度'
                },
                {
                  fieldName: 'id',
                  label: 'ID'
                },
                {
                  fieldName: 'label',
                  label: '标签'
                }
              ]
            }
          ]
        },
        attributes: start
      })
      const endGraphic = new Graphic({
        geometry: endPoint,
        title: '终点',
        symbol: {
          type: 'simple-marker',
          color: 'green',
          size: '20px'
        },
        // 添加popupTemplate
        popupTemplate: {
          title: '终点信息',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'address',
                  label: '地址'
                },
                {
                  fieldName: 'name',
                  label: '名称'
                },
                // 可以继续添加更多字段
                {
                  fieldName: 'wgs84_latitude',
                  label: 'WGS84纬度'
                },
                {
                  fieldName: 'wgs84_longitude',
                  label: 'WGS84经度'
                },
                {
                  fieldName: 'baidu_index',
                  label: '百度索引'
                },
                {
                  fieldName: 'baidu_latitude',
                  label: '百度纬度'
                },
                {
                  fieldName: 'baidu_longitude',
                  label: '百度经度'
                },
                {
                  fieldName: 'id',
                  label: 'ID'
                },
                {
                  fieldName: 'label',
                  label: '标签'
                }
              ]
            }
          ]
        },
        attributes: end
      })
      // 将起点和终点添加到图形图层
      graphicsLayer.addMany([startGraphic, endGraphic])
    },
    drawRoutes (map) {
      const defaultRouteId = this.$route.query.default_id // 从URL获取默认路线ID
      const timeBasedRouteId = this.$route.query.time_based_id // 从URL获取基于时间的路线ID

      if (!defaultRouteId && !timeBasedRouteId) {
        console.error('Route IDs are undefined.')
        return
      }

      // 获取并绘制默认路径
      if (defaultRouteId) {
        this.fetchAndDrawRoute(map, defaultRouteId, [25, 202, 173], true) // 绿色，耗时少路径
      }

      // 获取并绘制基于时间的路径
      if (timeBasedRouteId) {
        this.fetchAndDrawRoute(map, timeBasedRouteId, [244, 96, 108]) // 红色，无眩光路径
      }
    },
    fetchAndDrawRoute (map, routeId, color, isNoGlareRoute = false) {
      const geojsonUrl = `${process.env.VUE_APP_API_URL}/api/get_geojson/${routeId}`
      fetch(geojsonUrl) // 使用fetch API获取GeoJSON文件
        .then(response => response.json()) // 将响应转换为JSON
        .then(data => {
          let totalLength = 0
          let totalCost = 0
          // const passRoads = []
          // const roadNamesSet = new Set()
          const roadLengths = {}

          const features = data.features.map((feature, index) => {
            if (feature.properties.cost !== 99999) {
              totalLength += feature.properties.length
              totalCost += feature.properties.cost
            }

            // if (!feature.properties.name.includes('未知') && !roadNamesSet.has(feature.properties.name)) {
            //   roadNamesSet.add(feature.properties.name)
            //   passRoads.push({
            //     name: feature.properties.name,
            //     length: feature.properties.length
            //   })
            // }

            if (!feature.properties.name.includes('未知')) {
              if (!roadLengths[feature.properties.name]) {
                roadLengths[feature.properties.name] = { length: 0, order: index }
              }
              roadLengths[feature.properties.name].length += feature.properties.length
            }
            return {
              geometry: {
                type: 'polyline',
                paths: feature.geometry.coordinates
              },
              attributes: {
                ...feature.properties,
                id: index, // 为每个要素生成唯一的ID
                routeType: isNoGlareRoute ? '耗时少路径' : '无眩光路径' // 添加路线类型
              }
            }
          })

          // 按长度排序并选出最长的三条路段
          // passRoads.sort((a, b) => b.length - a.length)
          // const topPassRoads = passRoads.slice(0, 3).map(road => road.name).join('->')

          // 将 roadLengths 转换为数组并按长度排序，同时保持顺序
          const sortedRoads = Object.entries(roadLengths)
            .sort((a, b) => b[1].length - a[1].length || a[1].order - b[1].order)
          const topPassRoads = sortedRoads.slice(0, 3).map(road => road[0]).join('->')

          const geojsonLayer = new FeatureLayer({ // 创建FeatureLayer图层
            title: isNoGlareRoute ? '耗时少路径' : '无眩光路径',
            source: features,
            renderer: {
              type: 'simple', // 使用简单渲染器
              title: isNoGlareRoute ? '耗时少路径' : '无眩光路径',
              symbol: {
                type: 'simple-line', // 使用简单线符号
                color: color, // 使用传入的颜色
                width: isNoGlareRoute ? 4.5 : 3 // 根据是否为无眩光路径设置宽度
              }
            },
            objectIdField: 'id', // 必须指定一个唯一的字段作为ObjectId
            fields: [
              { name: 'id', type: 'oid' },
              { name: 'seq', type: 'integer' },
              { name: 'path_seq', type: 'integer' },
              { name: 'node', type: 'integer' },
              { name: 'edge', type: 'integer' },
              { name: 'cost', type: 'double' },
              { name: 'agg_cost', type: 'double' },
              { name: 'length', type: 'double' },
              { name: 'name', type: 'string' },
              { name: 'maxspeed', type: 'integer' },
              { name: 'routeType', type: 'string' } // 添加routeType字段
            ],
            popupTemplate: {
              title: '{routeType} - {name}', // 显示路线类型和路名
              content: [
                {
                  type: 'text',
                  text: `总距离: ${(totalLength / 1000).toFixed(2)} km<br>总耗时: ${(totalCost / 3600).toFixed(2)} 小时`
                },
                {
                  type: 'fields',
                  fieldInfos: [
                    {
                      fieldName: 'length',
                      label: '长度（米）'
                    },
                    {
                      fieldName: 'cost',
                      label: '耗时（秒）'
                    },
                    {
                      fieldName: 'maxspeed',
                      label: '最大速度'
                    },
                    {
                      fieldName: 'name',
                      label: '名称'
                    }
                  ]
                }
              ]
            }
          })
          const rawGeojsonLayer = markRaw(geojsonLayer)
          // 将FeatureLayer图层添加到地图上
          // 添加到地图
          map.layers.add(rawGeojsonLayer)
          // map.layers.add(geojsonLayer)
          // 计算总时长（小时和分钟）
          if (totalCost < 3600) {
            totalCost += 60
          }
          const hours = Math.floor(totalCost / 3600)
          // console.log('Hours:', hours)
          const minutes = Math.floor((totalCost % 3600) / 60)
          // console.log('Minutes:', minutes)
          // 计算总距离（米或千米）
          let distance
          if (totalLength < 1000) {
            distance = `${totalLength.toFixed(2)}米`
          } else {
            distance = `${(totalLength / 1000).toFixed(2)}千米`
          }
          // 根据是否为无眩光路径来存储结果
          if (isNoGlareRoute) {
            this.noGlareTotalHours = hours
            console.log('Hours:', hours)
            this.noGlareTotalMinutes = minutes
            this.noGlareTotalDistance = distance
            this.noGlareTotalPass = topPassRoads
            this.routeLayers.noGlareRouteId = geojsonLayer
          } else {
            this.totalHours = hours
            this.totalMinutes = minutes
            this.totalDistance = distance
            this.totalPass = topPassRoads
            this.routeLayers.defaultRouteId = geojsonLayer
          }
        })
        .catch(error => console.error('Error loading the geojson file:', error))
    }
  }
}
</script>

<style>
/*之后要自己调样式的大小，这个仅作参考*/
#viewDiv {
  position: absolute; /* 固定定位 */
  top: 0; /* 紧贴网页顶部 */
  bottom: 0;
  left: 0;
  right: 0;
  height:100%; /* 将高度设置为视口高度的100% */
  width: 100%; /* 将宽度设置为视口宽度的100% */
  z-index: -1; /* 设置较低的z-index值，使其在App.vue的下部分 */
  margin: auto;
}

.lu-jing-gui-hua {
  position: fixed; /* 固定定位 */
  display: flex;
  flex-direction: column; /* 使子元素垂直排列,使大框和revert小框水平分布 */
  z-index: 2;
}

.search-containers {
  display: flex;
  flex-direction: column; /* 保持垂直排列 */
  justify-content: flex-start; /* 从顶部开始排列 */
  align-items: flex-start; /* 子元素沿交叉轴的开始边缘对齐，即顶部对齐 */
  width: 357px; /* 设置一个固定宽度 */
  height:85px;
  padding-right: 10px; /* 根据需要调整，确保搜索框周围有足够空间 */
  padding-left:32px;/*整个搜索框的左边空间*/
  padding-top: 6px;
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 1; /* 设置透明度 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-top-left-radius: 10px; /* 设置圆角 */
  border-top-right-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.45); */
  position: absolute; /* 添加相对定位 */
  margin-left: 9px; /* 与左边界保持一定距离 */
}

/* 移除左右外边距 */
.search-container.start,
.search-container.end {
  position: relative; /* 设置相对定位 */
  margin-top: 5px;
  padding-left: 0px; /* 留出图片的空间 */
  margin-left: 24px; /* 根据侧边栏宽度来设置左边距 */
}

/* 更改 输入字体的框 的样式 */
.search-box {
  position: relative; /* 允许绝对定位的子元素 */
  padding: 8px 8px; /* 初始内边距 */
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  flex-grow: 1;
  box-sizing: border-box;
  text-indent: 0px; /* 初始文本缩进，保持文本在左侧 */
  width: 303px; /* 使搜索框填充容器 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

/* 鼠标悬停时只改变边框颜色，不改变宽度 */
.search-box:hover {
  border-color: rgb(109, 72, 72); /* 改变边框颜色而不是宽度 */
}

.search-box:focus {
  border-width: 2px;
  border-color: rgb(109, 72, 72);
  text-indent: 0px; /* 聚焦时减少文本缩进 */
}

.search-results {
  position: absolute;
  z-index: 9999 !important; /* !important可以使这个css代码优先执行，让这个框显示为最高层级 */
  top: 105%; /* 确保列表紧贴搜索框的底部 */
  left: 0;
  width: 100%; /* 使列表宽度与搜索框相同 */
  background-color: rgba(255, 255, 255, 1); /* 应用浅色毛玻璃效果 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 可选：添加一些阴影以提升视觉效果 */
  max-height: 200px; /* 限制最大高度，5行大约160px，根据实际行高调整 */
  overflow-y: auto; /* 超出部分显示滚动条 */
  display: flex;
  border-radius: 10px; /* 添加圆角 */
}

.search-results li:hover {
  text-decoration: underline; /* 添加下划线 */
  background-color: #f0f0f0; /* 更改背景颜色以提高对比度 */
  cursor: pointer; /* 更改鼠标指针为手形，更明显地指示可点击 */
}

/* 查询按钮的容器样式 */
.search-action {
  display: flex;
  position: absolute; /* 绝对定位 */
  margin-left: 328px; /* 与左边界保持一定距离 */
  top: 11px; /* 与底部保持一定距离 */
  border: 2px solid  #ccc;
  justify-content: flex-start;
  border-radius: 10px;
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

/* 将CSS链接转换为@import语句 */
@import url("https://js.geoscene.cn/4.27/@geoscene/core/assets/geoscene/themes/light/main.css");

.car{
  padding-top:3px;
  left:1px;
}

/* 交换的容器样式 */
.revert{
  width:25px;
  height:28px;
  padding-top: 10px;
  padding-left: 3px;
  background-color: rgba(255, 255, 255, 0) !important;
}

.revert-containers{
  position: absolute; /* 或使用 fixed，根据需要 */
  left: 0; /* 侧边栏靠在最左边 */
  top: 0; /* 根据需要调整垂直位置 */
  width: 20px;
  height:85px;
  padding-left:5px;
  opacity: 1; /* 设置透明度 */
  border-radius: 10px; /* 设置圆角 */
  background-repeat: repeat; /* 背景图片重复 */
  background-size: auto; /* 保持图片的原始尺寸 */
}

.swap-action button {
  display:flex;
  flex-direction: row; /* 保持水平排列 */
  justify-content: flex-start; /* 水平排列的子元素靠左对齐 */
  position: absolute;
  left: 5px; /* 图标距离父容器左边的距离 */
  top: 50%; /* 垂直居中对齐 */
  transform: translateY(-50%); /* 使用transform属性垂直居中 */
  border: none; /* 移除按钮边框 */
  padding:0px;
  background-color: rgba(255, 255, 255, 0); /* 设置背景色为透明 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

/* 搜索框框前面的圆圈的样式 */
.search-icon-wrapper {
  display: inline-block; /* 或者使用 flex 布局 */
  position: absolute; /* 绝对定位 */
  left: -20px; /* 根据需要调整 */
  top: 50%;
  transform: translateY(-50%); /* 垂直居中对齐 */
}

/* 删除logo的样式 */
.search-box-img {/* 作用：使得 删除logo 在搜索框内 */
  display: flex;
  position: absolute;
  left:278px;
  top: 50%;
  transform: translateY(-35%); /* 垂直居中对齐 */
  padding-inline-end: 0px;
}

.delete{
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

.delete img {
  pointer-events: none; /* 点击图片时不会影响输入框 （记得改成删除这个框框内容）*/
}

/* 搜索logo的样式 */
.search-action img {
  transform: scale(0.85); /* 将图片缩放到原始尺寸的50% */
}

.search-action:hover{
  border-color: blue;
}

.main-container{
  position: fixed;
  z-index: 1;
}

.main-container{
  position: absolute;
  z-index: 1;
}

/* 选择时间框的样式 */
.choose-time{
  transform: none;
  position: absolute;
  display: block;
  width: 389px;
  height: 30px;
  border-bottom-left-radius: 10px; /* 设置圆角 */
  border-bottom-right-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  margin-top: 90px;/* 控制时间选择框在网页垂直方向的位置 */
  padding-left: 10px;
  padding-top: 3px;
  margin-left: 9px;
}

.form-group label,
.form-group input {
  margin-right: 10px; /* 右侧外边距 */
}

/* 路线展示框的样式 */
.routelist{
  position: fixed;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  left: 8px; /* 侧边栏靠在最左边 */
  margin-top: 135px; /* 控制路线展示框在网页垂直方向的位置 */
  width: 400px;
  height: auto;
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 设置圆角 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  overflow: hidden;
}

/* 过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out, max-height 0.6s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  max-height: 1000px;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
  max-height: 1000px;
}

.cardlist{
  padding:5px;
  margin-top: 10px;
  margin-bottom: 0px;
}

.route{
  left: 8px; /* 距离左侧的距离 */
  width:348px;
  /* height: 12vh; */
  height: auto;
  border-radius: 10px; /* 设置圆角 */
  border: 2px solid #E4E6E7;
  padding: 25px 20px 10px 15px;
  cursor: pointer;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  cursor: pointer;
}

.route:hover{
  border-color: rgb(109, 72, 72);
}

.introduction{
  color: #3385FF;
}

.intro span{
  margin-right: 10px; /* 右侧外边距 */
}

.toggle-button {
  align-self: center; /* 居中对齐 */
  cursor: pointer;
  margin-bottom: 2px;
  margin-top: 2px;
}

.open-button:hover {
  background-color: rgb(216, 180, 133);
}

.open-button {
  position: fixed;
  left: 8px;
  margin-top: 135px;
  background-color: #FFFFFF;
  border: 2px solid #E4E6E7;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: antiquewhite;
  color: rgb(109,72,72);
  cursor: pointer;
}

/* 新的覆盖层容器样式 */
.loader-overlay {
  position: absolute;
  top: 0;
  left: 50%;
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  transform: translateX(-50%);
  z-index: 10; /* 确保覆盖层在最上层 */
}

/* 加载动画的样式 */
.loader {
  display: inline-grid;
  width: 90px;
  aspect-ratio: 1;
  animation: l3-0 5s steps(10) infinite;
}

.loader:before,
.loader:after {
  content:"";
  grid-area: 1/1;
}

.loader:before {
  clip-path: polygon(100% 50%,90.45% 79.39%,65.45% 97.55%,34.55% 97.55%,9.55% 79.39%,0% 50%,9.55% 20.61%,34.55% 2.45%,65.45% 2.45%,90.45% 20.61%,100% 50%,85.6% 24.14%,63.6% 8.15%,36.4% 8.15%,14.4% 24.14%,6% 50%,14.4% 75.86%,36.4% 91.85%,63.6% 91.85%,85.6% 75.86%,94% 50%,85.6% 24.14%);
  background: #574951;
}

.loader:after {
  background: #83988E;
  clip-path: polygon(100% 50%,65.45% 97.55%,9.55% 79.39%,9.55% 20.61%,65.45% 2.45%);
  margin: 27%;
  translate: 46% 0;
  transform-origin: right;
  animation: l3-1 .5s linear infinite;
}

/* 新的覆盖层容器样式 */
.maploader-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  transform: translate(-50%, -50%);
  z-index: 10; /* 确保覆盖层在最上层 */
}

/* 加载动画的样式 */
.maploader {
  display: inline-grid;
  width: 90px;
  aspect-ratio: 1;
  animation: l3-0 5s steps(10) infinite;
}

.maploader:before,
.maploader:after {
  content:"";
  grid-area: 1/1;
}

.maploader:before {
  clip-path: polygon(100% 50%,90.45% 79.39%,65.45% 97.55%,34.55% 97.55%,9.55% 79.39%,0% 50%,9.55% 20.61%,34.55% 2.45%,65.45% 2.45%,90.45% 20.61%,100% 50%,85.6% 24.14%,63.6% 8.15%,36.4% 8.15%,14.4% 24.14%,6% 50%,14.4% 75.86%,36.4% 91.85%,63.6% 91.85%,85.6% 75.86%,94% 50%,85.6% 24.14%);
  background: #574951;
}

.maploader:after {
  background: #83988E;
  clip-path: polygon(100% 50%,65.45% 97.55%,9.55% 79.39%,9.55% 20.61%,65.45% 2.45%);
  margin: 27%;
  translate: 46% 0;
  transform-origin: right;
  animation: l3-1 .5s linear infinite;
}

@keyframes l3-0 {to{rotate: 1turn}}
@keyframes l3-1 {
  0%{rotate:  18deg}
  to{rotate: -18deg}
}

.search-results li.highlighted {
  background-color: #f0f0f0; /* 高亮背景颜色 */
}

.geoscene-distance-measurement-2d__clear-button{
  background-color: antiquewhite;
  border-left-color: antiquewhite;
  border-right-color: antiquewhite;
  border-top-color: antiquewhite;
  border-bottom-color: antiquewhite;
  color:rgb(109, 72, 72);
  /* background-color: rgba(255, 255, 255, 0.5); 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-distance-measurement-2d__clear-button:hover{
  background-color: rgb(216, 180, 133);
  border-left-color: rgb(216, 180, 133);
  border-right-color: rgb(216, 180, 133);
  border-top-color: rgb(216, 180, 133);
  border-bottom-color: rgb(216, 180, 133);
  color: rgb(109, 72, 72);
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-distance-measurement-2d__actions{
  background-color: transparent;
}

.geoscene-layer-list__item-container{
  background-color: antiquewhite;
  border-left-color: antiquewhite;
  border-right-color: antiquewhite;
  border-top-color: antiquewhite;
  border-bottom-color: antiquewhite;
  color:rgb(109, 72, 72);
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-layer-list__item-container:hover{
  background-color: rgb(216, 180, 133);
  border-left-color: rgb(216, 180, 133);
  border-right-color: rgb(216, 180, 133);
  border-top-color: rgb(216, 180, 133);
  border-bottom-color: rgb(216, 180, 133);
  color: rgb(109, 72, 72);
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-distance-measurement-2d__container{
  width:180px;
  margin: auto;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

/* 距离测量样式 */
.geoscene-component.geoscene-distance-measurement-2d.geoscene-widget.geoscene-widget--panel{
  width:180px;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

/* .geoscene-ui-bottom-right.geoscene-ui-corner{
  width:300px;
} */

.geoscene-component.geoscene-basemap-gallery.geoscene-widget.geoscene-widget--panel-height-only.geoscene-basemap-gallery--grid{
  width: 200px;
  height: 200px;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-component.geoscene-layer-list.geoscene-widget.geoscene-widget--panel{
  width:200px;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-popup__main-container.geoscene-widget.geoscene-popup--is-collapsible{
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-feature__content-node{
  background-color: rgba(255, 255, 255, 0); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-popup__content{
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-distance-measurement-2d__container {
  background-color: rgba(255, 255, 255, 0.5); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角 */
  padding: 10px; /* 添加内边距 */
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-component.geoscene-distance-measurement-2d.geoscene-widget.geoscene-widget--panel {
  background-color: transparent; /* 应用深色毛玻璃效果 */
  border: none;
  box-shadow: none;
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.geoscene-ui-bottom-left.geoscene-ui-corner{
  background-color: transparent; /* 应用深色毛玻璃效果 */
}

.geoscene-component.geoscene-zoom.geoscene-widget {
  background-color: rgba(255, 255, 255, 0.25) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-widget--button.geoscene-widget.geoscene-interactive {
  background-color: rgba(255, 255, 255, 0) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-component.geoscene-compass.geoscene-widget--button.geoscene-widget.geoscene-interactive{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-component.geoscene-basemap-gallery.geoscene-widget.geoscene-widget--panel-height-only.geoscene-basemap-gallery--grid{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-component.geoscene-layer-list.geoscene-widget.geoscene-widget--panel{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-widget--button.geoscene-widget.geoscene-disabled{
  background-color: rgba(255, 255, 255, 0.25) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-feature__content-node{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-feature.geoscene-widget{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-feature__content-element{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-component.geoscene-popup.geoscene-popup--aligned-bottom-left.geoscene-popup--shadow{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.geoscene-popup__main-container.geoscene-widget{
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}
</style>

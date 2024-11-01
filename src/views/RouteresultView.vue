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
        <!-- 修正后的起点搜索结果展示 -->
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
        <!-- 修正后的终点搜索结果展示 -->
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
  </div>
</template>

<script>
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js'
import Graphic from '@geoscene/core/Graphic'
import Point from '@geoscene/core/geometry/Point.js'
import GraphicsLayer from '@geoscene/core/layers/GraphicsLayer'
import Extent from '@geoscene/core/geometry/Extent'
import axios from 'axios'
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery.js'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer.js'
import Compass from '@geoscene/core/widgets/Compass.js'
import ScaleBar from '@geoscene/core/widgets/ScaleBar.js'
import DistanceMeasurement2D from '@geoscene/core/widgets/DistanceMeasurement2D.js'
import LayerList from '@geoscene/core/widgets/LayerList.js'

export default {
  name: 'RouteresultView',
  setup () {
    const searchQueryStart = ref('')
    const searchQueryEnd = ref('')
    const selectedResultStart = ref(null)
    const selectedResultEnd = ref(null)
    const router = useRouter()
    return {
      searchQueryStart,
      searchQueryEnd,
      selectedResultStart,
      selectedResultEnd,
      router
    }
  },
  data () {
    return {
      searchResults: [],
      searchResultsEnd: [],
      isLoading: false,
      ismaploading: true,
      selectedDate: '', // 用户选择的日期
      selectedTime: '', // 用户选择的时间
      highlightedIndex: -1, // 高亮的搜索结果索引
      BasemapName: ''
    }
  },
  mounted () {
    if (this.$route.query.start && this.$route.query.end) {
      // 如果URL中有起点和终点参数，解析并设置
      this.selectedResultStart = JSON.parse(this.$route.query.start)
      this.selectedResultEnd = JSON.parse(this.$route.query.end)
    }
    // 解析URL参数
    this.parseUrlParams()
    // 初始化地图
    this.initMap()
    // 设置定时器，每隔1分钟更新时间
    setInterval(() => { this.updateTime() }, 60000)
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
    // 处理时间输入事件
    onTimeInputChange (event) {
      const value = event.target.value
      const [hours, minutes] = value.split(':').map(Number)
      const roundedMinutes = Math.floor(minutes / 10) * 10
      this.selectedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`
    },
    // 检查日期是否被禁用
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
    // 处理日期变更事件
    handleDateChange (event) {
      const date = event.target.value
      if (this.isDateDisabled(date)) {
        // alert('选择的日期未进行模拟，请选择其他日期。可选日期为，1-7月的15日，8月20日-9月30日，10-12月的15日。')
        alert('抱歉，选择的日期未进行模拟，请选择其他日期。可选日期为，9月1日-9月30日，11月1日到9日，以及其他月份的15日.')
        this.selectedDate = ''
      }
    },
    // 处理键盘按下事件
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
    // 交换起点和终点信息并跳转页面
    swap () {
      const tempQuery = this.searchQueryStart
      this.searchQueryStart = this.searchQueryEnd
      this.searchQueryEnd = tempQuery
      // 交换 selectedResultStart 和 selectedResultEnd
      const tempResult = this.selectedResultStart
      this.selectedResultStart = this.selectedResultEnd
      this.selectedResultEnd = tempResult
      // 跳转到 intermediate-page 页面，并传递交换后的起点和终点信息
      this.router.push({
        path: '/lu-jing-gui-hua/Intermediate-page',
        query: {
          start: JSON.stringify(this.selectedResultStart),
          end: JSON.stringify(this.selectedResultEnd),
          date: this.selectedDate,
          time: this.selectedTime,
          BasemapLayer: this.BasemapName
        }
      })
    },
    // 解析URL参数
    parseUrlParams () {
      const urlParams = new URLSearchParams(window.location.search)
      const startParam = urlParams.get('start')
      const endParam = urlParams.get('end')
      const dateParam = urlParams.get('date')
      const timeParam = urlParams.get('time')
      // const BasemapLayer = urlParams.get('BasemapLayer')
      // 如果有起点参数，进行解析
      if (startParam) {
        try {
          // 解析起点参数
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
          // 解析终点参数
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
      // 如果有底图参数，进行解析
      // if (BasemapLayer) {
      //   this.BasemapName = BasemapLayer
      //   console.log('BasemapLayer open success', this.BasemapName)
      // }
      this.created()
    },
    // 处理搜索框输入事件
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
    // 处理路径规划事件
    onSearch () {
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
          })
          .catch(error => {
            console.error(error)
            // 隐藏加载动画
            this.isLoading = false
            // 错误处理，例如显示提示信息
            alert('路径规划失败，请稍后再试。')
          })
      } else {
        // 如果起点或终点未选择，显示提示信息
        alert('请确保起点和终点都已选择。')
      }
    },
    // 初始化地图
    initMap () {
      const map = new Map({
        // basemap: 'tianditu-vector' // 使用适合的底图
        basemap: this.BasemapName || 'tianditu-vector' // 使用传递的底图参数或默认底图
      })
      this.map = map
      console.log('BasemapLayer open success2', this.BasemapName)
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
      // 创建 LayerList 实例
      const layerList = new LayerList({
        view: this.view
      })
      // 创建 Compass 实例
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
        title: '武汉县区面',
        renderer: {
          type: 'simple', // 使用简单渲染器
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
      this.view.when(() => {
        this.drawPoints(graphicsLayer)
        this.adjustView()
        this.ismaploading = false
      }).catch((err) => {
        console.error('MapView initialization error:', err)
      })
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
      console.log('BasemapLayer is', this.BasemapName)
    },
    // 在地图上绘制起点和终点
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
      // 创建起点和终点的Point实例
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
        symbol: {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          color: 'red',
          size: '20px'
        },
        // 添加popupTemplate，用url信息解析而来
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
        // 添加属性
        attributes: start
      })
      const endGraphic = new Graphic({
        geometry: endPoint,
        symbol: {
          type: 'simple-marker',
          color: 'green',
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
        attributes: end
      })
      // 将起点和终点添加到图形图层
      graphicsLayer.addMany([startGraphic, endGraphic])
    }
  }
}
</script>

<style src="@/assets/share_css/routeplanning.css">

</style>

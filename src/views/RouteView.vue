<template>
  <!-- 输入了起点和终点之后,还没有摁查询路径的画面 -->
    <div class="lu-jing-gui-hua">
      <!-- 搜索框 -->
      <!-- 外层容器 -->
      <div class="search-containers">
        <!-- 交换的侧边栏 -->
        <div class="revert-containers">
          <div class="car"><img src='@/assets/image/map_icon/car.png'></div>
          <div class="swap-action">
            <!-- 绑定 swap 方法到点击事件 -->
            <button @click="swap" title="切换起终点">
              <img :src="require('@/assets/image/map_icon/revert_new_dark.png')" alt="" class="revert">
            </button>
          </div>
        </div>
        <!-- 搜索起点的容器 -->
        <div class="search-container start">
          <!-- 图片 -->
          <div class="search-icon-wrapper">
            <img src='@/assets/image/map_icon/pink-circle.png' alt="pink">
          </div>
          <!-- 输入框 -->
          <input type="text" v-model="searchQueryStart" @input="onSearchInputChange($event, true)" placeholder="请输入起点" class="search-box search-box-start"/>
          <!-- 搜索框内部的删除图片 -->
          <span class="search-box-img">
            <div class="delete" title="清空" @click="clc1">
              <img src='@/assets/image/map_icon/cancel.png' alt="delete1">
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
            <img src='@/assets/image/map_icon/green-circle.png' alt="green">
          </div>
          <!-- 输入框 -->
          <input type="text" v-model="searchQueryEnd" @input="onSearchInputChange($event, false)" placeholder="请输入终点" class="search-box search-box-end"/>
          <!-- 搜索框内部的删除图片 -->
          <span class="search-box-img">
            <div class="delete" title="清空" @click="clc2">
              <img src='@/assets/image/map_icon/cancel.png' alt="delete1">
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
          <img :src="require('@/assets/image/map_icon/search.png')" alt="" class="search">
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
            <img src='@/assets/image/map_icon/cancel.png' alt="delete1">
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
import { markRaw } from 'vue'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery.js'
import Compass from '@geoscene/core/widgets/Compass.js'
import ScaleBar from '@geoscene/core/widgets/ScaleBar.js'
import DistanceMeasurement2D from '@geoscene/core/widgets/DistanceMeasurement2D.js'
import LayerList from '@geoscene/core/widgets/LayerList.js'
import { parseUrlParams, toggleRouteList, getColor, highlightRoute, selectResult, swap } from '@/assets/share_js/routeview_public'
import { handleKeydown, updateTime, clc1, clc2, isDateDisabled, handleDateChange, onTimeInputChange, onSearchInputChange } from '@/assets/share_js/routeplanning_all'

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
    /**
     * This function is responsible for parsing URL parameters and setting up event listeners.
     *
     * - `parseUrlParams(this)`: Parses the URL parameters and initializes the component state based on them.
     * - `window.addEventListener('keydown', this.handleKeydown)`: Adds an event listener to handle keydown events.
     *
     * Note: A timer is set to update the time every minute.
     */
    parseUrlParams(this)
    // 设置定时器，每隔1分钟更新时间
    window.addEventListener('keydown', this.handleKeydown)
  },
  /**
   * Lifecycle hook called before the component is unmounted.
   * This function removes the 'keydown' event listener from the window object.
   */
  beforeUnmount () {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  computed: {
    /**
     * Returns the minimum date allowed for selection.
     * @returns {string} The minimum date in 'YYYY-MM-DD' format.
     */
    minDate () {
      return '2024-01-01' // Minimum date set to January 1, 2024
    },
    /**
     * Returns the maximum date allowed for selection.
     * @returns {string} The maximum date in 'YYYY-MM-DD' format.
     */
    maxDate () {
      return '2024-12-31' // Maximum date set to December 31, 2024
    },
    /**
     * Formats the selected time to the nearest 10-minute interval.
     * @returns {string} The formatted time in 'HH:mm' format or an empty string if no time is selected.
     */
    formattedTime () {
      // Format time to 10-minute intervals
      if (!this.selectedTime) return '' // Return empty string if no time is selected
      const [hours, minutes] = this.selectedTime.split(':').map(Number) // Split and convert time to numbers
      const roundedMinutes = Math.floor(minutes / 10) * 10 // Round minutes to nearest 10
      return `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}` // Format and return time
    }
  },
  methods: {
    toggleRouteList () {
      toggleRouteList(this)
    },
    getColor (index) {
      return getColor(index)
    },
    highlightRoute (routeId) {
      highlightRoute(this, routeId)
    },
    onTimeInputChange (event) {
      onTimeInputChange(this, event)
    },
    isDateDisabled (date) {
      return isDateDisabled(this, date)
    },
    handleDateChange (event) {
      handleDateChange(this, event)
    },
    handleKeydown (event) {
      handleKeydown(this, event)
    },
    updateTime () {
      updateTime(this)
    },
    clc1 () {
      clc1(this)
    },
    clc2 () {
      clc2(this)
    },
    swap () {
      swap(this)
    },
    onSearchInputChange (event, isStart) {
      onSearchInputChange(this, event, isStart)
    },
    selectResult (result, isStart = true) {
      selectResult(this, result, isStart)
    },
    /**
     * Function to handle the search operation for route planning.
     * This function checks if both start and end locations are selected,
     * constructs the necessary objects with location properties, and sends
     * a request to the backend for route planning. It then handles the response
     * by navigating to the results page and updating the search queries.
     *
     * @returns {Promise} A promise that resolves when the operation is successful,
     *                    and rejects if there is an error or if the start/end locations
     *                    are not selected.
     */
    onSearch () {
      return new Promise((resolve, reject) => {
        // Check if both start and end locations are selected
        if (this.selectedResultStart && this.selectedResultEnd) {
          // Show loading animation
          this.isLoading = true
          // Construct start and end objects with location properties
          const startWithLocation = {
            ...this.selectedResultStart,
            location: [this.selectedResultStart.wgs84_longitude, this.selectedResultStart.wgs84_latitude]
          }
          const endWithLocation = {
            ...this.selectedResultEnd,
            location: [this.selectedResultEnd.wgs84_longitude, this.selectedResultEnd.wgs84_latitude]
          }
          const formattedTime = this.selectedTime.length === 5 ? `${this.selectedTime}:00` : this.selectedTime
          // Send request to backend for route planning
          axios.post(`${process.env.VUE_APP_API_URL}/api/route/plan`, { start: startWithLocation, end: endWithLocation, date: this.selectedDate, time: formattedTime })
            .then(response => {
              // Route planning result IDs returned from backend
              const defaultRoutePlanId = response.data.default_id
              const timeBasedRoutePlanId = response.data.time_based_id
              // Hide loading animation
              this.isLoading = false
              // Navigate to results page using Vue Router and pass route planning result IDs
              this.$router.push({
                path: '/lu-jing-gui-hua/routesw',
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
              // Update search box values
              this.searchQueryStart = startWithLocation.name
              this.searchQueryEnd = endWithLocation.name
              resolve()
            })
            .catch(error => {
              console.error(error)
              // Hide loading animation
              this.isLoading = false
              // Error handling, e.g., show a prompt message
              alert('路径规划失败，请稍后再试。')
              reject(error)
            })
        } else {
          // If start or end location is not selected, show a prompt message
          alert('请确保起点和终点都已选择。')
          reject(new Error('请确保起点和终点都已选择。'))
        }
      })
    },
    /**
     * Initializes the map with the specified basemap and sets up various map components.
     *
     * @param {string} basemapName - The name of the basemap to use. If not provided, defaults to 'tianditu-vector'.
     *
     * Initializes the map and view with the specified basemap and default settings.
     * Sets up various map components including BasemapGallery, Compass, ScaleBar, DistanceMeasurement2D, and LayerList.
     * Adds a GraphicsLayer for drawing points and a FeatureLayer for displaying county boundaries.
     * Adjusts the view and draws points and routes once the view is ready.
     */
    initMap (basemapName) {
      const map = new Map({
        basemap: basemapName || this.BasemapName || 'tianditu-vector' // Use the appropriate basemap
      })
      this.map = map
      this.view = new MapView({
        container: 'viewDiv', // Use the correct container ID
        map: map,
        center: [114.3, 30.7], // Default center coordinates
        zoom: 4, // Default zoom level
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
      // Create BasemapGallery instance
      const basemapGallery = new BasemapGallery({
        view: this.view,
        source: {
          query: {
            title: '"Basemaps for Developers" AND owner:geoscenedev'
          }
        }
      })
      // Listen for basemap selection events
      basemapGallery.watch('activeBasemap', (newBasemap) => {
        this.handleBasemapChange(newBasemap)
      })
      const compass = new Compass({
        view: this.view
      })
      // Create ScaleBar instance
      const scaleBar = new ScaleBar({
        view: this.view,
        unit: 'metric', // Use metric units
        style: 'ruler' // Use ruler style
      })
      // Create DistanceMeasurement2D instance
      const distanceMeasurement2D = new DistanceMeasurement2D({
        view: this.view,
        unit: 'metric',
        unitOptions: {
          metric: ['kilometers', 'meters'],
          nonMetric: ['miles', 'feet']
        },
        iconClass: 'esri-icon-measure-line' // Set icon class
      })
      // Create LayerList instance
      const layerList = new LayerList({
        view: this.view
      })
      // Add DistanceMeasurement2D to the bottom-left corner of the map view
      this.view.ui.add(distanceMeasurement2D, {
        position: 'bottom-leading',
        index: 0 // Ensure it is on top
      })
      // Add BasemapGallery to the bottom-right corner of the map view
      this.view.ui.add(basemapGallery, {
        position: 'bottom-right',
        index: 0
      })
      // Add LayerList to the bottom-right corner of the map view
      this.view.ui.add(layerList, {
        position: 'bottom-right',
        index: 1
      })
      // Move zoom control to the bottom-left corner
      this.view.ui.move('zoom', {
        position: 'bottom-left',
        index: 1
      })
      // Add compass to the bottom-left corner of the map view
      this.view.ui.add(compass, {
        position: 'bottom-left',
        index: 2
      })
      // Add ScaleBar to the bottom-left corner of the map view
      this.view.ui.add(scaleBar, {
        position: 'bottom-left',
        index: 3
      })

      // Create a new GraphicsLayer instance for drawing points
      const graphicsLayer = new GraphicsLayer({
        title: '起点与终点' // Title for the layer
      })
      map.add(graphicsLayer)

      // Create FeatureLayer instance
      const featureLayer = new FeatureLayer({
        url: 'https://www.geosceneonline.cn/server/rest/services/Hosted/wuhan_village/FeatureServer',
        title: '武汉县区面', // Set layer name
        renderer: {
          type: 'simple', // Use simple renderer
          title: '县区边界',
          symbol: {
            type: 'simple-fill', // Use simple fill symbol
            color: [0, 0, 0, 0], // Transparent fill color
            outline: {
              color: [0, 0, 0, 1], // Red outline color
              width: 1
            }
          }
        },
        popupTemplate: {
          content: [{
            type: 'fields',
            fieldInfos: [{
              fieldName: '县区name',
              label: '县区名称' // Field label
            }]
          }]
        }
      })
      // Add FeatureLayer to the map
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
    /**
     * @param {Object} basemap - The basemap object containing the title of the selected basemap.
     * @param {string} basemap.title - The title of the selected basemap.
     */
    handleBasemapChange (basemap) {
      const basemapMapping = {
        '天地图-矢量（球面墨卡托投影）': 'tianditu-vector', // Mapping for vector basemap
        '天地图-影像（球面墨卡托投影）': 'tianditu-image', // Mapping for image basemap
        '天地图-地形（球面墨卡托投影）': 'tianditu-topography' // Mapping for topography basemap
      }
      // Check if basemap.title is in Chinese and map it to internal name
      if (basemapMapping[basemap.title]) {
        this.BasemapName = basemapMapping[basemap.title]
      } else {
        this.BasemapName = basemap.title // Use the original title if no mapping is found
      }
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set('BasemapLayer', this.BasemapName) // Update URL parameter with the selected basemap
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`) // Modify the URL without reloading the page
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
      graphicsLayer.addMany([startGraphic, endGraphic])
    },
    drawRoutes (map) {
      const defaultRouteId = this.$route.query.default_id // 从URL获取默认路线ID
      const timeBasedRouteId = this.$route.query.time_based_id // 从URL获取基于时间的路线ID

      if (!defaultRouteId && !timeBasedRouteId) {
        console.error('Route IDs are undefined.')
        return
      }
      if (defaultRouteId) {
        this.fetchAndDrawRoute(map, defaultRouteId, [25, 202, 173], true) // 绿色，耗时少路径
      }
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
          const roadLengths = {}

          const features = data.features.map((feature, index) => {
            if (feature.properties.cost !== 99999) {
              totalLength += feature.properties.length
              totalCost += feature.properties.cost
            }

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
          map.layers.add(rawGeojsonLayer)
          if (totalCost < 3600) {
            totalCost += 60
          }
          const hours = Math.floor(totalCost / 3600)
          const minutes = Math.floor((totalCost % 3600) / 60)
          let distance
          if (totalLength < 1000) {
            distance = `${totalLength.toFixed(2)}米`
          } else {
            distance = `${(totalLength / 1000).toFixed(2)}千米`
          }
          // 根据是否为无眩光路径来存储结果
          if (isNoGlareRoute) {
            this.noGlareTotalHours = hours
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

<style src="@/assets/share_css/routeplanning.css">

</style>

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
        <img :src="require('@/assets/image/map_icon/search.png')" alt="" class="search">
      </div>
    </div>
  </div>
  <!-- 地图展示 -->
  <div id="viewDiv">
  </div>
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
// 确保这里的路径是正确的，根据你的项目结构和npm包的安装情况
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js'
import SpatialReference from '@geoscene/core/geometry/SpatialReference.js'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer.js'
import TileInfo from '@geoscene/core/layers/support/TileInfo.js'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery.js'
import Compass from '@geoscene/core/widgets/Compass.js'
import { handleKeydown, updateTime, clc1, clc2, isDateDisabled, handleDateChange, onTimeInputChange, onSearchInputChange } from '@/assets/share_js/routeplanning_all'
import ScaleBar from '@geoscene/core/widgets/ScaleBar.js'
import DistanceMeasurement2D from '@geoscene/core/widgets/DistanceMeasurement2D.js'
import LayerList from '@geoscene/core/widgets/LayerList'

export default {
  name: 'RouteplanningView',
  data () {
    return {
      searchQueryStart: '',
      ismaploading: true,
      searchQueryEnd: '',
      highlightedIndex: -1,
      searchResults: [],
      searchResultsEnd: [],
      selectedResultStart: null,
      selectedResultEnd: null,
      selectedDate: '', // 用户选择的日期
      selectedTime: '' // 用户选择的时间
    }
  },
  mounted () {
    this.initMap()
    this.selectedDate = new Date().toISOString().substring(0, 10)
    this.selectedTime = new Date().toISOString().substring(11, 16)
    // 更新时间选择器为当前时间
    this.updateTime()

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
    toggleBasemapGallery () {
      if (this.mapView) {
        this.basemapGalleryVisible = !this.basemapGalleryVisible
        const basemapGallery = this.mapView.ui.find('basemapGallery')
        if (basemapGallery) {
          basemapGallery.container.style.display = this.basemapGalleryVisible ? 'block' : 'none'
        }
      } else {
        console.error('MapView is not initialized.')
      }
    },
    onTimeInputChange (event) {
      onTimeInputChange(this, event)
    },
    isDateDisabled (date) {
      return isDateDisabled(this, date)
    },
    // 处理日期变化
    handleDateChange (event) {
      handleDateChange(this, event)
    },
    handleKeydown (event) {
      handleKeydown(this, event)
    },
    // 更新时间，日期
    updateTime () {
      updateTime(this)
    },
    clc1 () {
      clc1(this)
    },
    clc2 () {
      clc2(this)
    },
    // 初始化地图
    initMap () {
      const map = new Map({
        basemap: 'tianditu-vector'
      })
      const spatialReference = new SpatialReference({
        wkid: 4326
      })
      const tileInfo = TileInfo.create({
        spatialReference,
        numLODs: 32
      })
      this.createMapView(map, tileInfo)
    },
    onSearchInputChange (event, isStart) {
      onSearchInputChange(this, event, isStart)
    },
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

      // const BasemapName = this.mapView.map.basemap.title
      const BasemapName = this.BasemapName
      console.log('BasemapName:', BasemapName)

      // 根据isStart的值，将选择的结果设置为起点或终点
      if (isStart) {
        this.selectedResultStart = simplifiedResult
        this.searchQueryStart = simplifiedResult.name
        this.searchResults = []
        // 跳转到结果页面，带上起点信息
        this.$router.push({
          path: '/lu-jing-gui-hua/intermediate-page',
          query: {
            start: JSON.stringify(simplifiedResult),
            date: this.selectedDate,
            time: this.selectedTime,
            BasemapLayer: BasemapName
          }
        })
      } else {
        this.selectedResultEnd = simplifiedResult
        this.searchQueryEnd = simplifiedResult.name
        this.searchResultsEnd = []
        // 跳转到结果页面，带上终点信息
        this.$router.push({
          path: '/lu-jing-gui-hua/intermediate-page',
          query: {
            end: JSON.stringify(simplifiedResult),
            date: this.selectedDate,
            time: this.selectedTime,
            BasemapLayer: BasemapName
          }
        })
      }
    },
    // 处理搜索按钮点击事件
    onSearch () {
      // 检查是否两个结果都已选择
      if (this.selectedResultStart && this.selectedResultEnd) {
        // 构造包含location属性的起点和终点对象
        const startWithLocation = {
          ...this.selectedResultStart,
          location: [this.selectedResultStart.wgs84_longitude, this.selectedResultStart.wgs84_latitude]
        }
        const endWithLocation = {
          ...this.selectedResultEnd,
          location: [this.selectedResultEnd.wgs84_longitude, this.selectedResultEnd.wgs84_latitude]
        }
        // 使用Vue Router跳转到结果页面，并传递起点和终点信息
        this.$router.push({
          path: '/lu-jing-gui-hua/result',
          query: {
            start: JSON.stringify(startWithLocation),
            end: JSON.stringify(endWithLocation),
            date: this.selectedDate,
            time: this.selectedTime
          }
        })
      } else {
        // 如果起点或终点未选择，可以在这里显示提示信息
        alert('请确保起点和终点都已选择。')
      }
    },
    // 创建地图视图
    createMapView (map, tileInfo) {
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
      // 创建 MapView 实例
      const mapView = new MapView({
        map: map,
        center: [114.3, 30.7], // 使用中心点坐标
        zoom: 4,
        container: 'viewDiv',
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
          lods: tileInfo.lods,
          snapToZoom: false
        }
      })
      // 监听地图视图的 `when` 事件，地图加载完成后设置 `ismaploading` 为 false
      mapView.when(() => {
        this.ismaploading = false
      })
      // 创建 BasemapGallery 实例
      const basemapGallery = new BasemapGallery({
        view: mapView,
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
        view: mapView
      })
      // 创建 Compass 实例
      const compass = new Compass({
        view: mapView
      })
      // 创建 ScaleBar 实例
      const scaleBar = new ScaleBar({
        view: mapView,
        unit: 'metric', // 使用公制单位
        style: 'ruler' // 使用标尺样式
      })
      // 创建 DistanceMeasurement2D 实例
      const distanceMeasurement2D = new DistanceMeasurement2D({
        view: mapView,
        unit: 'metric',
        unitOptions: {
          metric: ['kilometers', 'meters'],
          nonMetric: ['miles', 'feet']
        },
        iconClass: 'esri-icon-measure-line' // 设置图标类
      })
      // 创建 BasemapToggle 实例
      // const basemapToggle = new BasemapToggle({
      //   view: mapView,
      //   nextBasemap: 'tianditu-image',
      //   basemap: 'tianditu-vector'
      // })
      // mapView.ui.add(basemapToggle, 'bottom-right')
      // 将 BasemapGallery 添加到地图视图的右下角
      mapView.ui.add(basemapGallery, {
        position: 'bottom-right',
        index: 0
      })
      // 将 LayerList 添加到地图视图的右下角
      mapView.ui.add(layerList, {
        position: 'bottom-right',
        index: 1
      })
      // 将 DistanceMeasurement2D 添加到地图视图的右下角
      mapView.ui.add(distanceMeasurement2D, {
        position: 'bottom-leading',
        index: 0 // 确保它在最上面
      })
      // 移动缩放控件到左下角
      mapView.ui.move('zoom', {
        position: 'bottom-left',
        index: 1
      })
      // 将指南针添加到地图视图的左下角
      mapView.ui.add(compass, {
        position: 'bottom-left',
        index: 2
      })
      // 将 ScaleBar 添加到地图视图的左下角
      mapView.ui.add(scaleBar, {
        position: 'bottom-left',
        index: 3
      })
      this.mapView = mapView
      const BasemapName = this.mapView.map.basemap.title
      console.log('BasemapName old:', BasemapName)
      // BasemapName 映射
      const basemapMapping = {
        '天地图-矢量（球面墨卡托投影）': 'tianditu-vector',
        '天地图-影像（球面墨卡托投影）': 'tianditu-image',
        '天地图-地形（球面墨卡托投影）': 'tianditu-topography'
      }
      this.BasemapName = basemapMapping[BasemapName] || BasemapName
      console.log('BasemapName changed in rpv:', this.BasemapName)
      return mapView
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
        '天地图-矢量（含注记）（球面墨卡托投影）': 'tianditu-vector',
        '天地图-影像（球面墨卡托投影）': 'tianditu-image',
        '天地图-地形（球面墨卡托投影）': 'tianditu-topography'
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
    }
  }
}
</script>

<style src="@/assets/share_css/routeplanning.css">

</style>

<template>
    <div class="datamanager">
      <!-- 工具箱 -->
      <div class="toolbox" @click="toggleToolbox">
        <img :src="toolboxIcon" alt="Toolbox Icon" class="toolbox-icon">
        <span class="toolbox-text">工具箱</span>
      </div>
      <!-- 工具箱网格 -->
      <div v-if="showToolboxPopup" class="toolbox-popup">
      <div class="toolbox-grid">
        <div class="help-toolbox" @click="openLoadDataPopup" @mouseover="startTooltipTimer('加载数据', '加载数据功能可以帮助您导入新的数据集。', $event)" @mouseleave="hideTooltip">
          <img src="@/assets/image/gis_dev_zgw_img/add_data.png" alt="加载数据">
        </div>
        <div class="help-toolbox" @click="toggleTimeSlider" :class="{ active: !timeSliderDisabled }" @mouseover="startTooltipTimer('时间滑块', '时间滑块功能可以帮助您在不同时间段之间切换。', $event)" @mouseleave="hideTooltip">
          <img src="@/assets/image/gis_dev_zgw_img/time_slider.png" alt="时间滑块">
        </div>
        <div class="help-toolbox disabled" @mouseover="startTooltipTimer('过滤器', '过滤器功能可以帮助您筛选数据。', $event)" @mouseleave="hideTooltip">
          <img src="@/assets/image/gis_dev_zgw_img/filter.png" alt="过滤功能">
        </div>
        <div class="help-toolbox disabled" @mouseover="startTooltipTimer('处理数据', '处理数据功能可以帮助您对数据进行处理。', $event)" @mouseleave="hideTooltip">
          <img src="@/assets/image/gis_dev_zgw_img/deal_data.png" alt="处理数据">
        </div>
        <div class="help-toolbox" @click="openKernelDensityPopup" @mouseover="startTooltipTimer('核密度', '核密度功能可以帮助您计算数据的密度。', $event)" @mouseleave="hideTooltip">
          <img src="@/assets/image/gis_dev_zgw_img/dot_density.png" alt="密度计算">
        </div>
        <div class="help-toolbox disabled" @mouseover="startTooltipTimer('选择数据', '选择数据功能可以帮助您选择特定的数据。', $event)" @mouseleave="hideTooltip">
          <img src="@/assets/image/gis_dev_zgw_img/select.png" alt="选择数据">
        </div>
      </div>
        <!-- 工作箱关闭 -->
        <span class="toolbox-close" @click="toggleToolbox">
          <img src="@/assets/image/map_icon/cancel_dark.png" alt="关闭">
        </span>
      </div>
      <!-- 弹窗1，导入数据 -->
      <div v-if="showLoadDataPopup" class="modal-overlay">
        <div class="modal-content">
          <h2>加载数据</h2>
          <div>
            <label for="dataSelect">选择数据：</label>
            <select id="dataSelect" class="styled-select" v-model="selectedDate">
              <option v-for="date in availableDates" :key="date" :value="date">{{ date }}</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button @click="confirmLoadData">确定</button>
            <button @click="cancelLoadData">取消</button>
          </div>
        </div>
      </div>
      <div v-if="showKernelDensityPopup" class="modal-overlay">
    <!-- 弹窗2，核密度参数 -->
    <div class="modal-content">
      <h2>核密度计算</h2>
      <div>
        <label for="kernelRadius">核半径：</label>
        <input type="number" id="kernelRadius" v-model="kernelRadius" class="styled-select">
      </div>
      <div>
        <label for="weightField">权重字段：</label>
        <select id="weightField" v-model="weightField" class="styled-select">
          <option v-for="field in availableFields" :key="field" :value="field">{{ field }}</option>
        </select>
      </div>
      <div>
        <label for="maxValue">最大值：</label>
        <input type="number" id="maxValue" v-model="maxValue" class="styled-select">
      </div>
      <!-- <div>
        <label for="colorStops">颜色渐变：</label>
        <input type="text" id="colorStops" v-model="colorStops" placeholder="" class="styled-select">
      </div> -->
      <div class="modal-buttons">
        <button @click="applyKernelDensity">确定</button>
        <button @click="cancelKernelDensity">取消</button>
      </div>
    </div>
    </div>
      <transition name="fade">
        <div v-if="tooltipVisible" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }" class="tooltip">
          <h3>{{ tooltipTitle }}</h3>
          <p>{{ tooltipText }}</p>
        </div>
      </transition>
      <!-- 地图展示 -->
      <div id="viewDiv">
      </div>
      <div id="timeSliderDiv" class="time-slider" :style="{ maxHeight: showTimeSlider ? '30%' : '0%' }">
      </div>
      <div v-if="showFeatureTable" id="featureTableDiv" class="feature-table"></div>
    </div>
</template>

<script>
import { markRaw } from 'vue'
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js'
import SpatialReference from '@geoscene/core/geometry/SpatialReference.js'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer.js'
import TileInfo from '@geoscene/core/layers/support/TileInfo.js'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery.js'
import Compass from '@geoscene/core/widgets/Compass.js'
// import { handleKeydown, updateTime, clc1, clc2, isDateDisabled, handleDateChange, onTimeInputChange, onSearchInputChange } from '@/assets/share_js/routeplanning_all'
import ScaleBar from '@geoscene/core/widgets/ScaleBar.js'
import DistanceMeasurement2D from '@geoscene/core/widgets/DistanceMeasurement2D.js'
import LayerList from '@geoscene/core/widgets/LayerList'
import TimeSlider from '@geoscene/core/widgets/TimeSlider.js' // 导入 TimeSlider
import FeatureTable from '@geoscene/core/widgets/FeatureTable.js'
import axios from 'axios'

const FEATURE_LAYER_URL_DEFAULT = 'https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_12_15_10min/FeatureServer'
const WHHANVILLAGE = 'https://www.geosceneonline.cn/server/rest/services/Hosted/wuhan_village/FeatureServer'
export default {
  name: 'DatamanagerView',
  data () {
    return {
      resultLayer: null,
      toolboxIcon: require('@/assets/image/gis_dev_zgw_img/Toolbox_4868.png'), // 工具箱图标路径
      BasemapName: '',
      ismaploading: true,

      featureTable: null,
      showFeatureTable: false,
      showToolboxPopup: false, // 控制工具箱弹窗显示
      showLoadDataPopup: false, // 控制加载数据弹窗显示
      showTimeSlider: false, // 添加控制时间滑块显示的状态
      timeSliderDisabled: true, // 时间滑块是否禁用，默认禁用
      timeSlider: null, // 保存 TimeSlider 实例

      showKernelDensityPopup: false,
      kernelRadius: 2,
      weightField: '',
      maxValue: 100,
      colorStops: '0,255,255,255,0; 0.1,0,0,255,0.8; 0.3,0,255,255,0.8; 0.5,0,255,0,0.8; 0.7,255,255,0,0.8; 0.9,255,0,0,0.8; 1,139,0,0,0.8',
      availableFields: ['result', 't08:50:00'],
      kernelDensityLayer: null,

      tooltipVisible: false,
      tooltipTitle: '',
      tooltipText: '',
      tooltipX: 0,
      tooltipY: 0,
      tooltipTimer: null,

      availableDates: [],
      selectedDate: ''
    }
  },
  watch: {
    // watch
    startTooltipTimer (title, text, event) {
      this.tooltipTitle = title
      this.tooltipText = text
      this.tooltipX = event.clientX + 10
      this.tooltipY = event.clientY + 10
      this.tooltipTimer = setTimeout(() => {
        this.tooltipVisible = true
      }, 1000) // 悬停一秒后显示
    },
    hideTooltip () {
      clearTimeout(this.tooltipTimer)
      this.tooltipVisible = false
    }
  },
  methods: {
    startTooltipTimer (title, text, event) {
      this.tooltipTitle = title
      this.tooltipText = text
      this.tooltipX = event.clientX + 10
      this.tooltipY = event.clientY + 10
      this.tooltipTimer = setTimeout(() => {
        this.tooltipVisible = true
      }, 1000) // 悬停一秒后显示
    },
    hideTooltip () {
      clearTimeout(this.tooltipTimer)
      this.tooltipVisible = false
    },
    toggleToolbox () {
      this.showToolboxPopup = !this.showToolboxPopup
    },
    openKernelDensityPopup () {
      this.showKernelDensityPopup = true
    },
    applyKernelDensity () {
      this.showKernelDensityPopup = false
      // 解析颜色渐变字符串
      const colorStopsArray = this.colorStops.split(';').map(stop => {
        const [ratio, r, g, b, a] = stop.split(',').map(Number)
        return { ratio, color: `rgba(${r}, ${g}, ${b}, ${a})` }
      })

      // 检查权重字段是否是时间字段
      const isTimeField = /^t\d{2}_\d{2}_\d{2}$/.test(this.weightField)

      // 创建核密度图层
      this.kernelDensityLayer = markRaw(new FeatureLayer({
        url: FEATURE_LAYER_URL_DEFAULT, // 使用全局 URL
        title: '核密度图层',
        definitionExpression: isTimeField ? `${this.weightField} = 1` : '', // 过滤掉值为0的点
        renderer: {
          type: 'heatmap',
          colorStops: colorStopsArray,
          blurRadius: this.kernelRadius,
          maxPixelIntensity: isTimeField ? 1 : this.maxValue, // 如果是时间字段，不限制最大值
          field: this.weightField
        }
      }))

      this.mapView.map.add(this.kernelDensityLayer)
    },
    cancelKernelDensity () {
      this.showKernelDensityPopup = false
    },
    toggleTimeSlider () {
      this.timeSliderDisabled = !this.timeSliderDisabled
      this.showTimeSlider = !this.showTimeSlider
      if (this.timeSlider) {
        this.timeSlider.disabled = this.timeSliderDisabled
        this.timeSlider.renderNow() // 触发重渲染
      }
      if (this.timeSliderDisabled && this.resultLayer) {
        this.resultLayer.definitionExpression = '' // 恢复地图要素的显示
        this.resultLayer.renderer = {
          type: 'class-breaks', // 使用分级渲染器
          field: 'result', // 基于 'result' 字段进行渲染
          classBreakInfos: [
            {
              minValue: 0,
              maxValue: 10,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#00FF00', // 绿色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '0 - 10'
            },
            {
              minValue: 10,
              maxValue: 50,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FFFF00', // 黄色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '10 - 50'
            },
            {
              minValue: 50,
              maxValue: 100,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FFA500', // 橙色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '50 - 100'
            },
            {
              minValue: 100,
              maxValue: Infinity,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FF0000', // 红色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '> 100'
            }
          ]
        }
        this.resultLayer.refresh() // 刷新图层
      }
    },
    openLoadDataPopup () {
      this.showLoadDataPopup = true
      axios.get(`${process.env.VUE_APP_API_URL}/api/get_feature_layer_dates`)
        .then(response => {
          this.availableDates = response.data.dates
          console.log('Available dates:', this.availableDates)
        })
        .catch(error => {
          console.error('Error fetching dates:', error)
        })
    },
    confirmLoadData () {
      axios.get(`${process.env.VUE_APP_API_URL}/api/get_feature_layer_url_by_date`, { params: { date: this.selectedDate } })
        .then(response => {
          const url = response.data.url
          console.log('Feature Layer URL:', url)
          this.updateFeatureLayer(url)
          this.showLoadDataPopup = false
        })
        .catch(error => {
          console.error('Error fetching URL:', error)
        })
    },
    updateFeatureLayer (url) {
      if (this.resultLayer) {
        this.mapView.map.remove(this.resultLayer)
      }
      this.resultLayer = markRaw(new FeatureLayer({
        url: url,
        title: '分析结果',
        renderer: {
          type: 'class-breaks',
          field: 'result',
          classBreakInfos: [
            {
              minValue: 0,
              maxValue: 10,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#00FF00', // 绿色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '0 - 10'
            },
            {
              minValue: 10,
              maxValue: 50,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FFFF00', // 黄色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '10 - 50'
            },
            {
              minValue: 50,
              maxValue: 100,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FFA500', // 橙色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '50 - 100'
            },
            {
              minValue: 100,
              maxValue: Infinity,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FF0000', // 红色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '> 100'
            }
          ]
        },
        popupTemplate: {
          title: '{road_name} - {result}',
          content: [{
            type: 'fields',
            fieldInfos: []
          }]
        }
      }))
      this.mapView.map.add(this.resultLayer)
    },
    cancelLoadData () {
      this.showLoadDataPopup = false
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
      // 创建 FeatureTable 实例
      this.$nextTick(() => {
        this.featureTable = new FeatureTable({
          view: this.mapView,
          layer: this.resultLayer,
          container: 'featureTableDiv'
        })
        this.$nextTick(() => {
          const featureTableDiv = document.querySelector('.feature-table')
          if (featureTableDiv) {
            featureTableDiv.style.height = '0'
          }
        })
      })
    },
    toggleFeatureTable () {
      this.showFeatureTable = !this.showFeatureTable
      this.$nextTick(() => {
        const featureTableDiv = document.querySelector('.feature-table')
        if (this.showFeatureTable) {
          if (featureTableDiv) {
            featureTableDiv.style.height = '100%'
            featureTableDiv.style.width = '100%'
          }
          const layerList = document.querySelector('.geoscene-layer-list')
          if (layerList) {
            layerList.style.maxHeight = '0'
          }
          const basemapGallery = document.querySelector('.geoscene-basemap-gallery')
          if (basemapGallery) {
            basemapGallery.style.maxHeight = '0'
          }
        } else {
          if (featureTableDiv) {
            featureTableDiv.style.height = '0'
            featureTableDiv.style.width = '0'
          }
          const layerList = document.querySelector('.geoscene-layer-list')
          if (layerList) {
            layerList.style.maxHeight = ''
          }
          const basemapGallery = document.querySelector('.geoscene-basemap-gallery')
          if (basemapGallery) {
            basemapGallery.style.maxHeight = ''
          }
        }
      })
    },
    generateFieldInfos () {
      const fields = this.resultLayer.fields.map(field => field.name)
      // 测试输出字段
      // console.log(fields)
      const timeFields = fields.filter(field => /^t\d{2}_\d{2}_\d{2}$/.test(field))

      const fixedFields = [
        { fieldName: 'pid', label: 'PID' },
        { fieldName: 'result', label: '结果' },
        { fieldName: '50lon', label: '经度' },
        { fieldName: '50lat', label: '纬度' },
        { fieldName: 'near_fid', label: '近似FID' },
        { fieldName: 'yaw', label: '偏航角' }
      ]

      const timeFieldInfos = timeFields.map(field => ({
        fieldName: field,
        label: field.replace('t', '').replace(/_/g, ':')
      }))

      // 返回所有字段
      return {
        fieldInfos: [...timeFieldInfos, ...fixedFields],
        allFields: fields
      }
    },
    // 创建地图视图
    createMapView (map, tileInfo) {
      // 创建 FeatureLayer 实例
      const featureLayer = new FeatureLayer({
        url: WHHANVILLAGE,
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
        popupEnabled: false // 禁用弹窗
        // popupTemplate: {
        //   content: [{
        //     type: 'fields',
        //     fieldInfos: [{
        //       fieldName: '县区name',
        //       label: '县区名称'
        //     }]
        //   }]
        // }
      })
      // 使用 markRaw 创建并赋值 resultLayer
      this.resultLayer = markRaw(new FeatureLayer({
        // url: 'https://www.geosceneonline.cn/server/rest/services/Hosted/result_2024_12_15_10min/FeatureServer',
        url: FEATURE_LAYER_URL_DEFAULT,
        title: '分析结果',
        renderer: {
          type: 'class-breaks', // 使用分级渲染器
          field: 'result', // 基于 'result' 字段进行渲染
          classBreakInfos: [
            {
              minValue: 0,
              maxValue: 10,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#00FF00', // 绿色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '0 - 10'
            },
            {
              minValue: 10,
              maxValue: 50,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FFFF00', // 黄色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '10 - 50'
            },
            {
              minValue: 50,
              maxValue: 100,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FFA500', // 橙色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '50 - 100'
            },
            {
              minValue: 100,
              maxValue: Infinity,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: '#FF0000', // 红色
                size: 6,
                outline: {
                  color: 'white',
                  width: 1
                }
              },
              label: '> 100'
            }
          ]
        },
        popupTemplate: {
          title: '{road_name} - {result}', // 标题为 road_name 加上 result
          content: [{
            type: 'fields',
            fieldInfos: []
          }]
        }
      }))

      // 将新的 FeatureLayer 添加到地图
      map.add(this.resultLayer)
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
        // 获取字段信息并更新 popupTemplate
        this.resultLayer.load().then(() => {
          const { fieldInfos, allFields } = this.generateFieldInfos(this.resultLayer.fields)
          this.resultLayer.popupTemplate.content[0].fieldInfos = fieldInfos
          this.availableFields = allFields // 更新 availableFields
        })
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

      // 创建 TimeSlider 实例并保存为非响应式
      const timeSlider = markRaw(new TimeSlider({
        title: '时间滑块',
        container: 'timeSliderDiv',
        view: mapView,
        disabled: this.timeSliderDisabled,
        mode: 'instant',
        layout: 'compact',
        fullTimeExtent: {
          start: new Date(2024, 11, 15, 7, 20, 0),
          end: new Date(2024, 11, 15, 17, 20, 0)
        },
        timeExtent: {
          start: new Date(2024, 11, 15, 7, 20, 0),
          end: new Date(2024, 11, 15, 7, 20, 0)
        },
        stops: {
          interval: {
            unit: 'minutes',
            value: 10
          },
          playRate: 500
        }
      }))
      this.timeSlider = timeSlider // 保存非响应式实例
      mapView.ui.add(timeSlider, 'bottom-left')

      // 在 `timeSlider.watch` 函数中添加刷新图层的逻辑
      //   timeSlider.watch('timeExtent', async (value) => {
      //     const selectedTime = value.start
      //     const hours = selectedTime.getHours().toString().padStart(2, '0')
      //     const minutes = selectedTime.getMinutes().toString().padStart(2, '0')
      //     const fieldName = `t${hours}:${minutes}:00`
      //     // 设置过滤器，只显示对应字段为1的点
      //     resultLayer.definitionExpression = `"${fieldName}" = 1`
      //     // 刷新图层以应用新的过滤器
      //     try {
      //       await resultLayer.refresh()
      //     } catch (error) {
      //       console.error('图层刷新失败:', error)
      //     }
      //   })

      // 在 `timeSlider.watch` 函数中更新渲染器
      timeSlider.watch('timeExtent', async (value) => {
        const selectedTime = value.start
        const hours = selectedTime.getHours().toString().padStart(2, '0')
        const minutes = selectedTime.getMinutes().toString().padStart(2, '0')
        const fieldName = `t${hours}:${minutes}:00`

        if (this.resultLayer) {
          // 更新渲染器基于当前时间字段
          this.resultLayer.renderer = {
            type: 'unique-value',
            field: fieldName,
            uniqueValueInfos: [
              {
                value: 1,
                symbol: {
                  type: 'simple-marker',
                  style: 'circle',
                  color: '#149ece',
                  size: 6,
                  outline: {
                    color: 'white',
                    width: 1
                  }
                },
                label: '显示'
              },
              {
                value: 2,
                symbol: {
                  type: 'simple-marker',
                  style: 'circle',
                  color: 'transparent',
                  size: 6,
                  outline: {
                    color: 'transparent',
                    width: 1
                  }
                },
                label: '隐藏'
              }
            ],
            defaultSymbol: {
              type: 'simple-marker',
              style: 'circle',
              color: 'transparent',
              size: 6,
              outline: {
                color: 'transparent',
                width: 1
              }
            }
          }

          // 刷新图层
          try {
            await this.resultLayer.refresh()
          } catch (error) {
            console.error('图层刷新失败:', error)
          }
        } else {
          console.error('resultLayer 未定义')
        }
      })
      this.mapView = mapView
      const BasemapName = this.mapView.map.basemap.title
      // BasemapName 映射
      const basemapMapping = {
        '天地图-矢量（球面墨卡托投影）': 'tianditu-vector',
        '天地图-影像（球面墨卡托投影）': 'tianditu-image',
        '天地图-地形（球面墨卡托投影）': 'tianditu-topography'
      }
      this.BasemapName = basemapMapping[BasemapName] || BasemapName
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
    }
  },
  mounted () {
    // mounted
    this.initMap()
  }

}
</script>

<style>
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

.feature-table {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(222, 222, 222, 0.45);
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.3s, width 0.3s;
}

.toolbox {
  position: absolute;
  top: 1.4%;
  left: 5px;
  height: 5.7%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  z-index: 1000; /* 确保工具箱在地图上方 */

  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
  color: rgb(109, 72, 72);
}

.help-toolbox.active {
  background-color: red; /* 激活状态背景为红色 */
}

.toolbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列 */
  grid-template-rows: repeat(2, 1fr);    /* 2行 */
  gap: 10px;                             /* 格子间距 */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(25px);
  padding: 10px;
  border-radius: 10px;
}

.toolbox-icon {
  width: 5vh; /* 限制宽度为5vh */
  height: auto; /* 等比例缩放 */
  margin-right: 5px;
}

.toolbox-text {
  font-size: 16px;
  font-weight: bold;
}

.toolbox-popup {
  position: absolute;
  top: 8vh; /* 弹窗显示在工具箱下方 */
  left: 10px;
  width: flex; /* 弹窗宽度 */
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  z-index: 1000; /* 确保弹窗在地图上方 */

  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  /* box-shadow: none !important; */
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
}

.toolbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列 */
  grid-template-rows: repeat(2, 1fr);    /* 2行 */
  gap: 10px;                             /* 格子间距 */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(25px);
  padding: 10px;
  border-radius: 10px;
}

.help-toolbox {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: antiquewhite; */
  background-color: rgb(216, 180, 133);
  /* background-color: rgba(255, 255, 255, 0.5); */
  color: rgb(109, 72, 72);
  border: 1px solid rgba(222, 222, 222, 0.45);
  cursor: pointer;
  border-radius: 5px;
  /* height: 60px; */
  aspect-ratio: 1 / 1; /* 设置为正方形 */
  white-space: normal; /* 允许换行 */
  word-break: break-all; /* 允许在任何位置换行 */
  text-align: center; /* 文本居中 */
  max-width: 4ch; /* 每行最多两个字符 */
  /* padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px; */
  padding: 5px;
  transition: background-color 0.3s;
}

.help-toolbox img {
  width: 3vh; /* 设置图标宽度为40px，调整为合适大小 */
  height: auto;
}

.help-toolbox:hover {
  background-color: rgb(253, 185, 97);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.help-toolbox.disabled {
  cursor: not-allowed; /* 禁用状态下的鼠标样式 */
  opacity: 0.5; /* 禁用状态下的透明度 */
}

.help-toolbox:hover:not(.disabled) {
  background-color: rgb(253, 185, 97);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加背景阴影 */
}

/* 弹窗覆盖层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* 弹窗内容 */
.modal-content {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  color: rgb(109, 72, 72);
  border: 1px solid rgba(222, 222, 222, 0.45);
}

.modal-content h2 {
  margin-top: 0;
}

.modal-buttons {
  margin-top: 20px;
  text-align: right;
}

.modal-buttons button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: antiquewhite;
  border: 1px solid rgba(222, 222, 222, 0.45);
  border-radius: 5px;
  color: rgb(109, 72, 72);
  cursor: pointer;
}

.modal-buttons button:hover {
  background-color: rgb(216, 180, 133);
}

.toolbox-close {
  display: flex;
  justify-content: center; /* 居中对齐 */
  margin-top: 10px;       /* 与网格有一定间距 */
}

.toolbox-close img {
  cursor: pointer;
}

.time-slider {
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px; /* 添加圆角 */
}

.tooltip {
  position: absolute;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
  color:rgb(109, 72, 72);
  /* background-color: rgba(255, 255, 255, 0.5); 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}

.tooltip h3 {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.tooltip p {
  margin: 5px 0 0;
  font-size: 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.styled-select {
  position: relative;
  padding: 8px 8px;
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  appearance: none; /* 移除默认样式 */
  background-color: white; /* 背景颜色 */
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14l-4.796-5.481C2.451 5.253 2.675 5 3.054 5h9.892c.38 0 .603.253.603.659 0 .106-.03.21-.09.301l-4.796 5.48a.537.537 0 0 1-.818 0z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  cursor: pointer;
}

/* 鼠标悬停时只改变边框颜色，不改变宽度 */
.styled-select:hover {
  border-color: rgb(109, 72, 72);
}

/* 聚焦时改变边框颜色和宽度 */
.styled-select:focus {
  border-width: 2px;
  border-color: rgb(109, 72, 72);
}

/* 以下区域无需编辑 */
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

.geoscene-time-slider {
  cursor: default;
  min-width: 45%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  /* box-shadow: none !important; */
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
  border-radius: 10px; /* 添加圆角 */

  /* 新增的样式 */
  transition: max-height 0.3s ease; /* 添加过渡效果 */
  overflow: hidden; /* 隐藏溢出内容 */
  max-height: 0%; /* 默认隐藏 */
}

/* 当显示时间滑块时的样式 */
.geoscene-time-slider.show {
  max-height: 30%;
}

.geoscene-time-slider__slider {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
  /* box-shadow: none !important; */
  border: 1px solid rgba(222, 222, 222, 0.45); /* 添加边框 */
  padding: 0 40px 0 40px;
  border-radius: 10px; /* 添加圆角 */
}

</style>

<template>
    <div class="datamanager">
      <!-- 工具箱 -->
      <div class="toolbox" @click="toggleToolbox" ref="toolbox">
        <img :src="toolboxIcon" alt="Toolbox Icon" class="toolbox-icon">
        <span class="toolbox-text">工具箱</span>
      </div>
      <!-- 工具箱网格 -->
      <div v-if="toolboxVisible" class="toolbox-popup" ref="toolboxPopup">
        <div class="toolbox-grid">
          <div class="help-toolbox" @click="openLoadDataPopup" @mouseover="startTooltipTimer('加载数据', '加载数据功能可以帮助您导入新的数据集。', $event)" @mouseleave="hideTooltip">
            <img src="@/assets/image/gis_dev_zgw_img/add_data.png" alt="加载数据">
          </div>
          <div class="help-toolbox" @click="toggleTimeSlider" :class="{ active: !timeSliderDisabled }" @mouseover="startTooltipTimer('时间滑块', '时间滑块功能可以帮助您在不同时间段之间切换。', $event)" @mouseleave="hideTooltip">
            <img src="@/assets/image/gis_dev_zgw_img/time_slider.png" alt="时间滑块">
          </div>
          <div class="help-toolbox" @click="openFilterPopup" @mouseover="startTooltipTimer('过滤器', '过滤器功能可以帮助您筛选数据。', $event)" @mouseleave="hideTooltip">
            <img src="@/assets/image/gis_dev_zgw_img/filter.png" alt="过滤功能">
          </div>
          <div class="help-toolbox" @click="openKernelDensityPopup" @mouseover="startTooltipTimer('核密度', '核密度功能可以帮助您计算数据的密度。', $event)" @mouseleave="hideTooltip">
            <img src="@/assets/image/gis_dev_zgw_img/dot_density.png" alt="密度计算">
          </div>
          <!-- <div class="help-toolbox" @click="openDataTable" @mouseover="startTooltipTimer('处理数据', '处理数据功能可以帮助您对数据进行处理。', $event)" @mouseleave="hideTooltip">
            <img src="@/assets/image/gis_dev_zgw_img/deal_data.png" alt="处理数据">
          </div> -->
          <div class="help-toolbox" @click="openDataTable" :class="dataTableIconClass" @mouseover="startTooltipTimer('处理数据', '处理数据功能可以帮助您对数据进行处理。', $event)" @mouseleave="hideTooltip">
            <img src="@/assets/image/gis_dev_zgw_img/deal_data.png" alt="处理数据">
          </div>
          <div class="help-toolbox disabled" @click="openSelectDataPopup" @mouseover="startTooltipTimer('选择数据', '选择数据功能可以帮助您选择特定的数据。', $event)" @mouseleave="hideTooltip">
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
          <div>
            <label for="clearExistingLayers">清除现有核密度图层：</label>
            <select id="clearExistingLayers" v-model="clearExistingLayers" class="styled-select">
              <option value="true">清除</option>
              <option value="false">保留</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button @click="applyKernelDensity">确定</button>
            <button @click="cancelKernelDensity">取消</button>
          </div>
        </div>
        </div>
      <!-- 弹窗3，过滤器参数 -->
      <div v-if="showFilterPopup" class="modal-overlay">
        <div class="modal-content">
          <h2>过滤器</h2>
          <div>
            <label for="filterField">字段：</label>
            <select id="filterField" v-model="filterField" class="styled-select">
              <option v-for="field in availableFields" :key="field" :value="field">{{ field }}</option>
            </select>
          </div>
          <div>
            <label for="filterOperator">操作符：</label>
            <select id="filterOperator" v-model="filterOperator" class="styled-select">
              <option value="=">等于</option>
              <option value="!=">不等于</option>
              <option value=">">大于</option>
              <option value="<">小于</option>
              <option value=">=">大于等于</option>
              <option value="<=">小于等于</option>
              <option value="contains">包含</option>
              <option value="not contains">不包含</option>
              <option value="range">范围</option>
            </select>
          </div>
          <div v-if="filterOperator !== 'range'">
            <label for="filterValue">值：</label>
            <input type="text" id="filterValue" v-model="filterValue" class="styled-select">
          </div>
          <div v-else>
            <label for="filterValueMin">最小值：</label>
            <input type="text" id="filterValueMin" v-model="filterValueMin" class="styled-select">
            <label for="filterValueMax">最大值：</label>
            <input type="text" id="filterValueMax" v-model="filterValueMax" class="styled-select">
          </div>
          <div class="modal-buttons">
            <button @click="applyFilter">确定</button>
            <button @click="cancelFilter">取消</button>
          </div>
        </div>
      </div>
      <div v-if="showSelectDataPopup" class="modal-overlay">
      <div class="modal-content">
        <h2>选择数据</h2>
        <div>
          <label for="selectMethod">选择方法：</label>
          <select id="selectMethod" v-model="selectMethod" class="styled-select">
            <option value="click">点击选择</option>
            <option value="circle">画圈选择</option>
            <option value="polygon">多边形选择</option>
            <option value="rectangle">矩形选择</option>
          </select>
        </div>
        <div class="modal-buttons">
          <button @click="confirmSelectData">确定</button>
          <button @click="cancelSelectData">取消</button>
        </div>
      </div>
    </div>
      <!-- 错误提示弹窗 -->
      <div v-if="showErrorPopup" class="modal-overlay">
        <div class="modal-content">
          <h2>错误</h2>
          <p>{{ errorMessage }}</p>
          <div class="modal-buttons">
            <button @click="closeErrorPopup">关闭</button>
          </div>
        </div>
      </div>
      <!-- 提示框 -->
      <transition name="fade">
        <div v-if="tooltipVisible" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }" class="tooltip">
          <h3>{{ tooltipTitle }}</h3>
          <p>{{ tooltipText }}</p>
        </div>
      </transition>
      <!-- 地图展示 -->
      <div id="viewDiv">
      </div>
      <!-- 时间滑块 -->
      <div id="timeSliderDiv" class="time-slider" :style="{ maxHeight: showTimeSlider ? '30%' : '0%' }">
      </div>
      <!-- 数据表格 -->
      <div v-if="showDataTable" id="dataTableDiv" class="data-table" ref="dataTable">
        <div class="resize-handle" @mousedown="startResize"></div>
      </div>
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
// 提取 classBreakInfos 到一个单独的变量
const CLASSBREAKINFOS = [
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

export default {
  name: 'DatamanagerView',
  data () {
    return {
      availableDates: [],
      availableFields: ['result', 't08:50:00'],
      BasemapName: '',
      colorStops: '0,255,255,255,0; 0.1,0,0,255,0.8; 0.3,0,255,255,0.8; 0.5,0,255,0,0.8; 0.7,255,255,0,0.8; 0.9,255,0,0,0.8; 1,139,0,0,0.8',
      clearExistingLayers: 'true',
      dataTable: null,
      dataTableVisible: false,
      dataTableActive: false,
      errorMessage: '',
      filterField: '',
      filterOperator: '=',
      filterValue: '',
      filterValueMin: '',
      filterValueMax: '',
      ismaploading: true,
      initialWidth: 0,
      initialHeight: 0,
      initialMouseX: 0,
      initialMouseY: 0,
      kernelRadius: 2,
      kernelDensityLayer: null,
      maxValue: 100,
      resultLayer: null,
      resizing: false,
      showDataTable: false,
      showKernelDensityPopup: false,
      showFilterPopup: false,
      showToolboxPopup: false,
      showLoadDataPopup: false, // 控制加载数据弹窗显示
      showTimeSlider: false, // 添加控制时间滑块显示的状态
      showSelectDataPopup: false,
      selectMethod: 'click',
      selectedDate: '',
      showErrorPopup: false,
      toolboxIcon: require('@/assets/image/gis_dev_zgw_img/Toolbox_4868.png'), // 工具箱图标路径
      tooltipVisible: false,
      tooltipTitle: '',
      tooltipText: '',
      tooltipX: 0,
      tooltipY: 0,
      tooltipTimer: null,
      toolboxVisible: false,
      timeSliderDisabled: true, // 时间滑块是否禁用，默认禁用
      timeSlider: null, // 保存 TimeSlider 实例
      weightField: ''
    }
  },
  computed: {
    dataTableIconClass () {
      return this.dataTableActive ? 'active' : ''
    }
  },
  watch: {
    // 暂时为空
  },
  methods: {
    /**
     * Starts a timer to display a tooltip after a specified delay.
     *
     * @param {string} title - The title of the tooltip.
     * @param {string} text - The text content of the tooltip.
     * @param {Event} event - The event object containing the mouse position.
     *
     * This function sets the tooltip's title, text, and position based on the mouse event.
     * It then starts a timer that will make the tooltip visible after 1 second (1000 milliseconds).
     */
    startTooltipTimer (title, text, event) {
      if (!this.toolboxVisible) {
        return
      }
      this.tooltipTitle = title
      this.tooltipText = text
      this.tooltipX = event.clientX + 10
      this.tooltipY = event.clientY + 10
      this.tooltipTimer = setTimeout(() => {
        if (this.toolboxVisible) {
          this.tooltipVisible = true
        }
      }, 1000) // 悬停一秒后显示
    },
    /**
     * Hides the tooltip by clearing the tooltip timer and setting the tooltip visibility to false.
     */
    hideTooltip () {
      clearTimeout(this.tooltipTimer)
      this.tooltipVisible = false
    },
    toggleToolbox () {
      this.toolboxVisible = !this.toolboxVisible
      if (!this.toolboxVisible) {
        this.hideTooltip()
      }
      this.$nextTick(() => {
        const toolboxPopup = this.$refs.toolboxPopup
        if (toolboxPopup) {
          toolboxPopup.style.height = this.toolboxVisible ? '150px' : '0'
          toolboxPopup.style.width = this.toolboxVisible ? '200px' : '0'
        }
      })
    },
    /**
     * Opens the select data popup.
     *
     * This function sets `showSelectDataPopup` to true, making the select data popup visible.
     */
    openSelectDataPopup () {
      this.toolboxVisible = false
      this.showSelectDataPopup = true
    },
    /**
     * Confirms the selection of data.
     *
     * This function sets up the map view for the selected method and hides the select data popup.
     */
    confirmSelectData () {
      this.showSelectDataPopup = false
      switch (this.selectMethod) {
        case 'click':
          this.enableClickSelection()
          break
        case 'circle':
          this.enableCircleSelection()
          break
        case 'polygon':
          this.enablePolygonSelection()
          break
        case 'rectangle':
          this.enableRectangleSelection()
          break
      }
    },
    /**
     * Cancels the selection of data.
     *
     * This function sets `showSelectDataPopup` to false, hiding the select data popup.
     */
    cancelSelectData () {
      this.showSelectDataPopup = false
    },
    /**
     * Enables click selection on the map view.
     */
    enableClickSelection () {
      this.mapView.on('click', (event) => {
        this.selectFeatures(event.mapPoint)
      })
    },
    /**
     * Enables circle selection on the map view.
     */
    enableCircleSelection () {
      // Implement circle selection logic here
      const draw = new this.mapView.Draw({
        view: this.mapView
      })
      const action = draw.create('circle')
      this.mapView.focus()
      action.on('draw-complete', (event) => {
        this.selectFeatures(event.geometry)
      })
    },
    /**
     * Enables polygon selection on the map view.
     */
    enablePolygonSelection () {
      // Implement polygon selection logic here
      const draw = new this.mapView.Draw({
        view: this.mapView
      })
      const action = draw.create('polygon')
      this.mapView.focus()
      action.on('draw-complete', (event) => {
        this.selectFeatures(event.geometry)
      })
    },
    /**
     * Enables rectangle selection on the map view.
     */
    enableRectangleSelection () {
      // Implement rectangle selection logic here
      const draw = new this.mapView.Draw({
        view: this.mapView
      })
      const action = draw.create('rectangle')
      this.mapView.focus()
      action.on('draw-complete', (event) => {
        this.selectFeatures(event.geometry)
      })
    },
    /**
     * Selects features based on the given geometry.
     *
     * @param {Object} geometry - The geometry to use for selection.
     */
    selectFeatures (geometry) {
      const query = this.resultLayer.createQuery()
      query.geometry = geometry
      this.resultLayer.queryFeatures(query).then((result) => {
        this.showDataTable = true
        this.dataTable.layer = this.resultLayer
        this.dataTable.features = result.features
      })
    },
    /**
     * Starts the resizing process.
     *
     * @param {MouseEvent} event - The mouse event.
     */
    startResize (event) {
      event.preventDefault()
      this.resizing = true
      this.initialWidth = this.$refs.dataTable.offsetWidth
      this.initialHeight = this.$refs.dataTable.offsetHeight
      this.initialMouseX = event.clientX
      this.initialMouseY = event.clientY
      this.$refs.dataTable.style.transition = 'none' // 移除过渡效果
      document.addEventListener('mousemove', this.resize)
      document.addEventListener('mouseup', this.stopResize)
    },
    /**
     * Resizes the data table based on mouse movement.
     *
     * @param {MouseEvent} event - The mouse event.
     */
    resize (event) {
      if (this.resizing) {
        const deltaX = this.initialMouseX - event.clientX
        const deltaY = this.initialMouseY - event.clientY
        this.$refs.dataTable.style.width = `${this.initialWidth + deltaX}px`
        this.$refs.dataTable.style.height = `${this.initialHeight + deltaY}px`
      }
    },
    /**
     * Stops the resizing process.
     */
    stopResize () {
      this.resizing = false
      this.$refs.dataTable.style.transition = 'height 0.3s, width 0.3s' // 恢复过渡效果
      document.removeEventListener('mousemove', this.resize)
      document.removeEventListener('mouseup', this.stopResize)
    },
    /**
     * Opens the data table and loads data from the current URL.
     *
     * This function sets `showDataTable` to true, making the data table visible,
     * and initializes a new FeatureTable to load data from the current URL.
     */
    openDataTable () {
      this.toolboxVisible = false
      this.dataTableVisible = !this.dataTableVisible
      this.dataTableActive = this.dataTableVisible // 更新状态变量
      this.showDataTable = true
      this.$nextTick(() => {
        if (!this.dataTable) {
          this.dataTable = new FeatureTable({
            view: this.mapView,
            layer: this.resultLayer,
            container: 'dataTableDiv'
          })
        }
        const dataTableDiv = document.querySelector('.data-table')
        if (dataTableDiv) {
          dataTableDiv.style.height = this.dataTableVisible ? '50%' : '0'
          dataTableDiv.style.width = this.dataTableVisible ? '60%' : '0'
        }
      })
    },
    /**
     * Applies kernel density analysis to the map view.
     *
     * This function performs the following steps:
     * 1. Hides the kernel density popup.
     * 2. Parses the color gradient string into an array of color stops.
     * 3. Checks if the weight field is a time field.
     * 4. Clears existing kernel density layers if specified.
     * 5. Creates a new kernel density layer with the appropriate settings.
     * 6. Adds the new kernel density layer to the map view.
     *
     * The kernel density layer is created using a global URL and is configured
     * with a heatmap renderer. The renderer settings include color stops, blur
     * radius, maximum pixel intensity, and the weight field.
     *
     * The title of the layer is determined based on whether the weight field is
     * a time field. If it is, the title includes the weight field; otherwise, it
     * includes the current time.
     */
    applyKernelDensity () {
      this.showKernelDensityPopup = false
      // 解析颜色渐变字符串
      const colorStopsArray = this.colorStops.split(';').map(stop => {
        const [ratio, r, g, b, a] = stop.split(',').map(Number)
        return { ratio, color: `rgba(${r}, ${g}, ${b}, ${a})` }
      })

      // 检查权重字段是否是时间字段
      const isTimeField = /^t\d{2}_\d{2}_\d{2}$/.test(this.weightField)

      // 清除现有核密度图层
      if (this.clearExistingLayers === 'true') {
        this.mapView.map.layers.forEach(layer => {
          if (layer.title && layer.title.startsWith('核密度图层')) {
            this.mapView.map.remove(layer)
          }
        })
      }

      // 创建核密度图层
      const currentTime = new Date().toLocaleTimeString('zh-CN', { hour12: false })
      const layerTitle = isTimeField ? `核密度图层 - ${this.weightField}` : `核密度图层 - ${currentTime}`
      this.kernelDensityLayer = markRaw(new FeatureLayer({
        url: FEATURE_LAYER_URL_DEFAULT, // 使用全局 URL
        title: layerTitle,
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
    /**
     * Opens the kernel density popup.
     *
     * This function sets `showKernelDensityPopup` to true, making the kernel density popup visible.
     */
    openKernelDensityPopup () {
      this.toolboxVisible = false
      this.showKernelDensityPopup = true
    },
    /**
     * Closes the kernel density popup.
     *
     * This function sets `showKernelDensityPopup` to false, hiding the kernel density popup.
     */
    cancelKernelDensity () {
      this.showKernelDensityPopup = false
    },
    /**
     * Closes the error popup.
     *
     * This function sets `showErrorPopup` to false, hiding the error popup.
     */
    closeErrorPopup () {
      this.showErrorPopup = false
    },
    /**
     * Applies a filter to the result layer based on the selected field, operator, and value.
     *
     * This function constructs a definition expression based on the selected field, operator, and value,
     * and applies the filter to the result layer. It then refreshes the layer to reflect the changes.
     */
    openFilterPopup () {
      this.showFilterPopup = true
      this.toolboxVisible = false
    },
    /**
     * Closes the filter popup.
     *
     * This function sets `showFilterPopup` to false, hiding the filter popup.
     */
    cancelFilter () {
      this.showFilterPopup = false
    },
    /**
     * Applies the filter to the feature layer.
     *
     * This function constructs a filter expression based on the selected field, operator, and value(s),
     * and updates the feature layer's definition expression to apply the filter.
     */
    applyFilter () {
      this.showFilterPopup = false
      let expression = ''
      try {
        if (!this.filterField) {
          throw new Error('请选择一个字段')
        }
        if (!this.filterOperator) {
          throw new Error('请选择一个操作符')
        }
        if (this.filterOperator === 'range') {
          if (!this.filterValueMin || !this.filterValueMax) {
            throw new Error('请填写范围的最小值和最大值')
          }
          if (isNaN(this.filterValueMin) || isNaN(this.filterValueMax)) {
            throw new Error('范围过滤器的值必须是数字')
          }
          expression = `${this.filterField} >= ${this.filterValueMin} AND ${this.filterField} <= ${this.filterValueMax}`
        } else if (this.filterOperator === 'contains' || this.filterOperator === 'not contains') {
          if (!this.filterValue) {
            throw new Error('请填写过滤值')
          }
          if (typeof this.filterValue !== 'string') {
            throw new Error('包含过滤器的值必须是字符串')
          }
          expression = this.filterOperator === 'contains'
            ? `${this.filterField} LIKE '%${this.filterValue}%'`
            : `${this.filterField} NOT LIKE '%${this.filterValue}%'`
        } else {
          if (!this.filterValue) {
            throw new Error('请填写过滤值')
          }
          if (isNaN(this.filterValue)) {
            throw new Error('比较操作符的值必须是数字')
          }
          expression = `${this.filterField} ${this.filterOperator} ${this.filterValue}`
        }
        this.resultLayer.definitionExpression = expression
        this.resultLayer.refresh()
      } catch (error) {
        this.errorMessage = error.message
        this.showErrorPopup = true
      }
    },
    /**
     * Toggles the visibility and state of the time slider.
     *
     * This function switches the state of `timeSliderDisabled` and `showTimeSlider` between true and false,
     * effectively enabling/disabling and showing/hiding the time slider. It also updates the result layer's
     * renderer and definition expression based on the state of the time slider.
     */
    toggleTimeSlider () {
      this.toolboxVisible = false
      this.timeSliderDisabled = !this.timeSliderDisabled
      this.showTimeSlider = !this.showTimeSlider
      this.showToolboxPopup = !this.showToolboxPopup
      if (this.timeSlider) {
        this.timeSlider.disabled = this.timeSliderDisabled
        this.timeSlider.renderNow() // Trigger re-render
      }
      if (this.timeSliderDisabled && this.resultLayer) {
        this.resultLayer.definitionExpression = '' // Reset the definition expression
        this.resultLayer.renderer = {
          type: 'class-breaks', // Use class breaks renderer
          field: 'result', // Render based on the 'result' field
          classBreakInfos: CLASSBREAKINFOS
        }
        this.resultLayer.refresh() // Refresh the layer
      }
    },
    /**
     * Opens the load data popup.
     *
     * This function sets `showLoadDataPopup` to true, making the load data popup visible.
     * It also fetches available dates for the feature layer from the API and updates the `availableDates` state.
     */
    openLoadDataPopup () {
      this.showLoadDataPopup = true
      this.toolboxVisible = false
      axios.get(`${process.env.VUE_APP_API_URL}/api/get_feature_layer_dates`)
        .then(response => {
          this.availableDates = response.data.dates
          console.log('Available dates:', this.availableDates)
        })
        .catch(error => {
          console.error('Error fetching dates:', error)
        })
    },
    /**
     * Confirms the loading of data.
     *
     * This function fetches the feature layer URL for the selected date from the API,
     * updates the feature layer with the new URL, and hides the load data popup.
     */
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
    /**
     * Updates the feature layer with a new URL.
     *
     * This function removes the existing feature layer (if any), creates a new feature layer with the given URL,
     * updates the renderer and popup template, and adds the new feature layer to the map view.
     * It also loads the field information and updates the `availableFields` state.
     *
     * @param {string} url - The URL of the new feature layer.
     */
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
          classBreakInfos: CLASSBREAKINFOS
        },
        popupTemplate: {
          title: '{road_name} - {result}',
          content: [{
            type: 'fields',
            fieldInfos: []
          }]
        }
      }))
      // 加载字段信息并更新 popupTemplate
      this.resultLayer.load().then(() => {
        const { fieldInfos, allFields } = this.generateFieldInfos(this.resultLayer.fields)
        this.resultLayer.popupTemplate.content[0].fieldInfos = fieldInfos
        this.availableFields = allFields // 更新 availableFields
      })
      this.mapView.map.add(this.resultLayer)
    },
    /**
     * Cancels the loading of data.
     *
     * This function sets `showLoadDataPopup` to false, hiding the load data popup.
     */
    cancelLoadData () {
      this.showLoadDataPopup = false
    },
    /**
     * Initializes the map.
     *
     * This function creates a new map with a specified basemap and spatial reference.
     * It then creates a map view and a feature table, and sets up the initial state of the feature table.
     */
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
    /**
     * Generates field information for the result layer.
     *
     * This function extracts field names from the result layer, filters time fields,
     * and creates an array of field information objects. It returns an object containing
     * field information and all field names.
     *
     * @returns {Object} An object containing fieldInfos and allFields.
     */
    generateFieldInfos () {
      const fields = this.resultLayer.fields.map(field => field.name)
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
        fieldInfos: [...fixedFields, ...timeFieldInfos],
        allFields: fields
      }
    },
    /**
     * Creates the map view.
     *
     * This function creates a new map view with specified map and tile information.
     * It adds feature layers, initializes various widgets, and sets up event listeners
     * for the map view.
     *
     * @param {Object} map - The map object.
     * @param {Object} tileInfo - The tile information object.
     * @returns {Object} The created map view.
     */
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
          classBreakInfos: CLASSBREAKINFOS
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
    /**
     * Handles the basemap change event.
     *
     * This function maps the basemap title to a corresponding internal name,
     * updates the `BasemapName` state, and modifies the URL parameters to reflect the new basemap.
     *
     * @param {Object} basemap - The basemap object containing the title of the selected basemap.
     */
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
  width: 0; /* 初始宽度为0 */
  height: 0; /* 初始高度为0 */
  overflow: hidden;
  transition: height 0.3s ease, width 0.3s ease; /* 添加过渡效果 */
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  z-index: 1000; /* 确保弹窗在地图上方 */
  background-color: rgba(255, 255, 255, 0.5) !important; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px) !important; /* 应用毛玻璃效果 */
  border: none !important;
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

.help-toolbox.active {
  background-color: red; /* 激活状态背景为红色 */
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

.data-table {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 50%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(222, 222, 222, 0.45);
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.3s, width 0.3s;
}

.resize-handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: nwse-resize;
  z-index: 1001;
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

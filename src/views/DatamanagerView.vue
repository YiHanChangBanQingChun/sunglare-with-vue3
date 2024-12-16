<template>
    <div class="datamanager">
      <!-- 工具箱图标和文字 -->
      <div class="toolbox" @click="toggleToolbox">
        <img :src="toolboxIcon" alt="工具箱图标" class="toolbox-icon">
        <span class="toolbox-text">工具箱</span>
      </div>
      <!-- 弹窗 -->
      <div v-if="showToolboxPopup" class="toolbox-popup">
        <p>这是一个工具箱弹窗</p>
      </div>
      <!-- 地图展示 -->
      <div id="viewDiv"></div>
    </div>
  </template>

<script>
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

export default {
  name: 'DatamanagerView',
  data () {
    return {
      // data
      toolboxIcon: require('@/assets/image/gis_dev_zgw_img/Toolbox_4868.png'), // 工具箱图标路径
      showToolboxPopup: false // 控制弹窗显示
    }
  },
  methods: {
    // methods
    // 切换工具箱弹窗显示状态
    toggleToolbox () {
      this.showToolboxPopup = !this.showToolboxPopup
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

.toolbox {
  position: absolute;
  top: 10px;
  left: 10px;
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
  width: 200px; /* 弹窗宽度 */
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
</style>

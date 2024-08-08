<template>
<div class="home">
    <!-- <img alt="Vue logo" src="/icon.png"> -->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <!-- <div class="text">
    <h1>武汉市实时炫光状况（目前用于实验调用面在地图上显示）</h1>
    </div> -->
    <div id="viewDiv"></div>
</div>
</template>

<script>
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js'
import SpatialReference from '@geoscene/core/geometry/SpatialReference.js'
import TileInfo from '@geoscene/core/layers/support/TileInfo.js'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer'
import Search from '@geoscene/core/widgets/Search'
// import BasemapToggle from '@geoscene/core/widgets/BasemapToggle'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery'
// @ is an alias to /src
export default {
  name: 'HomeView',
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      const map = new Map({
        basemap: 'tianditu-vector' // Basemap layer service
      })
      // 加载武汉的poi图层，目前情况是本地托管太难加载，点太多，部署到geoscene online上好很多
      // 给了一块钱一个月凑合用
      // 实在不行到时候直接写多几页视图，用数据库查询，逻辑和路径规划的查询差不多
      const wuhanLayer = new FeatureLayer({
        // url: 'https://localhost:6443/geoscene/rest/services/wuhan84/MapServer' // 武汉面服务，本地
        // url: 'https://edutrial.geoscene.cn/geoscene/rest/services/Hosted/wuhan_rd/FeatureServer' // 武汉路网，arcgis online的
        url: 'https://www.geosceneonline.cn/server/rest/services/Hosted/wuhanpoi84/FeatureServer', // 武汉poi，arcgis online的
        popupTemplate: {
          title: '{地名}——{标签}——{地址}',
          content: [{
            type: 'fields',
            fieldInfos: [
              { fieldName: '地址', label: '地址' },
              { fieldName: '地名', label: '地名' },
              { fieldName: 'WGS84纬', label: 'WGS84纬度' },
              { fieldName: 'WGS84经', label: 'WGS84经度' },
              { fieldName: '百度索', label: '百度索引' },
              { fieldName: '百度纬', label: '百度纬度' },
              { fieldName: '百度经', label: '百度经度' },
              { fieldName: '标签', label: '标签' }
            ]
          }]
        }
      })
      // 定义坐标系
      const spatialReference = new SpatialReference({
        wkid: 4326
      })
      // 创建瓦片信息
      const tileInfo = TileInfo.create({
        spatialReference,
        numLODs: 32
      })
      // 将MapView的创建封装在一个函数内部，以避免ESLint警告
      this.createMapView(map, tileInfo)
      // 添加武汉图层到地图上
      map.add(wuhanLayer)
      const mapView = this.createMapView(map, TileInfo.create({ spatialReference: new SpatialReference({ wkid: 4326 }), numLODs: 32 }))
      // const basemapToggle = new BasemapToggle({
      //   view: mapView, // 确保这里使用的是你的MapView实例
      //   nextBasemap: 'tianditu-image'
      // })
      // 设置弹出窗口的停靠位置
      mapView.popup.dockOptions = {
        position: 'top-left'
      }
      // 创建Search实例
      const searchWidget = new Search({
        view: mapView, // 确保这里使用的是你的MapView实例
        sources: [{
          layer: wuhanLayer,
          searchFields: ['地名', '地址'], // 根据你的需求配置搜索字段
          displayField: '地名',
          exactMatch: false, // 精确匹配
          outFields: ['*'],
          name: '武汉POI搜索',
          placeholder: '搜索武汉的点...'
        }]
      })
      // 创建BasemapGallery实例
      const basemapGallery = new BasemapGallery({
        view: mapView, // 确保这里使用的是你的MapView实例
        source: {
          query: {
            title: '"Basemaps for Developers" AND owner:geoscenedev'
          }
        }
      })

      // 将BasemapToggle添加到地图视图
      // mapView.ui.add(basemapToggle, 'bottom-right')
      // 将BasemapGallery添加到地图视图
      mapView.ui.add(basemapGallery, 'bottom-right')
      // 将Search小部件添加到地图视图
      mapView.ui.add(searchWidget, {
        position: 'top-left',
        index: 2
      })
      mapView.ui.move('zoom', 'bottom-left')
    },
    // 创建地图视图
    createMapView (map, tileInfo) {
      return new MapView({
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
            // 框选区域
          },
          minScale: 500,
          maxScale: 2000000,
          // 限制比例尺范围
          rotationEnabled: false,
          lods: tileInfo.lods,
          snapToZoom: false
        }
      })
    }
  }
}
</script>

<style scoped>
#viewDiv {
  position: fixed; /* 固定定位 */
  top: 0; /* 紧贴网页顶部 */
  height: 100vh; /* 将高度设置为视口高度的100% */
  width: 100vw; /* 将宽度设置为视口宽度的100% */
  z-index: -1; /* 设置较低的z-index值，使其在App.vue的下部分 */
  /*margin: auto;*/
}

.lu-jing-gui-hua {
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  align-items: flex; /* 水平居中对齐子元素 */
}

.text > h1 {
  text-align: center; /* 文本居中 */
  background: -webkit-linear-gradient(rgba(238,174,202,1), rgba(148,187,233,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* 对于非WebKit浏览器的兼容 */
}

.text {
  margin-top: 5px; /* 顶部外边距 */
  margin-bottom: 5px; /* 底部外边距 */
  background: rgba(109, 72, 72, 0.45);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 15px; /* 添加圆角 */
  padding: 20px; /* 内边距 */
  text-align: left /* 文本居中 */
}

.search-containers {
  display: flex;
  flex-direction: column; /* 保持垂直排列 */
  justify-content: flex-start; /* 从顶部开始排列 */
  align-items: flex-start; /* 子元素沿交叉轴的开始边缘对齐，即顶部对齐 */
  width: 50%; /* 设置一个固定宽度 */
  padding: 10px; /* 根据需要调整，确保搜索框周围有足够空间 */
  background-color: #f0f0f0; /* 背景颜色稍微深于白色 */
  border-radius: 10px; /* 添加圆角边框 */
  border: 1px solid #ccc; /* 添加边框 */
  margin-bottom: 10px;
  position: relative; /* 添加相对定位 */
}

/* 移除左右外边距 */
.search-container.start,
.search-container.end {
  position: relative; /* 设置相对定位 */
  margin: 0; /* 移除左右外边距 */
  margin-top: 10px;
}

.search-box {
  padding: 8px 15px; /* 初始内边距 */
  border: 2px solid #ccc;
  border-radius: 20px;
  outline: none;
  flex-grow: 1;
  box-sizing: border-box;
  text-indent: 0px; /* 初始文本缩进，保持文本在左侧 */
  width: 180%; /* 使搜索框填充容器 */
}

/* 鼠标悬停时只改变边框颜色，不改变宽度 */
.search-box:hover {
  border-color: blue; /* 改变边框颜色而不是宽度 */
}

.search-box:focus {
  padding-right: 60px; /* 聚焦时增加右侧内边距，使框向右变长 */
  border-width: 2px;
  border-color: blue;
  transition: padding-right 0.3s ease, border-color 0.3s ease; /* 平滑过渡效果 */
  text-indent: 0px; /* 聚焦时减少文本缩进 */
}

.search-results {
  position: absolute;
  top: 100%; /* 确保列表紧贴搜索框的底部 */
  left: 0;
  width: 100%; /* 使列表宽度与搜索框相同 */
  background-color: white; /* 或其他背景色，确保列表可见 */
  z-index: 1000; /* 确保搜索结果列表在其他元素之上 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 可选：添加一些阴影以提升视觉效果 */
  max-height: 160px; /* 限制最大高度，5行大约160px，根据实际行高调整 */
  overflow-y: auto; /* 超出部分显示滚动条 */
}

.search-results li:hover {
  text-decoration: underline; /* 添加下划线 */
  background-color: #f0f0f0; /* 更改背景颜色以提高对比度 */
  cursor: pointer; /* 更改鼠标指针为手形，更明显地指示可点击 */
}

/* 查询按钮的容器样式 */
.search-action {
  display: flex;
  flex-direction: column; /* 修改为列布局 */
  justify-content: flex-end; /* 使按钮靠右对齐 */
  flex-grow: 1; /* 允许容器扩展填满剩余空间 */
  align-self: flex-end; /* 使自己靠父容器的右边 */
  margin-top: auto; /* 推到底部 */
  position: absolute; /* 绝对定位 */
  right: 10px; /* 与右边界保持一定距离 */
  bottom: 10px; /* 与底部保持一定距离 */
}

/* 查询按钮样式 */
.search-action button {
  padding: 10px 20px; /* 按钮内边距 */
  background-color: #007bff; /* 按钮背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  margin-top: 10px; /* 在按钮之间添加一些间距 */
}

/* 鼠标悬停在按钮上时的样式 */
.search-action button:hover {
  background-color: #0056b3; /* 按钮背景颜色变深 */
}

/* 第一个按钮（重新选择）不需要顶部间距 */
.search-action button:first-child {
  margin-top: 0;
}

/* 将CSS链接转换为@import语句 */
@import url("https://js.geoscene.cn/4.27/@geoscene/core/assets/geoscene/themes/light/main.css");
</style>

<template>
  <!-- 输入了起点和终点之后,还没有摁查询路径的画面 -->
  <div class="lu-jing-gui-hua">
    <!-- 搜索框 -->
    <!-- 外层容器 -->
    <div class="search-containers">
      <!-- 交换的侧边栏 -->
      <div class="revert-containers">
        <div class="car"><img src="https://wx3.sinaimg.cn/orj360/008tIcISgy1hsgyr8gzsjj300o00odfl.jpg"></div>
        <div class="swap-action">
          <!-- 绑定 swap 方法到点击事件 -->
          <button @click="swap" title="切换起终点">
            <img src="https://wx1.sinaimg.cn/orj360/008tIcISgy1hsiz7qtw48j301s01sq2p.jpg" alt="revert" style="width: 22px; height: 25px;">
          </button>
        </div>
      </div>
      <!-- 搜索起点的容器 -->
      <div class="search-container start">
        <!-- 图片 -->
        <div class="search-icon-wrapper">
          <img src="https://wx1.sinaimg.cn/orj360/008tIcISgy1hsgyr8gv8dj300f00f0oh.jpg" alt="pink">
        </div>
        <!-- 输入框 -->
        <input type="text" v-model="searchQueryStart" @input="onSearchInputChange($event, true)" placeholder="请输入起点" class="search-box search-box-start"/>
        <!-- 搜索框内部的删除图片 -->
        <span class="search-box-img">
          <div class="delete" title="清空" @click="clc1">
            <img src="https://wx2.sinaimg.cn/orj360/008tIcISgy1hsnss2ckv4j300k00k0m1.jpg" alt="delete1">
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
          <img src="https://wx4.sinaimg.cn/orj360/008tIcISgy1hsgyr8got8j300f00f0o9.jpg" alt="green">
        </div>
        <!-- 输入框 -->
        <input type="text" v-model="searchQueryEnd" @input="onSearchInputChange($event, false)" placeholder="请输入终点" class="search-box search-box-end"/>
         <!-- 搜索框内部的删除图片 -->
        <span class="search-box-img">
          <div class="delete" title="清空" @click="clc2">
            <img src="https://wx2.sinaimg.cn/orj360/008tIcISgy1hsnss2ckv4j300k00k0m1.jpg" alt="delete1">
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
          <img src="https://wx4.sinaimg.cn/mw2000/008tIcISgy1hsq1fw9ob9j300w00w3ya.jpg" alt="search">
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
import MapView from '@geoscene/core/views/MapView.js' // 确保这个路径正确，或者检查是否正确安装了相关npm包
import SpatialReference from '@geoscene/core/geometry/SpatialReference.js'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer.js'
// import Point from '@geoscene/core/geometry/Point.js'
import TileInfo from '@geoscene/core/layers/support/TileInfo.js'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery.js'
import Compass from '@geoscene/core/widgets/Compass.js'
// import { search } from 'core-js/fn/symbol'
import { nextTick } from 'vue'
// @ is an alias to /src
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
      selectedTime: ''// 用户选择的时间
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
    onTimeInputChange (event) {
      const value = event.target.value
      const [hours, minutes] = value.split(':').map(Number)
      const roundedMinutes = Math.floor(minutes / 10) * 10
      this.selectedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`
    },
    isDateDisabled (date) {
      if (!date) return false
      const selected = new Date(date)
      const month = selected.getMonth() + 1 // 月份从0开始
      const day = selected.getDate()

      if (month >= 1 && month <= 7 && day !== 15) {
        return true
      }
      if (month === 8 && day <= 20) {
        return true
      }
      if (month >= 10 && month <= 12 && day !== 15) {
        return true
      }
      return false
    },
    handleDateChange (event) {
      const date = event.target.value
      if (this.isDateDisabled(date)) {
        alert('选择的日期未进行模拟，请选择其他日期。可选日期为，1-7月的15日，8月20日-9月30日，10-12月的15日。')
        this.selectedDate = ''
      }
    },
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
    updateTime () {
      const now = new Date()
      this.selectedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
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
            time: this.selectedTime
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
            time: this.selectedTime
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
      const compass = new Compass({
        view: mapView
      })
      // 将 BasemapGallery 添加到地图视图的右上角
      mapView.ui.add(basemapGallery, 'bottom-right')
      // 移动缩放控件到左下角
      mapView.ui.move('zoom', 'bottom-left')
      // 将指南针添加到地图视图的左下角
      mapView.ui.add(compass, 'bottom-left')
      return mapView
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
  background: #FFFFFF; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-top-left-radius: 10px; /* 设置圆角 */
  border-top-right-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.45); /* 添加边框 */
  position: absolute; /* 添加相对定位 */
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
  border-color: blue; /* 改变边框颜色而不是宽度 */
}

.search-box:focus {
  border-width: 2px;
  border-color: blue;
  text-indent: 0px; /* 聚焦时减少文本缩进 */
}

.search-results {
  position: absolute;
  z-index: 9999 !important; /* !important可以使这个css代码优先执行，让这个框显示为最高层级 */
  top: 105%; /* 确保列表紧贴搜索框的底部 */
  left: 0;
  width: 100%; /* 使列表宽度与搜索框相同 */
  background-color: white; /* 或其他背景色，确保列表可见 */
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
  top: 13px; /* 与底部保持一定距离 */
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
.revert-containers{
  position: absolute; /* 或使用 fixed，根据需要 */
  left: 0; /* 侧边栏靠在最左边 */
  top: 0; /* 根据需要调整垂直位置 */
  width: 20px;
  height:85px;
  padding-left:5px;
  background-color: #FFFFFF;
  border-radius: 10px; /* 设置圆角 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}
.swap-action button {
  display:flex;
  flex-direction: row; /* 保持水平排列 */
  justify-content: flex-start; /* 水平排列的子元素靠左对齐 */
  position: absolute;
  left: 5px; /* 图标距离父容器左边的距离 */
  top: 50%; /* 垂直居中对齐 */
  transform: translateY(-50%); /* 使用transform属性垂直居中 */
  border:white;/* 边框颜色设置为白色 */
  padding:0px;
  background-color: #FFFFFF;
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
  width: 390px;
  height: 30px;
  border-bottom-left-radius: 10px; /* 设置圆角 */
  border-bottom-right-radius: 10px;
  background-color:#FFFFFF;
  margin-top: 90px;/* 控制时间选择框在网页垂直方向的位置 */
  padding-left: 10px;
  padding-top: 3px;
}
.form-group label,
.form-group input {
  margin-right: 10px; /* 右侧外边距 */
}

.search-results li.highlighted {
  background-color: #f0f0f0; /* 高亮背景颜色 */
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
  background: rgba(255, 255, 255, 0.8); /* 可选：添加半透明背景 */
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
</style>

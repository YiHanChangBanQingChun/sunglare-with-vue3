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
        <div class="search-results" v-if="searchResults.length && searchQueryStart">
        <ul>
          <li v-for="(result, index) in searchResults" :key="index" @click="selectResult(result, true)">
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
        <div class="search-results" v-if="searchResultsEnd.length && searchQueryEnd">
          <ul>
            <li v-for="(result, index) in searchResultsEnd" :key="index" @click="selectResult(result, false)">
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
  <div id="viewDiv"></div>
  <!-- 时间选择框和路径展示框 -->
  <div class="main-container">
    <!-- 时间选择框 -->
    <div class="choose-time">
      <div class="form-group">
        <label for="date-input">选择日期：</label>
        <input id="date-input" type="date" v-model="selectedDate">
        <label for="time-input">选择时间：</label>
        <input id="time-input" type="time" v-model="selectedTime">
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
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
      selectedDate: '', // 用户选择的日期
      selectedTime: ''// 用户选择的时间
    }
  },

  mounted () {
    // 初始化地图
    this.initMap()
    if (this.$route.query.start && this.$route.query.end) {
      // 如果URL中有起点和终点参数，解析并设置
      this.selectedResultStart = JSON.parse(this.$route.query.start)
      this.selectedResultEnd = JSON.parse(this.$route.query.end)
    }
    // 解析URL参数
    this.parseUrlParams()
    this.selectedDate = new Date().toISOString().substring(0, 10)
    this.selectedTime = new Date().toISOString().substring(11, 16)
    // 更新时间选择器为当前时间
    this.updateTime()

    // 设置定时器，每隔1分钟更新时间
    setInterval(() => { this.updateTime() }, 60000)
  },
  methods: {
    // 更新时间，日期
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
          end: JSON.stringify(this.selectedResultEnd)
        }
      })
    },
    // 解析URL参数
    parseUrlParams () {
      const urlParams = new URLSearchParams(window.location.search)
      const startParam = urlParams.get('start')
      const endParam = urlParams.get('end')
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
          t: Date.now() // 添加时间戳
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
        // 发送请求到后端进行路径规划
        axios.post(`${process.env.VUE_APP_API_URL}/api/route/plan`, { start: startWithLocation, end: endWithLocation })
          .then(response => {
            // 后端返回的路径规划结果ID
            const routePlanId = response.data.id
            console.log('路径规划结果ID:', routePlanId)

            // 隐藏加载动画
            this.isLoading = false

            // 使用Vue Router跳转到结果页面，并传递路径规划结果ID
            this.$router.push({
              path: '/lu-jing-gui-hua/route',
              query: {
                start: JSON.stringify(startWithLocation),
                end: JSON.stringify(endWithLocation),
                id: routePlanId
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
        basemap: 'tianditu-vector' // 使用适合的底图
      })

      // 创建MapView实例
      this.view = new MapView({
        container: 'viewDiv', // 使用正确的容器ID
        map: map,
        center: [114.3, 30.7], // 使用中心点坐标
        zoom: 4,
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
      // 移动缩放控件到左下角
      this.view.ui.move('zoom', 'bottom-left')
      // 创建GraphicsLayer实例
      const graphicsLayer = new GraphicsLayer()
      map.add(graphicsLayer)

      this.drawPoints(graphicsLayer)
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

<style>
/*之后要自己调样式的大小，这个仅作参考*/
#viewDiv {
  position: fixed; /* 固定定位 */
  top: 0; /* 紧贴网页顶部 */
  height: 100vh; /* 将高度设置为视口高度的100% */
  width: 200vh; /* 将宽度设置为视口宽度的100% */
  z-index: -1; /* 设置较低的z-index值，使其在App.vue的下部分 */
  margin: auto;
}

.lu-jing-gui-hua {
  position: fixed; /* 固定定位 */
  display: flex;
  flex-direction: row; /* 使子元素垂直排列,使大框和revert小框水平分布 */
  align-items: flex; /* 水平居中对齐子元素 */
}

.search-containers {
  display: flex;
  flex-direction: column; /* 保持垂直排列 */
  justify-content: flex-start; /* 从顶部开始排列 */
  align-items: flex-start; /* 子元素沿交叉轴的开始边缘对齐，即顶部对齐 */
  width: 165px; /* 设置一个固定宽度 */
  padding-right: 10px; /* 根据需要调整，确保搜索框周围有足够空间 */
  padding-left:32px;/*整个搜索框的左边空间*/
  padding-top: 8px;
  padding-bottom: 10px;
  background: #FFFFFF; /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 设置圆角 */
  border: 1px solid rgba(255, 255, 255, 0.45); /* 添加边框 */
  margin-bottom: 10px;
  position: relative; /* 添加相对定位 */
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
  top: 95%; /* 确保列表紧贴搜索框的底部 */
  left: 0;
  width: 180%; /* 使列表宽度与搜索框相同 */
  background-color: white; /* 或其他背景色，确保列表可见 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 可选：添加一些阴影以提升视觉效果 */
  max-height: 150px; /* 限制最大高度，5行大约160px，根据实际行高调整 */
  overflow-y: auto; /* 超出部分显示滚动条 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  z-index: 9999 !important;/* !important可以使这个css代码优先执行，让这个框显示为最高层级 */
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
  z-index: 1000; /* 确保侧边栏在其他元素上方 */
  width: 30px;
  height:99px;
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
  z-index: 1000; /* 确保图片在输入框之上 */
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

/* 选择时间框的样式 */
.choose-time{
  overflow-y: auto; /* 超出部分显示滚动条 */
  z-index: 1000; /* 确保侧边栏在其他元素上方 */
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center;
  margin-bottom: 10px; /* 根据需要添加外边距 */
  width: 400px;
  height: auto;
  background-color:#FFFFFF;
  border-radius: 10px; /* 设置圆角 */
}
.form-group label,
.form-group input {
  margin-right: 10px; /* 右侧外边距 */
  margin-top: 100px;/* 控制时间选择框在网页垂直方向的位置 */
}

/* 路线展示框的样式 */
.routelist{
  display: flex;
  flex-direction: column; /* 垂直排列 */
  left: 8px; /* 侧边栏靠在最左边 */
  margin-top: 10px; /* 控制路线展示框在网页垂直方向的位置 */
  width: 400px;
  height: auto;
  background-color: #FFFFFF;
  border-radius: 10px; /* 设置圆角 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
}
.cardlist{
  padding:8px;
}
.route{
  left: 8px; /* 距离左侧的距离 */
  width:348px;
  height: auto;
  border-radius: 10px; /* 设置圆角 */
  border: 2px solid #E4E6E7;
  padding: 25px 20px 10px 15px;
  cursor: pointer;
  margin: 0 0 10px;
}
.route:hover{
  border-color: blue;
}
.introduction{
  color: #3385FF;
}
.intro span{
  margin-right: 10px; /* 右侧外边距 */
}
</style>

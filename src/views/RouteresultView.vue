<template>
<div class="lu-jing-gui-hua">
  <div class="text">
    <h1>这个页面是放选中两点后的</h1>
  </div>
    <!-- 搜索框 -->
    <!-- 外层容器 -->
    <div class="search-containers">
     <div class="search-container start">
        <input type="text" v-model="searchQueryStart" @input="onSearchInputChange($event, true)" placeholder="搜索起点..." class="search-box search-box-start"/>
        <div class="search-results" v-if="searchResults.length && searchQueryStart">
        <ul>
            <li v-for="(result, index) in searchResults" :key="index" @click="selectResult(result, true)">
            {{ result.name }}
            </li>
        </ul>
        </div>
    </div>
    <div class="search-container end">
        <input type="text" v-model="searchQueryEnd" @input="onSearchInputChange($event, false)" placeholder="搜索终点..." class="search-box search-box-end"/>
        <div class="search-results" v-if="searchResultsEnd.length && searchQueryEnd">
        <ul>
            <li v-for="(result, index) in searchResultsEnd" :key="index" @click="selectResult(result, false)">
            {{ result.name }}
            </li>
        </ul>
        </div>
    </div>
    <div class="search-action">
      <button @click="clcSearch">重新选择</button>
        <button @click="onSearch">查询路径</button>
    </div>
    </div>
    <!-- 地图容器 -->
    <div id="mapViewDiv" style="height: 560px;"></div>
</div>
</template>

<script>
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js'
import Graphic from '@geoscene/core/Graphic'
import Point from '@geoscene/core/geometry/Point.js'
import GraphicsLayer from '@geoscene/core/layers/GraphicsLayer'
import axios from 'axios'

export default {
  name: 'RouteResultView',
  data () {
    return {
      selectedResultStart: null,
      selectedResultEnd: null,
      searchResults: [],
      searchResultsEnd: [],
      searchQueryStart: '',
      searchQueryEnd: ''
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
  },
  methods: {
    // 跳转到路径规划页面，清空搜索框
    clcSearch () {
      // 使用Vue Router进行页面跳转
      this.$router.push('/lu-jing-gui-hua')
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
        fetch('http://127.0.0.1:5000/search', {
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
      // 根据isStart参数选择起点或终点
      if (isStart) {
        this.selectedResultStart = simplifiedResult
        this.searchQueryStart = simplifiedResult.name
        this.searchResults = []
        // 跳转到结果页面，带上起点信息
        this.$router.push({
          path: '/lu-jing-gui-hua/intermediate-page',
          query: {
            start: JSON.stringify(simplifiedResult)
          }
        })
      } else {
        // 选择终点
        this.selectedResultEnd = simplifiedResult
        this.searchQueryEnd = simplifiedResult.name
        this.searchResultsEnd = []
        // 跳转到结果页面，带上终点信息
        this.$router.push({
          path: '/lu-jing-gui-hua/intermediate-page',
          query: {
            end: JSON.stringify(simplifiedResult)
          }
        })
      }
    },
    // 处理路径规划事件
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
        // 发送请求到后端进行路径规划
        axios.post('http://127.0.0.1:5000/api/route/plan', { start: startWithLocation, end: endWithLocation })
          .then(response => {
            // 后端返回的路径规划结果ID
            const routePlanId = response.data.id
            console.log('路径规划结果ID:', routePlanId)
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
        container: 'mapViewDiv', // 使用正确的容器ID
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
          color: 'green',
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
  height: 100vh; /* 将高度设置为视口高度的80% */
  width: 98vw; /* 将宽度设置为视口宽度的80% */
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
  width: 180%; /* 使列表宽度与搜索框相同 */
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

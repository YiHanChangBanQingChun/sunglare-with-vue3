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
          <div class="delete1" title="清空" @click="clc1">
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
          <div class="delete1" title="清空" @click="clc2">
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
  <div id="viewDiv"></div>
  <!-- 分别显示起点和终点选中结果的代码 -->
   <!-- 这个是初始调试用的，这个界面不跳转时是可以用的，目前已经荒废
  <div v-if="selectedResultStart" class="selected-result-start">
    <h2>起点搜索结果:</h2>
    <p>地址: {{ selectedResultStart.address }}</p>
    <p>百度索引: {{ selectedResultStart.baidu_index }}</p>
    <p>百度纬度: {{ selectedResultStart.baidu_latitude }}</p>
    <p>百度经度: {{ selectedResultStart.baidu_longitude }}</p>
    <p>ID: {{ selectedResultStart.id }}</p>
    <p>标签: {{ selectedResultStart.label }}</p>
    <p>名称: {{ selectedResultStart.name }}</p>
    <p>WGS84纬度: {{ selectedResultStart.wgs84_latitude }}</p>
    <p>WGS84经度: {{ selectedResultStart.wgs84_longitude }}</p>
  </div>
  <div v-if="selectedResultEnd" class="selected-result-end">
    <h2>终点搜索结果:</h2>
    <p>地址: {{ selectedResultEnd.address }}</p>
    <p>百度索引: {{ selectedResultEnd.baidu_index }}</p>
    <p>百度纬度: {{ selectedResultEnd.baidu_latitude }}</p>
    <p>百度经度: {{ selectedResultEnd.baidu_longitude }}</p>
    <p>ID: {{ selectedResultEnd.id }}</p>
    <p>标签: {{ selectedResultEnd.label }}</p>
    <p>名称: {{ selectedResultEnd.name }}</p>
    <p>WGS84纬度: {{ selectedResultEnd.wgs84_latitude }}</p>
    <p>WGS84经度: {{ selectedResultEnd.wgs84_longitude }}</p>
  </div> -->
</template>

<script>
// 确保这里的路径是正确的，根据你的项目结构和npm包的安装情况
import Map from '@geoscene/core/Map.js'
import MapView from '@geoscene/core/views/MapView.js' // 确保这个路径正确，或者检查是否正确安装了相关npm包
import SpatialReference from '@geoscene/core/geometry/SpatialReference.js'
// import Point from '@geoscene/core/geometry/Point.js'
import TileInfo from '@geoscene/core/layers/support/TileInfo.js'
// import { search } from 'core-js/fn/symbol'

// @ is an alias to /src
export default {
  name: 'RouteplanningView',
  data () {
    return {
      searchQueryStart: '',
      searchQueryEnd: '',
      searchResults: [],
      searchResultsEnd: [],
      selectedResultStart: null, // 添加这行
      selectedResultEnd: null // 添加这行
    }
  },
  mounted () {
    this.initMap()
  },

  methods: {
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
    // selectResult (result, isStart = true) {
    //   console.log('用户选择了搜索结果:', result)
    //   if (isStart) {
    //     this.selectedResultStart = result // 修正这行
    //     this.searchQueryStart = result.name
    //     this.searchResults = []
    //   } else {
    //     this.selectedResultEnd = result // 这行已经正确
    //     this.searchQueryEnd = result.name
    //     this.searchResultsEnd = []
    //   }
    // },
    // 处理用户选择搜索结果的事件
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
            start: JSON.stringify(simplifiedResult)
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
            end: JSON.stringify(simplifiedResult)
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
            end: JSON.stringify(endWithLocation)
          }
        })
      } else {
        // 如果起点或终点未选择，可以在这里显示提示信息
        alert('请确保起点和终点都已选择。')
      }
    },

    // 创建地图视图
    createMapView (map, tileInfo) {
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
      mapView.ui.move('zoom', 'bottom-left') // 移动缩放控件到左下角
      return mapView
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
  width: 100vw; /* 将宽度设置为视口宽度的100% */
  z-index: -1; /* 设置较低的z-index值，使其在App.vue的下部分 */
  margin: auto;
}

.lu-jing-gui-hua {
  display: flex;
  flex-direction: row; /* 使子元素垂直排列,使大框和revert小框水平分布 */
  align-items: flex; /* 水平居中对齐子元素 */
}

.text {
  margin-top: 5px; /* 顶部外边距 */
  margin-bottom: 5px; /* 底部外边距 */
  background: rgba(109, 72, 72, 0.45);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  padding: 20px; /* 内边距 */
  text-align: left /* 文本居中 */
}

.search-containers {
  display: flex;
  flex-direction: column; /* 保持垂直排列 */
  justify-content: flex-start; /* 从顶部开始排列 */
  align-items: flex-start; /* 子元素沿交叉轴的开始边缘对齐，即顶部对齐 */
  width: 27%; /* 设置一个固定宽度 */
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
  top: 0vh;
}

/* 移除左右外边距 */
.search-container.start,
.search-container.end {
  position: relative; /* 设置相对定位 */
  margin-top: 5px;
  padding-left: 0px; /* 留出图片的空间 */
  margin-left: 24px; /* 根据侧边栏宽度来设置左边距 */
}

.search-box {
  position: relative; /* 允许绝对定位的子元素 */
  padding: 8px 8px; /* 初始内边距 */
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  flex-grow: 1;
  box-sizing: border-box;
  text-indent: 0px; /* 初始文本缩进，保持文本在左侧 */
  width: 180%; /* 使搜索框填充容器 */
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
  top: 100%; /* 确保列表紧贴搜索框的底部 */
  left: 0;
  width: 180%; /* 使列表宽度与搜索框相同 */
  background-color: white; /* 或其他背景色，确保列表可见 */
  z-index: 1000; /* 确保搜索结果列表在其他元素之上 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 可选：添加一些阴影以提升视觉效果 */
  max-height: 160px; /* 限制最大高度，5行大约160px，根据实际行高调整 */
  overflow-y: auto; /* 超出部分显示滚动条 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
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
  right: 8px; /* 与右边界保持一定距离 */
  top: 13px; /* 与底部保持一定距离 */
  border: 2px solid  #ccc;
  justify-content: flex-start;
  border-radius: 10px;
}

/* 将CSS链接转换为@import语句 */
@import url("https://js.geoscene.cn/4.27/@geoscene/core/assets/geoscene/themes/light/main.css");

.car{
  padding-top:3px;
  left:1px;
}
.revert-containers{
  position: absolute; /* 或使用 fixed，根据需要 */
  left: 0; /* 侧边栏靠在最左边 */
  top: 0; /* 根据需要调整垂直位置 */
  z-index: 10; /* 确保侧边栏在其他元素上方 */
  width: 30px;
  height:102px;
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
  background-color: white;
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

.search-icon-wrapper {
  display: inline-block; /* 或者使用 flex 布局 */
  position: absolute; /* 绝对定位 */
  left: -20px; /* 根据需要调整 */
  top: 50%;
  transform: translateY(-50%); /* 垂直居中对齐 */
}

.search-box-img {
  position: absolute;
  right: -140px; /* 距离输入框右侧的距离 */
  top: 50%;
  transform: translateY(-35%); /* 垂直居中对齐 */
  z-index: 1; /* 确保图片在输入框之上 */
  padding-inline-end: 0px;
}

.delete1 img {
  pointer-events: none; /* 点击图片时不会影响输入框 （记得改成删除这个框框内容）*/
}

.search-action img {
  transform: scale(0.85); /* 将图片缩放到原始尺寸的50% */
}
.search-action:hover{
  border-color: blue;
}

</style>

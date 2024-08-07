<template>
  <div class="xuan-guang-qing-kuang">
    <!-- <div class="text">
      <h1>这里放眩光的信息图表</h1>
    </div> -->
  </div>
  <div class="select-container">
    <select v-model="selectedDistrict" @change="handleDistrictChange">
    <option v-for="district in districts" :key="district.code" :value="district.code">
      {{ district.name }}
    </option>
  </select>
  </div>
  <div class="echarts-wrapper">
    <!-- 这里放echarts的图 -->
    <div ref="echartsRef" class="echarts-container">
    </div>
    <div class="echarts-container" id="main">
    </div>

  </div>
  <!-- 画了个表格出来 -->
  <div class="weather">
  <h3>武汉市天气信息</h3>
  <div v-if="weatherInfos.length > 0">
    <table>
      <thead>
        <tr>
          <th>区域代码</th>
          <th>天气现象</th>
          <th>实时气温</th>
          <th>风向</th>
          <th>风力</th>
          <th>空气湿度</th>
          <th>数据发布时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in weatherInfos" :key="index">
          <td>{{ info.city }}</td>
          <td>{{ info.weather }}</td>
          <td>{{ info.temperature }}°C</td>
          <td>{{ info.winddirection }}</td>
          <td>{{ info.windpower }}级</td>
          <td>{{ info.humidity }}</td>
          <td>{{ info.reporttime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>加载天气信息中...</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts/core'
// 合并导入 BarChart 和 GaugeChart
import { BarChart, GaugeChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  BarChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
])

export default {
  name: 'SunglareView',
  data () {
    return {
      // weatherInfo: null,
      intervalid: null,
      // 定时器 ID
      weatherInfos: [], // 存储多个区域的天气信息
      districts: [
        { code: '420100', name: '武汉市' },
        { code: '420102', name: '江岸区' },
        { code: '420103', name: '江汉区' },
        { code: '420104', name: '硚口区' },
        { code: '420105', name: '汉阳区' },
        { code: '420106', name: '武昌区' },
        { code: '420107', name: '青山区' },
        { code: '420111', name: '洪山区' },
        { code: '420112', name: '东西湖区' },
        { code: '420113', name: '汉南区' },
        { code: '420114', name: '蔡甸区' },
        { code: '420115', name: '江夏区' },
        { code: '420116', name: '黄陂区' },
        { code: '420117', name: '新洲区' }
      ],
      selectedDistrict: null,
      currentTemperature: null
    }
  },
  mounted () {
    this.initEcharts()
    // 调试信息
    console.log('Echarts is mounted')
    // 420100 是武汉市的区划代码，其他区域的区划代码可以参考高德地图的行政区划代码
    const districts = [
      '420100', '420102', '420103',
      '420104', '420105', '420106',
      '420107', '420111', '420112',
      '420113', '420114', '420115',
      '420116', '420117'
    ]
    // this.fetchWeatherInfo()
    districts.forEach(district => {
      this.fetchWeatherInfo(district)
    })
    // 每隔 1 分钟刷新一次天气信息，默认是武汉市的天气信息
    this.intervalid = setInterval(() => {
      this.fetchWeatherInfo('420100')
    }, 60000)
    this.fetchWeatherInfo('420100')
    // 初始化图表
    echarts.use([GaugeChart, CanvasRenderer])
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
    const option = {
      // ECharts配置项
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: 'greeen'
          },
          progress: {
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 0,
            color: '#999',
            fontSize: 10
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 20,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'green'
          },
          data: [
            {
              value: 20
            }
          ]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: ''
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: 20
            }
          ]
        }
      ]
    }
    // 使用配置项初始化图表
    option && myChart.setOption(option)
    setInterval(() => {
      // 每隔2秒更新一次图表
      if (this.currentTemperature !== null) {
        myChart.setOption({
          series: [
            {
              data: [
                { value: this.currentTemperature } // 使用实际温度值更新图表
              ]
            },
            {
              data: [
                { value: this.currentTemperature } // 使用实际温度值更新图表
              ]
            }
          ]
        })
      }
    }, 2000)
  },
  // 在组件销毁前清除定时器
  beforeUnmount () {
    if (this.intervalid) {
      clearInterval(this.intervalid)
      console.log('清除定时器')
      // 清除定时器
    }
  },
  methods: {
    // 处理区域选择变化
    handleDistrictChange () {
      clearInterval(this.intervalid)
      console.log('选择的区域:', this.selectedDistrict)
      this.fetchWeatherInfo(this.selectedDistrict)
      this.intervalid = setInterval(() => {
        this.fetchWeatherInfo(this.selectedDistrict)
      }, 60000)
    },
    // 初始化Echarts
    initEcharts () {
      const myChart = echarts.init(this.$refs.echartsRef)
      myChart.setOption({
        title: {
          text: '太阳眩光状况'
        },
        tooltip: {},
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [{
          name: '眩光强度',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    // 获取天气信息
    async fetchWeatherInfo (district) {
      // 统计用区划代码名称
      const districtNames = {
        420100: '武汉市',
        420102: '江岸区',
        420103: '江汉区',
        420104: '硚口区',
        420105: '汉阳区',
        420106: '武昌区',
        420107: '青山区',
        420111: '洪山区',
        420112: '东西湖区',
        420113: '汉南区',
        420114: '蔡甸区',
        420115: '江夏区',
        420116: '黄陂区',
        420117: '新洲区'
      }
      // 打印选择的区域信息
      console.log(`选择的区域: ${districtNames[district] || '未知区域'} (${district})`)
      // 高德地图的天气查询接口，30万一天，够用
      const key = '6fcbe57360a4a9ba6bccb06ac366a3bc'
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${district}&key=${key}&extensions=base`
      // 发送GET请求获取天气信息
      try {
        const response = await axios.get(url)
        if (response.data.status === '1' && response.data.lives && response.data.lives.length > 0) {
          const weatherInfo = response.data.lives[0]
          const index = this.weatherInfos.findIndex(info => info.city === weatherInfo.city)
          if (index !== -1) {
            // 如果已存在，更新该区域的天气信息
            this.weatherInfos[index] = weatherInfo
          } else {
            // 如果不存在，添加新的天气信息
            this.weatherInfos.push(weatherInfo)
          }
          this.updateWeatherInfo(weatherInfo)
          console.log('获取天气信息成功:', weatherInfo)
        } else {
          console.error('获取天气信息失败:', response.data.info)
        }
      } catch (error) {
        console.error('请求天气信息发生错误:', error)
      }
    },
    updateWeatherInfo (weatherInfo) {
      // 更新温度值
      this.currentTemperature = parseFloat(weatherInfo.temperature)
    }
  }
}
</script>

<style>
.xuan-guang-qing-kuang {
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  align-items: center; /* 水平居中对齐子元素 */
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
  text-align: left; /* 文本居中 */
  width: 98%; /* 使容器宽度充满父容器 */
}

.echarts-container {
  width: 25vw; /* 或其他具体的像素值 */
  height: 25vh; /* 或其他具体的像素值 */
}

.weather {
  display: flex; /* 使用Flexbox布局 */
  justify-content: center; /* 在主轴（水平方向）上居中 */
  align-items: center; /* 在交叉轴（垂直方向）上居中 */
  flex-direction: column; /* 子元素垂直排列 */
  width: 100%; /* 使容器宽度充满父容器 */
  text-align: center; /* 文本居中，影响到所有的表格单元 */
}

.weather th, .weather td {
  text-align: center; /* 单独确保表头和单元格文本居中 */
}

.weather h3 {
  text-align: center; /* 标题文本居中 */
}

/* 新增echarts父容器样式 */
.echarts-wrapper {
  display: flex;
  flex-direction: row; /* 确保子元素水平排列 */
  justify-content: center; /* 子元素在主轴上居中对齐 */
  align-items: center; /* 子元素在交叉轴上居中对齐 */
  margin-top: 10vh; /* 向下移动20px，可以根据需要调整这个值 */
}

.select-container {
  display: flex; /* 使用Flexbox布局 */
  justify-content: flex-start; /* 水平靠左 */
  align-items: flex-start; /* 垂直靠上 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 距离顶部0 */
  left: 0; /* 距离左侧0 */
  margin: 20px; /* 添加一些外边距 */
  width: 30% ;
}

select {
  width: 50%; /* 增加宽度 */
  padding: 10px; /* 增加内边距，使其更好点击 */
  border: 1px solid #ccc; /* 设置边框颜色 */
  border-radius: 5px; /* 边框圆角 */
  background-color: white; /* 背景色 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 添加一些阴影效果 */
  font-size: 16px; /* 文字大小 */
}

</style>

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
    <div ref="zhuzhuangtu" class="echarts-container">
    </div>
    <div class="echarts-container" id="yibiaopan">
    </div>
    <div ref="polarChart" class="echarts-container">
    </div>
  </div>
  <!-- 画了个表格出来 -->
  <!-- <div class="weather">
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
</div> -->
</template>

<script>
import axios from 'axios'
import { toRaw } from 'vue'
import * as echarts from 'echarts/core'
import {
  LegendComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import {
  LineChart,
  BarChart,
  GaugeChart,
  ScatterChart // 引入 ScatterChart
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  BarChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  PolarComponent,
  LineChart,
  ScatterChart // 注册 ScatterChart
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
      currentTemperature: null,
      polarChart: null, // 极坐标图
      solarData: [], // 当前时间的太阳位置数据
      solarTrajectoryData: [], // 当天的太阳轨迹数据
      barChart: null // 柱状图
    }
  },
  async mounted () {
    this.initzhuzhuangtu()
    console.log('Echarts is mounted')
    await this.fetchWeatherInfo(this.selectedDistrict) // 默认加载武汉市的天气信息
    this.intervalid = setInterval(() => {
      this.fetchWeatherInfo(this.selectedDistrict)
    }, 60000)
    this.inityibiaopan(this.selectedDistrict) // 传入默认区域名称
    this.initPolarChart() // 初始化极坐标图
    const areaName = '武汉市' // 替换为实际的区域名称
    await this.fetchSolarAngles(areaName)
    await this.fetchSolarAnglesDay(areaName)
  },
  beforeUnmount () {
    if (this.intervalid) {
      clearInterval(this.intervalid)
      console.log('清除定时器')
    }
  },
  methods: {
    handleDistrictChange () {
      clearInterval(this.intervalid)
      console.log('选择的区域:', this.selectedDistrict)
      this.fetchWeatherInfo(this.selectedDistrict)
      this.fetchStatistics(this.selectedDistrict)
      this.intervalid = setInterval(() => {
        this.fetchWeatherInfo(this.selectedDistrict)
      }, 60000)
    },
    initzhuzhuangtu () {
      this.barChart = echarts.init(this.$refs.zhuzhuangtu)
      this.barChart.setOption({
        title: {
          text: '眩光占比',
          left: 'center'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [{
          name: '百分比',
          type: 'bar',
          data: []
        }]
      })
    },
    updatezhuzhuangtu (data, currentMonth) {
      const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      const seriesData = data.map(item => {
        const total = item.count
        const monthData = [
          item.t01, item.t02, item.t03, item.t04, item.t05, item.t06,
          item.t07, item.t08, item.t09, item.t10, item.t11, item.t12
        ]
        return monthData.map((value, index) => ({
          value: (value / total * 100).toFixed(2),
          itemStyle: index === currentMonth - 1 ? { color: 'red' } : {}
        }))
      }).flat()
      this.barChart.setOption({
        xAxis: { data: xAxisData },
        series: [{ data: seriesData }]
      })
    },
    async fetchStatistics (district = null) {
      try {
        const url = new URL(`${process.env.VUE_APP_API_URL}/api/statistics`)
        if (district) {
          url.searchParams.append('district', district)
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (data) {
          const currentMonth = new Date().getMonth() + 1
          this.updatezhuzhuangtu(data, currentMonth)
        } else {
          console.error('获取统计数据失败:', data.info)
        }
      } catch (error) {
        console.error('请求统计数据发生错误:', error)
      }
    },
    inityibiaopan (areaName) {
      const chartDom = document.getElementById('yibiaopan')
      const myChart = echarts.init(chartDom)
      console.log('初始化仪表盘:', areaName)
      const option = {
        title: {
          text: '实时温度',
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bolder',
            color: '#333'
          }
        },
        tooltip: {
          formatter: function (params) {
            return `城市: ${areaName}<br/>${params.seriesName}: ${params.value}°C `
          }
        },
        series: [
          {
            name: '温度',
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: -5,
            max: 40,
            splitNumber: 9,
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
                width: 30,
                color: [
                  [1, '#e0e0e0'] // 初始状态为灰色
                ]
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
              fontSize: 13
            },
            anchor: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, '70%'],
              fontSize: 16,
              fontWeight: 'bolder',
              color: '#333',
              left: 'center',
              top: 'top',
              formatter: () => `当前市的实时温度\n${areaName}`
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
            name: '温度',
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: -5,
            max: 40,
            itemStyle: {
              color: ''
            },
            progress: {
              show: false,
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
      myChart.setOption(option)
      setInterval(() => {
        if (this.currentTemperature !== null) {
          let color = 'green'
          if (this.currentTemperature < 10) {
            color = 'blue'
          } else if (this.currentTemperature > 28) {
            color = 'orange'
          }
          myChart.setOption({
            series: [
              {
                data: [{ value: this.currentTemperature }],
                itemStyle: { color: color },
                detail: { color: color },
                axisLine: {
                  lineStyle: {
                    color: [
                      [this.currentTemperature / 40, color],
                      [1, '#e0e0e0']
                    ]
                  }
                }
              },
              {
                data: [{ value: this.currentTemperature }],
                itemStyle: { color: color }
              }
            ]
          })
        }
      }, 2000)
    },
    async fetchSolarAngles (areaName) {
      console.log('获取当前时间的太阳角度信息:', areaName)
      const time = new Date().toISOString()
      // const date = new Date() //
      // date.setHours(13) //
      // date.setMinutes(8) //
      // const time = date.toISOString() //
      const url = `${process.env.VUE_APP_API_URL}/api/solar_angles?area_name=${encodeURIComponent(areaName)}&time=${time}`
      console.log('请求太阳角度信息:', url)
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          const solarInfo = await response.json()
          this.solarData = [solarInfo]
          console.log('Solar Data:', this.solarData) // 添加这行
          this.updatePolarChart(areaName)
          console.log('获取太阳角度信息成功:', solarInfo)
        } else {
          const errorData = await response.json()
          console.error('获取太阳角度信息失败:', errorData.message)
        }
      } catch (error) {
        console.error('请求太阳角度信息发生错误:', error)
      }
    },
    async fetchSolarAnglesDay (areaName) {
      console.log('获取一天内的太阳角度轨迹信息:', areaName)
      const date = new Date().toISOString().split('T')[0]
      const url = `${process.env.VUE_APP_API_URL}/api/solar_angles_day?area_name=${encodeURIComponent(areaName)}&date=${date}`
      console.log('请求太阳角度信息:', url)
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          const solarInfo = await response.json()
          this.solarTrajectoryData = solarInfo.map(item => ({
            solarAzimuth: item.solar_azimuth,
            solarAltitude: item.solar_altitude,
            isSunrise: item.is_sunrise,
            isSunset: item.is_sunset
          }))
          this.updatePolarChart(areaName)
          console.log('获取太阳角度信息成功:', solarInfo)
        } else {
          const errorData = await response.json()
          console.error('获取太阳角度信息失败:', errorData.message)
        }
      } catch (error) {
        console.error('请求太阳角度信息发生错误:', error)
      }
    },
    initPolarChart () {
      this.polarChart = echarts.init(this.$refs.polarChart)
      this.updatePolarChart()
    },
    updatePolarChart (areaName = '') {
      const rawData = toRaw(this.solarData)
      const option = {
        title: {
          text: `${areaName}太阳高度角和方位角`,
          fontSize: 16,
          left: 'center',
          top: 'top'
        },
        legend: {
          data: ['当前太阳角度', '太阳轨迹'],
          left: 'center',
          bottom: '0%'
        },
        polar: {
          center: ['50%', '53%'],
          radius: '63%'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return `${params.seriesName}<br/>区名: ${areaName}<br/>高度角: ${params.value[0]}<br/>方位角: ${params.value[1]}`
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0,
          clockwise: false,
          min: 0,
          max: 360
        },
        radiusAxis: {
          min: 0,
          max: 90
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: '当前太阳角度',
            type: 'scatter',
            data: rawData.map(item => [item.solar_altitude, item.solar_azimuth]),
            itemStyle: {
              color: 'purple'
            },
            markLine: {
              symbol: 'none',
              lineStyle: {
                type: 'dashed',
                color: 'pink'
              },
              data: rawData.map(item => [
                { coord: [0, 0] },
                { coord: [item.solar_altitude, item.solar_azimuth] }
              ])
            }
          },
          {
            coordinateSystem: 'polar',
            name: '太阳轨迹',
            type: 'line',
            data: this.solarTrajectoryData.map(item => [item.solarAltitude, item.solarAzimuth]),
            itemStyle: {
              color: 'blue'
            },
            markPoint: {
              data: this.solarTrajectoryData.filter(item => item.isSunrise || item.isSunset).map(item => ({
                coord: [item.solarAltitude, item.solarAzimuth],
                name: item.isSunrise ? '日出' : '日落',
                value: item.isSunrise ? '日出' : '日落'
              }))
            }
          }
        ]
      }
      console.log('ECharts Option:', option) // 添加这行
      this.polarChart.setOption(option)
    },
    async fetchWeatherInfo (district) {
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
      console.log(`选择的区域: ${districtNames[district] || '未知区域'} (${district})`)

      const key = '6fcbe57360a4a9ba6bccb06ac366a3bc'
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${district}&key=${key}&extensions=base`

      try {
        const response = await axios.get(url)
        if (response.data.status === '1' && response.data.lives && response.data.lives.length > 0) {
          const weatherInfo = response.data.lives[0]
          const index = this.weatherInfos.findIndex(info => info.city === weatherInfo.city)
          if (index !== -1) {
            this.weatherInfos[index] = weatherInfo
          } else {
            this.weatherInfos.push(weatherInfo)
          }
          this.updateWeatherInfo(weatherInfo)
          this.updatezhuzhuangtu()
          console.log('获取天气信息成功:', weatherInfo)
          this.inityibiaopan(districtNames[district]) // 更新仪表盘
          await this.fetchSolarAngles(districtNames[district])
          await this.fetchSolarAnglesDay(districtNames[district])
        } else {
          console.error('获取天气信息失败:', response.data.info)
        }
      } catch (error) {
        console.error('请求天气信息发生错误:', error)
      }
    },
    updateWeatherInfo (weatherInfo) {
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
  background: rgba(255, 255, 255, 0.65);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 15px; /* 添加圆角 */
  padding: 20px; /* 内边距 */
  text-align: left; /* 文本居中 */
  width: 98%; /* 使容器宽度充满父容器 */
}

.echarts-container {
  width: 90%; /* 每个图表占据90%的宽度 */
  height: 30vh; /* 每个图表占据30%的高度 */
  margin: 5px 5px; /* 添加垂直方向的外边距 */
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  background: rgba(255, 255, 255, 0.65); /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 毛玻璃效果 */
  backdrop-filter: blur(25px); /* 毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
}

.weather {
  display: flex; /* 使用Flexbox布局 */
  justify-content: center; /* 在主轴（水平方向）上居中 */
  align-items: center; /* 在交叉轴（垂直方向）上居中 */
  flex-direction: column; /* 子元素垂直排列 */
  width: 100%; /* 使容器宽度充满父容器 */
  text-align: center; /* 文本居中，影响到所有的表格单元 */
  background: rgba(255, 255, 255, 0.65); /* 应用深色毛玻璃效果 */
  -webkit-backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  backdrop-filter: blur(25px); /* 应用毛玻璃效果 */
  border-radius: 10px; /* 添加圆角边框 */
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
  flex-direction: column; /* 确保子元素垂直排列 */
  justify-content: flex-start; /* 子元素在主轴上靠左对齐 */
  align-items: center; /* 子元素在交叉轴上居中对齐 */
  width: 30%; /* 父容器占据30%的宽度 */
  height: 100vh; /* 父容器占据整个视口高度 */
  margin-top: 7vh; /* 向下移动20px，可以根据需要调整这个值 */
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

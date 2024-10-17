<template>
  <div class="container">
    <div class="select-container">
      <select v-model="selectedDistrict" @change="handleDistrictChange">
        <option v-for="district in districts" :key="district.code" :value="district.code">
          {{ district.name }}
        </option>
      </select>
    </div>
    <div class="content-wrapper">
      <div class="echarts-wrapper">
        <!-- 这里放echarts的图 -->
        <div ref="zhuzhuangtu" class="echarts-container"></div>
        <div class="echarts-container" id="yibiaopan"></div>
        <div ref="polarChart" class="echarts-container"></div>
      </div>
      <div class="geoscene-wrapper">
        <div v-if="isLoading" class="loader-plot-overlay">
          <div class="loader-plot">
          </div>
        </div>
        <iframe :src="iframeSrc" frameborder="0" class="geoscene-iframe" @load="onIframeLoad"></iframe>
        <div class="combobox-container">
          <select v-model="selectedDate" @change="handleDateChange">
            <option value="" disabled hidden >请选择需要查询眩光信息的日期</option>
            <option v-for="date in availableDates" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
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
      iframeSrc: '',
      isLoading: false,
      selectedDistrict: 420100,
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
      currentTemperature: null,
      polarChart: null, // 极坐标图
      solarData: [], // 当前时间的太阳位置数据
      solarTrajectoryData: [], // 当天的太阳轨迹数据
      barChart: null, // 柱状图
      apiKey: '',
      selectedOption: null,
      selectedDate: '', // 初始为空
      availableDates: [] // 可用日期
    }
  },
  watch: {
    selectedDistrict (newVal) {
      const district = this.districts.find(d => d.code === newVal)
      if (district) {
        this.inityibiaopan(district.name)
      }
    }
  },
  async mounted () {
    this.initzhuzhuangtu()
    await this.fetchIframeUrl()
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
    await this.fetchApiKey()
    this.fetchAvailableDates()
  },
  beforeUnmount () {
    if (this.intervalid) {
      clearInterval(this.intervalid)
      console.log('清除定时器')
    }
  },
  methods: {
    // 获取可用日期
    async fetchAvailableDates () {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/get_dates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (data.dates) {
          this.availableDates = data.dates
        } else {
          console.error('No dates found in response')
        }
      } catch (error) {
        console.error('Error fetching available dates:', error)
      }
    },
    async fetchIframeUrlByDate (date) {
      this.isLoading = true // 开始加载动画
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/get_url_by_date?date=${date}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (data.url) {
          this.iframeSrc = data.url
          console.log('获取到的iframe URL:', this.iframeSrc)
        } else {
          console.error('URL not found in response')
          this.isLoading = false // 如果没有找到 URL，停止加载动画
        }
      } catch (error) {
        console.error('Error fetching iframe URL:', error)
        this.isLoading = false // 如果发生错误，停止加载动画
      }
    },
    // 获取 默认的iframe URL
    async fetchIframeUrl () {
      this.isLoading = true // 开始加载动画
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/getapp`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (data.url) {
          this.iframeSrc = data.url
          console.log('获取到的iframe URL:', this.iframeSrc)
        } else {
          console.error('URL not found in response')
          this.isLoading = false // 如果没有找到 URL，停止加载动画
        }
      } catch (error) {
        console.error('Error fetching iframe URL:', error)
        this.isLoading = false // 如果发生错误，停止加载动画
      }
    },
    handleDateChange (event) {
      const selectedDate = event.target.value
      this.fetchIframeUrlByDate(selectedDate)
    },
    // 检查 iframe 是否加载完成
    onIframeLoad () {
      this.isLoading = false // iframe 加载完成，停止加载动画
    },
    // 处理区域选择变化事件
    handleDistrictChange () {
      clearInterval(this.intervalid)
      console.log('选择的区域:', this.selectedDistrict)
      this.fetchWeatherInfo(this.selectedDistrict)
      this.fetchStatistics(this.selectedDistrict)
      this.intervalid = setInterval(() => {
        this.fetchWeatherInfo(this.selectedDistrict)
      }, 60000)
    },
    // 处理右键点击事件
    initzhuzhuangtu () {
      this.barChart = echarts.init(this.$refs.zhuzhuangtu)
      this.barChart.setOption({
        title: {
          text: '街景眩光占比',
          left: 'center'
        },
        tooltip: {
          formatter: function (params) {
            if (params.seriesName === '百分比') {
              return `${params.name}: ${params.value} %`
            } else {
              return `${params.name}: ${params.value} 张`
            }
          }
        },
        grid: {
          left: '15%', // 向右移动
          top: '28%' // 向下移动
        },
        xAxis: {
          type: 'category',
          data: [] // 默认设置为空
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{
          name: '百分比',
          type: 'bar',
          data: []
        }]
      })
      // 初始化时加载静态数据
      this.updateStaticChart()
    },
    // 更新柱状图
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
        title: {
          text: '眩光占比',
          left: 'center'
        },
        tooltip: {
          formatter: function (params) {
            return `${params.name}: ${params.value} %`
          }
        },
        xAxis: { data: xAxisData },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [{ data: seriesData }]
      })
    },
    // 更新静态图表
    updateStaticChart () {
      const staticData = [
        { name: '东西湖区', count: 11107 },
        { name: '新洲区', count: 5825 },
        { name: '武昌区', count: 12242 },
        { name: '汉南区', count: 1800 },
        { name: '汉阳区', count: 13977 },
        { name: '江夏区', count: 22063 },
        { name: '江岸区', count: 11125 },
        { name: '江汉区', count: 6207 },
        { name: '洪山区', count: 37107 },
        { name: '硚口区', count: 7510 },
        { name: '蔡甸区', count: 14146 },
        { name: '青山区', count: 3176 },
        { name: '黄陂区', count: 5073 }
      ]
      const xAxisData = staticData.map(item => item.name)
      const seriesData = staticData.map(item => item.count)
      this.barChart.setOption({
        title: {
          text: '各区街景图片数',
          left: 'center'
        },
        tooltip: {
          formatter: function (params) {
            return `${params.name}: ${params.value} 张`
          }
        },
        xAxis: {
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转45度
            interval: 0 // 显示所有标签
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{ data: seriesData, type: 'bar' }]
      })
    },
    // 获取统计数据
    async fetchStatistics (district = null) {
      try {
        if (!district || district === '420100') {
          this.updateStaticChart()
          return
        }
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
    // 初始化仪表盘
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
          formatter: (params) => {
            return `城市: ${areaName}<br/>${params.seriesName}: ${params.value}°C `
          }
        },
        series: [
          {
            name: '温度',
            type: 'gauge',
            center: ['50%', '68%'],
            startAngle: 200,
            endAngle: -20,
            min: -5,
            max: 40,
            splitNumber: 9,
            itemStyle: {
              color: 'green'
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
              fontSize: 14,
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
    // 获取当前时间的太阳角度信息
    async fetchSolarAngles (areaName) {
      console.log('获取当前时间的太阳角度信息:', areaName)
      const time = new Date().toISOString()
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
    // 获取一天内的太阳角度轨迹信息
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
    // 初始化极坐标图
    initPolarChart () {
      this.polarChart = echarts.init(this.$refs.polarChart)
      this.updatePolarChart()
    },
    // 更新极坐标图
    updatePolarChart (areaName = '') {
      const rawData = toRaw(this.solarData)
      const option = {
        title: {
          text: `${areaName}太阳高度角和方位角`,
          fontSize: 14,
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
    // 获取 API 密钥
    async fetchApiKey () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/get_api_key`)
        if (response.data && response.data.key) {
          this.apiKey = response.data.key
          console.log('获取 API 密钥成功:', this.apiKey)
        } else {
          console.error('获取 API 密钥失败')
        }
      } catch (error) {
        console.error('请求 API 密钥发生错误:', error)
      }
    },
    //  获取天气信息
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
      // console.log(`选择的区域: ${districtNames[district] || '未知区域'} (${district})`)

      if (!this.apiKey) {
        await this.fetchApiKey() // 获取 API 密钥
      }
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${district}&key=${this.apiKey}&extensions=base`

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
    // 更新天气信息
    updateWeatherInfo (weatherInfo) {
      this.currentTemperature = parseFloat(weatherInfo.temperature)
    }
  }
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.select-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
  width: 20%;
}

select {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 16px;
}

.content-wrapper {
  display: flex;
  width: 100%;
  height: 89vh;
  margin-top: 9vh;
}

.echarts-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 25%;
  height: 100%;
}

.echarts-container {
  width: 95%;
  height: 30vh;
  margin: 5px 5px;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.65);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  border-radius: 6px;
}

.geoscene-wrapper {
  width: 80%; /* 调整宽度以占据右侧区域 */
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0vh;
  background: rgba(255, 255, 255, 0.65); /* 添加磨砂白色背景 */
  -webkit-backdrop-filter: blur(25px); /* 添加磨砂效果 */
  backdrop-filter: blur(25px); /* 添加磨砂效果 */
  border-radius: 10px; /* 添加圆角 */
  padding: 10px; /* 添加内边距 */
}

.geoscene-iframe {
  width: 100%;
  height: 100%; /* 调整高度以占据整个父容器 */
  border-radius: 10px; /* 添加圆角 */
  overflow: hidden; /* 确保圆角效果 */
}

/* 新的覆盖层容器样式 */
.loader-plot-overlay {
  position: absolute;
  width: 25%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8); /* 可选：添加半透明背景 */
  transform: translateX(-50%,-50%);
  z-index: 10; /* 确保覆盖层在最上层 */
}

/* 加载动画的样式 */
.loader-plot {
  display: inline-grid;
  width: 90px;
  aspect-ratio: 1;
  animation: l3-0 5s steps(10) infinite;
}

.loader-plot:before,
.loader-plot:after {
  content:"";
  grid-area: 1/1;
}

.loader-plot:before {
  clip-path: polygon(100% 50%,90.45% 79.39%,65.45% 97.55%,34.55% 97.55%,9.55% 79.39%,0% 50%,9.55% 20.61%,34.55% 2.45%,65.45% 2.45%,90.45% 20.61%,100% 50%,85.6% 24.14%,63.6% 8.15%,36.4% 8.15%,14.4% 24.14%,6% 50%,14.4% 75.86%,36.4% 91.85%,63.6% 91.85%,85.6% 75.86%,94% 50%,85.6% 24.14%);
  background: #574951;
}

.loader-plot:after {
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

/* ComboBox 容器样式 */
.combobox-container {
  position: absolute;
  top: 5px;
  right: 5px; /* 保持与顶部相同的距离 */
  width: calc(100% - 20px); /* 使宽度相对于父容器，并减去左右的间距 */
  max-width: 300px; /* 设置最大宽度，防止过宽 */
  z-index: 20; /* 确保比 geoscene-wrapper 高 */
  padding: 5px; /* 添加内边距 */
  box-sizing: border-box; /* 确保内边距包含在宽度内 */
}

.combobox-container select {
  width: 100%; /* 使 select 元素占满容器宽度 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 14px;
}

.combobox-container select option[disabled][hidden] {
  color: rgb(124, 124, 124) !important;
  font-style: italic !important;
}
</style>

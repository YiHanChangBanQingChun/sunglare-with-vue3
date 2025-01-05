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
    /**
     * Watches for changes in the selected district and initializes the compass with the district's name.
     *
     * @param {String} newVal - The new value of the selected district code.
     */
    selectedDistrict (newVal) {
      const district = this.districts.find(d => d.code === newVal) // Find the district with the matching code
      if (district) {
        this.inityibiaopan(district.name) // Initialize the compass with the district's name
      }
    }
  },
  /**
   * Lifecycle hook called when the component is mounted.
   * This function initializes various charts and fetches necessary data.
   *
   * @async
   * @returns {Promise<void>}
   */
  async mounted () {
    this.initzhuzhuangtu() // Initialize bar chart
    await this.fetchIframeUrl() // Fetch the iframe URL
    await this.fetchWeatherInfo(this.selectedDistrict) // Fetch weather information for the selected district (default: Wuhan)
    this.intervalid = setInterval(() => {
      this.fetchWeatherInfo(this.selectedDistrict) // Fetch weather information for the selected district every 60 seconds
    }, 60000)
    this.inityibiaopan(this.selectedDistrict) // Initialize the compass with the selected district (default: Wuhan)
    this.initPolarChart() // Initialize the polar chart
    const areaName = '武汉市' // Replace with the actual area name
    await this.fetchSolarAngles(areaName) // Fetch solar angles for the specified area
    await this.fetchSolarAnglesDay(areaName) // Fetch daily solar angles for the specified area
    await this.fetchApiKey() // Fetch the API key
    this.fetchAvailableDates() // Fetch available dates
  },
  beforeUnmount () {
    if (this.intervalid) {
      clearInterval(this.intervalid)
    }
  },
  methods: {
    /**
     * Fetches available dates from the API and updates the `availableDates` property.
     *
     * This function sends a GET request to the endpoint specified by the environment variable `VUE_APP_API_URL`
     * to retrieve a list of available dates. If the request is successful and dates are found in the response,
     * the `availableDates` property is updated with the retrieved dates. If no dates are found or an error occurs,
     * appropriate error messages are logged to the console.
     *
     * @async
     * @function fetchAvailableDates
     * @returns {Promise<void>} A promise that resolves when the dates have been fetched and processed.
     */
    // 获取可用日期
    async fetchAvailableDates () {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/get_dates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
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
    /**
     * Fetches the iframe URL based on the provided date.
     *
     * This function sends a GET request to the API endpoint to retrieve the URL associated with the given date.
     * If the URL is found in the response, it updates the iframe source. If not, it logs an error message.
     * In case of any error during the fetch operation, it logs the error message.
     * The loading animation is controlled by the `isLoading` state.
     *
     * @param {string} date - The date for which the iframe URL is to be fetched.
     */
    async fetchIframeUrlByDate (date) {
      this.isLoading = true // Start loading animation
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/get_url_by_date?date=${date}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        })
        const data = await response.json()
        if (data.url) {
          this.iframeSrc = data.url
        } else {
          console.error('URL not found in response')
          this.isLoading = false // Stop loading animation if URL is not found
        }
      } catch (error) {
        console.error('Error fetching iframe URL:', error)
        this.isLoading = false // Stop loading animation if an error occurs
      }
    },
    /**
     * Fetches the default iframe URL from the API and sets it to the component's iframeSrc property.
     * Displays a loading animation while fetching the data.
     * If the URL is not found in the response or an error occurs, logs the error and stops the loading animation.
     */
    async fetchIframeUrl () {
      this.isLoading = true // Start loading animation
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/getapp`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        })
        const data = await response.json()
        if (data.url) {
          this.iframeSrc = data.url // Set iframe source URL
        } else {
          console.error('URL not found in response')
          this.isLoading = false // Stop loading animation if URL is not found
        }
      } catch (error) {
        console.error('Error fetching iframe URL:', error)
        this.isLoading = false // Stop loading animation if an error occurs
      }
    },
    /**
     * Handles the change event for the date input.
     *
     * @param {Event} event - The event object from the date input change.
     */
    handleDateChange (event) {
      const selectedDate = event.target.value // Get the selected date from the event
      this.fetchIframeUrlByDate(selectedDate) // Fetch the iframe URL based on the selected date
    },
    /**
     * This method is triggered when the iframe has finished loading.
     * It sets the `isLoading` property to false, which stops the loading animation.
     */
    onIframeLoad () {
      this.isLoading = false // iframe has finished loading, stop the loading animation
    },
    /**
     * Handles the event when the selected district changes.
     * Clears the existing interval, fetches weather information and statistics for the selected district,
     * and sets a new interval to fetch weather information every 60 seconds.
     */
    handleDistrictChange () {
      clearInterval(this.intervalid) // Clear the existing interval
      this.fetchWeatherInfo(this.selectedDistrict) // Fetch weather information for the selected district
      this.fetchStatistics(this.selectedDistrict) // Fetch statistics for the selected district
      this.intervalid = setInterval(() => {
        this.fetchWeatherInfo(this.selectedDistrict) // Fetch weather information every 60 seconds
      }, 60000)
    },
    /**
     * Initializes the bar chart using ECharts library and sets its options.
     * The chart displays the proportion of street view glare.
     * It also loads static data into the chart upon initialization.
     */
    initzhuzhuangtu () {
      // Initialize the bar chart with the reference element
      this.barChart = echarts.init(this.$refs.zhuzhuangtu)
      this.barChart.setOption({
        title: {
          text: '街景眩光占比', // Title of the chart
          left: 'center' // Center the title
        },
        tooltip: {
          formatter: function (params) {
            // Format the tooltip based on the series name
            if (params.seriesName === '百分比') {
              return `${params.name}: ${params.value} %`
            } else {
              return `${params.name}: ${params.value} 张`
            }
          }
        },
        grid: {
          left: '15%', // Move grid to the right
          top: '28%' // Move grid downwards
        },
        xAxis: {
          type: 'category',
          data: [] // Default set to empty
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}' // Format y-axis labels
          }
        },
        series: [{
          name: '百分比', // Series name
          type: 'bar', // Type of chart
          data: [], // Default set to empty
          itemStyle: {
            color: '#3398DB' // Default color set to blue
          }
        }]
      })
      // Load static data into the chart upon initialization
      this.updateStaticChart()
    },
    /**
     * Updates the bar chart with the given data and highlights the month with the highest percentage.
     *
     * @param {Array} data - The data array where each item contains monthly counts and a total count.
     * @param {number} currentMonth - The current month (not used in this function but kept for future use).
     */
    updatezhuzhuangtu (data, currentMonth) {
      const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

      // Calculate the percentage for each month and flatten the array
      const seriesData = data.map(item => {
        const total = item.count
        const monthData = [
          item.t01, item.t02, item.t03, item.t04, item.t05, item.t06,
          item.t07, item.t08, item.t09, item.t10, item.t11, item.t12
        ]
        return monthData.map((value, index) => ({
          value: (value / total * 100).toFixed(2), // Calculate percentage
          month: index + 1 // Save month information
        }))
      }).flat()

      // Find the bar with the highest percentage
      const maxItem = seriesData.reduce((max, item) => item.value > max.value ? item : max, seriesData[0])

      // Set colors for the bars
      const formattedSeriesData = seriesData.map(item => ({
        value: item.value,
        itemStyle: {
          color: item.month === maxItem.month ? 'red' : '#3398DB' // Highlight the highest percentage bar in red, others in blue
        }
      }))

      // Update the bar chart options
      this.barChart.setOption({
        title: {
          text: '眩光占比', // Glare percentage
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
        series: [{ data: formattedSeriesData }]
      })
    },
    /**
     * Updates the static chart with predefined data.
     * The chart displays the number of street view images for each district.
     */
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
      const xAxisData = staticData.map(item => item.name) // Extract district
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
            rotate: 45,
            interval: 0
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
    /**
     * Fetches statistical data based on the provided district.
     * If no district is provided or the district is '420100', it updates the static chart.
     * Otherwise, it fetches the data from the API and updates the chart with the fetched data.
     *
     * @param {string|null} district - The district code to fetch statistics for. Defaults to null.
     * @returns {Promise<void>} - A promise that resolves when the data fetching and chart updating is complete.
     */
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
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true' // 添加请求头
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
    /**
     * Initialize the dashboard (仪表盘)
     *
     * @param {string} areaName - The name of the area to display on the gauge
     *
     * This function initializes an ECharts gauge to display real-time temperature.
     * It sets up the gauge with various configurations such as title, tooltip, series, and styling.
     * The gauge updates every 2 seconds with the current temperature and changes color based on the temperature range.
     */
    inityibiaopan (areaName) {
      // Get the DOM element for the gauge
      const chartDom = document.getElementById('yibiaopan')
      // Initialize the ECharts instance
      const myChart = echarts.init(chartDom)
      const option = {
        title: {
          text: '实时温度', // Real-time temperature
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
            return `城市: ${areaName}<br/>${params.seriesName}: ${params.value}°C ` // Tooltip format
          }
        },
        series: [
          {
            name: '温度', // Temperature
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
                  [1, '#e0e0e0'] // Initial state color
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
              formatter: () => `当前市的实时温度\n${areaName}` // Current city's real-time temperature
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
            name: '温度', // Temperature
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
      // Set the initial option for the chart
      myChart.setOption(option)
      // Update the gauge every 2 seconds with the current temperature
      setInterval(() => {
        if (this.currentTemperature !== null) {
          let color = 'green'
          if (this.currentTemperature < 10) {
            color = '#3398DB'
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
    /**
     * Fetches the solar angles for the given area name at the current time.
     *
     * This function constructs a URL using the provided area name and the current time,
     * then makes a GET request to fetch the solar angle information from the API.
     * If the request is successful, it updates the solarData and calls updatePolarChart.
     * If the request fails, it logs the error message.
     *
     * @param {string} areaName - The name of the area for which to fetch solar angles.
     */
    async fetchSolarAngles (areaName) {
      // Get the current time in ISO format
      const time = new Date().toISOString()
      // Construct the API URL with the area name and current time
      const url = `${process.env.VUE_APP_API_URL}/api/solar_angles?area_name=${encodeURIComponent(areaName)}&time=${time}`
      try {
        // Make the GET request to fetch solar angles
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        })
        if (response.ok) {
          // Parse the response JSON and update solarData
          const solarInfo = await response.json()
          this.solarData = [solarInfo]
          // Update the polar chart with the new data
          this.updatePolarChart(areaName)
        } else {
          // Log the error message if the request fails
          const errorData = await response.json()
          console.error('获取太阳角度信息失败:', errorData.message)
        }
      } catch (error) {
        // Log any errors that occur during the request
        console.error('请求太阳角度信息发生错误:', error)
      }
    },
    /**
     * Fetches the solar angle trajectory information for a given area within a day.
     *
     * @param {string} areaName - The name of the area to fetch solar angles for.
     * @returns {Promise<void>} - A promise that resolves when the solar angles have been fetched and processed.
     *
     * This function performs the following steps:
     * 1. Constructs the API URL with the given area name and the current date.
     * 2. Sends a GET request to the API to fetch the solar angle data.
     * 3. If the request is successful, processes the response data and updates the solarTrajectoryData property.
     * 4. Calls the updatePolarChart method with the area name.
     * 5. If the request fails, logs an error message to the console.
     * 6. If an error occurs during the request, logs the error to the console.
     */
    // 获取一天内的太阳角度轨迹信息
    async fetchSolarAnglesDay (areaName) {
      const date = new Date().toISOString().split('T')[0]
      const url = `${process.env.VUE_APP_API_URL}/api/solar_angles_day?area_name=${encodeURIComponent(areaName)}&date=${date}`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
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
        } else {
          const errorData = await response.json()
          console.error('获取太阳角度信息失败:', errorData.message)
        }
      } catch (error) {
        console.error('请求太阳角度信息发生错误:', error)
      }
    },
    /**
     * Initializes the polar chart using ECharts library.
     * This function sets up the polar chart instance and updates it with the latest data.
     */
    initPolarChart () {
      // Initialize the polar chart instance with the reference to the DOM element
      this.polarChart = echarts.init(this.$refs.polarChart)
      // Update the polar chart with the latest data
      this.updatePolarChart()
    },
    /**
     * Updates the polar chart with solar altitude and azimuth data.
     *
     * @param {string} areaName - The name of the area to be displayed in the chart title.
     */
    updatePolarChart (areaName = '') {
      // Filter solar data to include only items with solar altitude >= 0
      const rawData = toRaw(this.solarData).filter(item => item.solar_altitude >= 0)
      // Filter solar trajectory data to include only items with solar altitude >= 0
      const trajectoryData = toRaw(this.solarTrajectoryData).filter(item => item.solarAltitude >= 0)
      // Calculate the maximum solar altitude from the trajectory data
      const maxAltitude = Math.max(...trajectoryData.map(item => item.solarAltitude), 0)
      // Adjust the maximum altitude by extending 10% but not exceeding 90 degrees
      const adjustedMaxAltitude = Math.min(maxAltitude * 1.1, 90)
      const option = {
        title: {
          text: `${areaName}太阳高度角和方位角`, // Chart title with area name
          fontSize: 14,
          left: 'center',
          top: 'top'
        },
        legend: {
          data: ['太阳轨迹', '当前太阳角度'], // Legend for the chart
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
            // Tooltip content formatting
            return `${params.seriesName}<br/>区名: ${areaName}<br/>高度角: ${params.value[0]} °<br/>方位角: ${params.value[1]} °`
          },
          position: function (point, params, dom, rect, size) {
            // Fix tooltip position to the right side
            return [point[0] + 10, '10%']
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
          max: adjustedMaxAltitude
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: '当前太阳角度', // Current solar angle series
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
            name: '太阳轨迹', // Solar trajectory series
            type: 'line',
            data: this.solarTrajectoryData.map(item => [item.solarAltitude, item.solarAzimuth]),
            itemStyle: {
              color: '#3398DB'
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
      this.polarChart.setOption(option)
    },
    /**
     * Fetches the API key from the server.
     *
     * This function sends a GET request to the API endpoint specified in the environment
     * variable `VUE_APP_API_URL` to retrieve the API key. If the key is successfully retrieved,
     * it is stored in the `apiKey` property. If the request fails or the key is not present
     * in the response, an error message is logged to the console.
     *
     * @returns {Promise<void>} A promise that resolves when the API key is fetched and stored.
     */
    async fetchApiKey () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/get_api_key`) // Send GET request to fetch API key
        if (response.data && response.data.key) {
          this.apiKey = response.data.key // Store the API key
        } else {
          console.error('Failed to fetch API key') // Log error if key is not present in response
        }
      } catch (error) {
        console.error('Error occurred while requesting API key:', error) // Log error if request fails
      }
    },
    /**
     * Fetches weather information for a given district.
     *
     * This function retrieves weather information from the AMap API for a specified district.
     * It first ensures that an API key is available, then constructs the API request URL.
     * If the request is successful and returns valid weather data, the weather information
     * is updated in the component's state and various UI elements are updated accordingly.
     *
     * @param {number} district - The district code for which to fetch weather information.
     * @returns {Promise<void>} - A promise that resolves when the weather information has been fetched and processed.
     */
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

      if (!this.apiKey) {
        await this.fetchApiKey() // Fetch API key if not available
      }
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${district}&key=${this.apiKey}&extensions=base`

      try {
        const response = await axios.get(url)
        if (response.data.status === '1' && response.data.lives && response.data.lives.length > 0) {
          const weatherInfo = response.data.lives[0]
          const index = this.weatherInfos.findIndex(info => info.city === weatherInfo.city)
          if (index !== -1) {
            this.weatherInfos[index] = weatherInfo // Update existing weather info
          } else {
            this.weatherInfos.push(weatherInfo) // Add new weather info
          }
          this.updateWeatherInfo(weatherInfo) // Update weather info in the component
          this.updatezhuzhuangtu() // Update bar chart
          this.inityibiaopan(districtNames[district]) // Update dashboard
          await this.fetchSolarAngles(districtNames[district]) // Fetch solar angles
          await this.fetchSolarAnglesDay(districtNames[district]) // Fetch daily solar angles
        } else {
          console.error('Failed to fetch weather information:', response.data.info)
        }
      } catch (error) {
        console.error('Error occurred while fetching weather information:', error)
      }
    },
    /**
     * Updates the current weather information.
     *
     * @param {Object} weatherInfo - The weather information object.
     * @param {string} weatherInfo.temperature - The temperature value as a string.
     */
    updateWeatherInfo (weatherInfo) {
      // Parse the temperature from the weatherInfo object and update the current temperature
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
  z-index: 2; /* 确保覆盖层在最上层 */
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
  z-index: 3; /* 确保比 geoscene-wrapper 高 */
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

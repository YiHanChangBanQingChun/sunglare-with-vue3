// routeview_public.js
export function parseUrlParams (context) {
  const urlParams = new URLSearchParams(window.location.search)
  const startParam = urlParams.get('start')
  const endParam = urlParams.get('end')
  const dateParam = urlParams.get('date')
  const timeParam = urlParams.get('time')
  const defaultRouteIdParam = urlParams.get('default_id')
  const timeBasedRouteIdParam = urlParams.get('time_based_id')
  if (startParam) {
    try {
      const startObj = JSON.parse(decodeURIComponent(startParam))
      if (startObj && startObj.address) {
        context.searchQueryStart = startObj.name
      }
    } catch (e) {
      console.error('Error parsing start parameter:', e)
    }
  }
  if (endParam) { // 如果有终点参数，进行解析
    try {
      const endObj = JSON.parse(decodeURIComponent(endParam))
      if (endObj && endObj.address) {
        context.searchQueryEnd = endObj.name // 绑定终点查询字符串
      }
    } catch (e) {
      console.error('Error parsing end parameter:', e)
    }
  }
  // 如果有日期参数，进行解析
  if (dateParam) {
    context.selectedDate = dateParam
  }
  // 如果有时间参数，进行解析
  if (timeParam) {
    context.selectedTime = timeParam
    context.isTimeFromUrl = true // 设置标志位
  }
  // 如果有默认路径ID参数，进行解析
  if (defaultRouteIdParam) {
    context.defaultRouteId = defaultRouteIdParam
  }
  // 如果有基于时间的路径ID参数，进行解析
  if (timeBasedRouteIdParam) {
    context.timeBasedRouteId = timeBasedRouteIdParam
  }

  // 如果有底图参数，进行解析
  context.created()
}

export function toggleRouteList (context) {
  context.isRouteListVisible = !context.isRouteListVisible
}

export function getColor (index) {
  if (index === 0) {
    return 'rgb(25, 202, 173)' // 绿色，耗时少路径
  } else if (index === 1) {
    return 'rgb(244, 96, 108)' // 红色，无眩光路径
  }
  return 'black' // 默认颜色
}

export function highlightRoute (context, routeId) {
  routeId = routeId === 'defaultRouteId' ? 'noGlareRouteId' : 'defaultRouteId'
  if (context.highlightedRouteId && context.highlightedRouteId !== routeId) {
    resetRouteStyle(context, context.highlightedRouteId)
  }
  if (context.blinkingTimers[routeId]) {
    clearInterval(context.blinkingTimers[routeId])
    delete context.blinkingTimers[routeId]
    resetRouteStyle(context, routeId)
  }
  const layer = context.routeLayers[routeId]
  if (layer) {
    const color = context.highlightedColor
    const newRenderer = {
      type: 'simple',
      title: '路径',
      symbol: {
        type: 'simple-line',
        color: color,
        width: 5
      }
    }
    layer.renderer = newRenderer
  }
  context.highlightedRouteId = routeId
  startBlinking(context, routeId)
}

export function startBlinking (context, routeId) {
  const layer = context.routeLayers[routeId]
  if (!layer) return

  let isBlinkOn = false
  const originalColor = routeId === context.noGlareRouteId ? context.noGlareColor : context.defaultColor

  const intervalId = setInterval(() => {
    isBlinkOn = !isBlinkOn
    const color = isBlinkOn ? context.highlightedColor : context.highlightedBlinkColor
    const newRenderer = {
      type: 'simple',
      title: '路径',
      symbol: {
        type: 'simple-line',
        color: color,
        width: 4.5
      }
    }
    layer.renderer = newRenderer
  }, 300)

  context.blinkingTimers[routeId] = intervalId

  setTimeout(() => {
    clearInterval(context.blinkingTimers[routeId])
    delete context.blinkingTimers[routeId]
    const finalRenderer = {
      type: 'simple',
      title: '路径',
      symbol: {
        type: 'simple-line',
        color: context.highlightedColor,
        width: 4.5
      }
    }
    layer.renderer = finalRenderer
    setTimeout(() => {
      resetRouteStyle(context, routeId, originalColor)
    }, 3000)
  }, 3000)
}

export function resetRouteStyle (context, routeId, originalColor = null) {
  if (context.blinkingTimers[routeId]) {
    clearInterval(context.blinkingTimers[routeId])
    delete context.blinkingTimers[routeId]
  }
  const layer = context.routeLayers[routeId]
  if (layer) {
    const isNoGlare = routeId === context.noGlareRouteId
    const color = (isNoGlare ? context.defaultColor : context.noGlareColor)
    const newRenderer = {
      type: 'simple',
      title: '路径',
      symbol: {
        type: 'simple-line',
        color: color,
        width: isNoGlare ? 4.5 : 3
      }
    }
    layer.renderer = newRenderer
  }
}

export function onTimeInputChange (context, event) {
  const value = event.target.value
  const [hours, minutes] = value.split(':').map(Number)
  const roundedMinutes = Math.floor(minutes / 10) * 10
  context.selectedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`
}

export function isDateDisabled (context, date) {
  if (!date) return false
  const selected = new Date(date)
  const month = selected.getMonth() + 1
  const day = selected.getDate()
  if (month >= 1 && month <= 7 && day !== 15) {
    return true
  }
  if (month === 8 && day <= 25) {
    return true
  }
  if ((month === 10 || month === 12) && day !== 15) {
    return true
  }
  if (month === 11 && day >= 9) {
    return true
  }
  return false
}

export function handleDateChange (context, event) {
  const date = event.target.value
  if (isDateDisabled(context, date)) {
    alert('抱歉，选择的日期未进行模拟，请选择其他日期。可选日期为，9月1日-9月30日，11月1日到9日，以及其他月份的15日.')
    context.selectedDate = ''
  }
}

export function selectResult (context, result, isStart = true) {
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
  let currentStart = context.selectedResultStart ? JSON.stringify(context.selectedResultStart) : null
  let currentEnd = context.selectedResultEnd ? JSON.stringify(context.selectedResultEnd) : null
  if (isStart) {
    context.selectedResultStart = simplifiedResult
    context.searchQueryStart = simplifiedResult.name
    context.searchResults = []
    currentStart = JSON.stringify(simplifiedResult)
  } else {
    context.selectedResultEnd = simplifiedResult
    context.searchQueryEnd = simplifiedResult.name
    context.searchResultsEnd = []
    currentEnd = JSON.stringify(simplifiedResult)
  }
  context.$router.push({
    path: '/lu-jing-gui-hua/Intermediate-page',
    query: {
      start: currentStart,
      end: currentEnd,
      date: context.selectedDate,
      time: context.selectedTime,
      BasemapLayer: context.BasemapName
    }
  })
}

export function onSearchInputChange (context, event, isStart) {
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
        context[searchResultsField] = data
      })
      .catch((error) => {
        console.error('错误:', error)
      })
  } else {
    context[searchResultsField] = []
  }
}

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

export function swap (context) {
  context.isSwapping = true // 设置标志位
  // 交换 searchQueryStart 和 searchQueryEnd
  const tempQuery = context.searchQueryStart
  context.searchQueryStart = context.searchQueryEnd
  context.searchQueryEnd = tempQuery
  // 交换 selectedResultStart 和 selectedResultEnd
  const tempResult = context.selectedResultStart
  context.selectedResultStart = context.selectedResultEnd
  context.selectedResultEnd = tempResult
  // 调用 onSearch 方法重新查询路径
  context.onSearch().then(() => {
    parseUrlParams(context)
    context.initMap()
    // 确保在交换操作完成后，更新搜索框的值
    context.searchQueryStart = context.selectedResultStart.name
    context.searchQueryEnd = context.selectedResultEnd.name
    context.isSwapping = false // 重置标志位
  }).catch(() => {
    context.isSwapping = false // 确保在错误情况下也重置标志位
  })
}

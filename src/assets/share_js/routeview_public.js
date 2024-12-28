// routeview_public.js
/**
 * Parses URL parameters and updates the context object with the parsed values.
 *
 * @param {Object} context - The context object to be updated with parsed URL parameters.
 * @property {string} context.searchQueryStart - The start location name parsed from the URL.
 * @property {string} context.searchQueryEnd - The end location name parsed from the URL.
 * @property {string} context.selectedDate - The selected date parsed from the URL.
 * @property {string} context.selectedTime - The selected time parsed from the URL.
 * @property {boolean} context.isTimeFromUrl - Flag indicating if the time was parsed from the URL.
 * @property {string} context.defaultRouteId - The default route ID parsed from the URL.
 * @property {string} context.timeBasedRouteId - The time-based route ID parsed from the URL.
 * @property {Function} context.created - Function to be called after parsing URL parameters.
 */
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

/**
 * Toggles the visibility of the route list in the given context.
 *
 * @param {Object} context - The context object containing the state.
 * @param {boolean} context.isRouteListVisible - The current visibility state of the route list.
 */
export function toggleRouteList (context) {
  context.isRouteListVisible = !context.isRouteListVisible // Toggle the visibility state
}

/**
 * Returns a color based on the provided index.
 *
 * @param {number} index - The index to determine the color.
 * @returns {string} The color corresponding to the index.
 */
export function getColor (index) {
  if (index === 0) {
    return 'rgb(25, 202, 173)' // 绿色，耗时少路径
  } else if (index === 1) {
    return 'rgb(244, 96, 108)' // 红色，无眩光路径
  }
  return 'black' // 默认颜色
}

/**
 * Highlights a route on the map by changing its style and starting a blinking effect.
 *
 * @param {Object} context - The context object containing route layers and other configurations.
 * @param {string} routeId - The ID of the route to be highlighted.
 */
export function highlightRoute (context, routeId) {
  routeId = routeId === 'defaultRouteId' ? 'noGlareRouteId' : 'defaultRouteId' // Toggle routeId between 'defaultRouteId' and 'noGlareRouteId'
  if (context.highlightedRouteId && context.highlightedRouteId !== routeId) {
    resetRouteStyle(context, context.highlightedRouteId) // Reset the style of the previously highlighted route
  }
  if (context.blinkingTimers[routeId]) {
    clearInterval(context.blinkingTimers[routeId]) // Clear the blinking timer for the route
    delete context.blinkingTimers[routeId] // Remove the blinking timer from the context
    resetRouteStyle(context, routeId) // Reset the style of the route
  }
  const layer = context.routeLayers[routeId] // Get the layer for the route
  if (layer) {
    const color = context.highlightedColor // Get the highlight color from the context
    const newRenderer = {
      type: 'simple',
      title: '路径', // Title for the renderer
      symbol: {
        type: 'simple-line',
        color: color, // Set the color for the route
        width: 5 // Set the width for the route
      }
    }
    layer.renderer = newRenderer // Apply the new renderer to the layer
  }
  context.highlightedRouteId = routeId // Update the highlighted route ID in the context
  startBlinking(context, routeId) // Start the blinking effect for the route
}

/**
 * Starts the blinking effect on a specified route layer.
 *
 * @param {Object} context - The context object containing route layers and other configurations.
 * @param {string} routeId - The ID of the route to apply the blinking effect.
 */
export function startBlinking (context, routeId) {
  const layer = context.routeLayers[routeId] // Get the route layer by routeId
  if (!layer) return

  let isBlinkOn = false
  const originalColor = routeId === context.noGlareRouteId ? context.noGlareColor : context.defaultColor // Determine the original color of the route

  const intervalId = setInterval(() => {
    isBlinkOn = !isBlinkOn
    const color = isBlinkOn ? context.highlightedColor : context.highlightedBlinkColor // Toggle between highlighted and blink colors
    const newRenderer = {
      type: 'simple',
      title: '路径',
      symbol: {
        type: 'simple-line',
        color: color,
        width: 4.5
      }
    }
    layer.renderer = newRenderer // Apply the new renderer to the layer
  }, 300)

  context.blinkingTimers[routeId] = intervalId // Store the interval ID in the context

  setTimeout(() => {
    clearInterval(context.blinkingTimers[routeId]) // Stop the blinking effect
    delete context.blinkingTimers[routeId] // Remove the interval ID from the context
    const finalRenderer = {
      type: 'simple',
      title: '路径',
      symbol: {
        type: 'simple-line',
        color: context.highlightedColor,
        width: 4.5
      }
    }
    layer.renderer = finalRenderer // Apply the final renderer to the layer
    setTimeout(() => {
      resetRouteStyle(context, routeId, originalColor) // Reset the route style to its original color
    }, 3000)
  }, 3000)
}

/**
 * Resets the style of a route in the given context.
 *
 * @param {Object} context - The context containing route layers and blinking timers.
 * @param {string} routeId - The ID of the route to reset.
 * @param {string|null} [originalColor=null] - The original color to reset to (optional).
 */
export function resetRouteStyle (context, routeId, originalColor = null) {
  if (context.blinkingTimers[routeId]) {
    clearInterval(context.blinkingTimers[routeId]) // Clear the blinking timer if it exists
    delete context.blinkingTimers[routeId] // Remove the blinking timer from the context
  }
  const layer = context.routeLayers[routeId]
  if (layer) {
    const isNoGlare = routeId === context.noGlareRouteId // Check if the route has no glare
    const color = (isNoGlare ? context.defaultColor : context.noGlareColor) // Determine the color based on glare status
    const newRenderer = {
      type: 'simple',
      title: '路径', // Title for the renderer
      symbol: {
        type: 'simple-line',
        color: color, // Set the color for the route
        width: isNoGlare ? 4.5 : 3 // Set the width based on glare status
      }
    }
    layer.renderer = newRenderer // Apply the new renderer to the layer
  }
}

/**
 * Selects a result and updates the context with the selected result.
 *
 * @param {Object} context - The context object containing the state.
 * @param {Object} result - The result object to be selected.
 * @param {boolean} [isStart=true] - Flag indicating if the result is the start point.
 */
export function selectResult (context, result, isStart = true) {
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

/**
 * Swaps the search queries and selected results in the given context, then re-executes the search.
 *
 * @param {Object} context - The context object containing search queries and results.
 * @param {boolean} context.isSwapping - Flag indicating if a swap is in progress.
 * @param {Object} context.searchQueryStart - The starting search query.
 * @param {Object} context.searchQueryEnd - The ending search query.
 * @param {Object} context.selectedResultStart - The starting selected result.
 * @param {Object} context.selectedResultEnd - The ending selected result.
 * @param {Function} context.onSearch - Function to execute the search.
 * @param {Function} context.initMap - Function to initialize the map.
 */
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

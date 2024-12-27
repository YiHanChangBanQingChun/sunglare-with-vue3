// routeplanning_all.js
import { nextTick } from 'vue'

export function handleKeydown (context, event) {
  if (context.searchResults.length && context.searchQueryStart) {
    switch (event.key) {
      case 'Escape':
        context.searchResults = []
        break
      case 'Tab':
        event.preventDefault()
        context.highlightedIndex = (context.highlightedIndex + 1) % context.searchResults.length
        nextTick(() => {
          const highlightedElement = context.$refs.searchResultsStart.querySelector('li.highlighted')
          if (highlightedElement) {
            highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
          }
        })
        break
      case 'Enter':
        if (context.highlightedIndex >= 0 && context.highlightedIndex < context.searchResults.length) {
          context.selectResult(context.searchResults[context.highlightedIndex], true)
        }
        break
    }
  } else if (context.searchResultsEnd.length && context.searchQueryEnd) {
    switch (event.key) {
      case 'Escape':
        context.searchResultsEnd = []
        break
      case 'Tab':
        event.preventDefault()
        context.highlightedIndex = (context.highlightedIndex + 1) % context.searchResultsEnd.length
        nextTick(() => {
          const highlightedElement = context.$refs.searchResultsEnd.querySelector('li.highlighted')
          if (highlightedElement) {
            highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
          }
        })
        break
      case 'Enter':
        if (context.highlightedIndex >= 0 && context.highlightedIndex < context.searchResultsEnd.length) {
          context.selectResult(context.searchResultsEnd[context.highlightedIndex], false)
        }
        break
    }
  }
}

export function updateTime (context) {
  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  // 只有当 selectedTime 是当前时间时，才更新
  if (!context.isTimeFromUrl || context.selectedTime === currentTime) {
    context.selectedTime = currentTime
    context.isTimeFromUrl = false // 重置标志位
  }
}

export function clc1 (context) {
  // 清空搜索框1
  context.searchQueryStart = ''
}

export function clc2 (context) {
  // 清空搜索框2
  context.searchQueryEnd = ''
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

export function onTimeInputChange (context, event) {
  const value = event.target.value
  const [hours, minutes] = value.split(':').map(Number)
  const roundedMinutes = Math.floor(minutes / 10) * 10
  context.selectedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`
}

export function onSearchInputChange (context, event, isStart) {
  const query = event.target.value
  const searchResultsField = isStart ? 'searchResults' : 'searchResultsEnd'
  if (query.includes("'")) {
    return
  }
  if (query.length >= 2) {
    fetch(`${process.env.VUE_APP_API_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
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

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

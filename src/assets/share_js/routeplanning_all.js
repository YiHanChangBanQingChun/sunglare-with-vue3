// routeplanning_all.js
import { nextTick } from 'vue'

/**
 * Handles keydown events for search result navigation and selection.
 *
 * @param {Object} context - The context object containing search results and query information.
 * @param {Event} event - The keydown event object.
 */
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

/**
 * Updates the selected time in the given context to the current time.
 *
 * This function checks if the selected time in the context is the current time.
 * If it is, or if the time is not from the URL, it updates the selected time to the current time.
 * It also resets the `isTimeFromUrl` flag to false.
 *
 * @param {Object} context - The context object containing time-related properties.
 * @param {boolean} context.isTimeFromUrl - Flag indicating if the time is from the URL.
 * @param {string} context.selectedTime - The currently selected time in the context.
 */
export function updateTime (context) {
  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  // 只有当 selectedTime 是当前时间时，才更新
  if (!context.isTimeFromUrl || context.selectedTime === currentTime) {
    context.selectedTime = currentTime
    context.isTimeFromUrl = false // 重置标志位
  }
}

/**
 * Clears the search query in the search box 1.
 *
 * @param {Object} context - The context object containing the search query.
 * @param {string} context.searchQueryStart - The search query to be cleared.
 */
export function clc1 (context) {
  // Clear the search box 1
  context.searchQueryStart = '' // Set search query to an empty string
}

/**
 * Clears the search query in the provided context.
 *
 * @param {Object} context - The context object containing the search query.
 * @param {string} context.searchQueryEnd - The search query to be cleared.
 */
export function clc2 (context) {
  // 清空搜索框2
  context.searchQueryEnd = ''
}

/**
 * Determines if a given date is disabled based on specific conditions.
 *
 * @param {Object} context - The context in which the function is called.
 * @param {string|Date} date - The date to be checked, can be a string or Date object.
 * @returns {boolean} - Returns true if the date is disabled, otherwise false.
 */
export function isDateDisabled (context, date) {
  if (!date) return false // Return false if no date is provided
  const selected = new Date(date) // Convert the date to a Date object
  const month = selected.getMonth() + 1 // Get the month (1-12)
  const day = selected.getDate() // Get the day of the month (1-31)
  if (month >= 1 && month <= 7 && day !== 15) { // Check if the date is between January and July and not the 15th
    return true
  }
  if (month === 8 && day <= 25) { // Check if the date is in August and on or before the 25th
    return true
  }
  if ((month === 10 || month === 12) && day !== 15) { // Check if the date is in October or December and not the 15th
    return true
  }
  if (month === 11 && day >= 9) { // Check if the date is in November and on or after the 9th
    return true
  }
  return false // Return false if none of the conditions are met
}

/**
 * Handles the change of date in the context.
 *
 * @param {Object} context - The context in which the date change is handled.
 * @param {Event} event - The event object containing the new date value.
 */
export function handleDateChange (context, event) {
  const date = event.target.value // Get the selected date from the event
  if (isDateDisabled(context, date)) { // Check if the selected date is disabled
    alert('抱歉，选择的日期未进行模拟，请选择其他日期。可选日期为，9月1日-9月30日，11月1日到9日，以及其他月份的15日.') // Show alert if date is disabled
    context.selectedDate = '' // Reset the selected date in the context
  }
}

/**
 * Handles the change event for a time input field.
 *
 * @param {Object} context - The context object where the selected time will be set.
 * @param {Event} event - The event object from the time input field.
 */
export function onTimeInputChange (context, event) {
  const value = event.target.value // Get the value from the input field
  const [hours, minutes] = value.split(':').map(Number) // Split the value into hours and minutes
  const roundedMinutes = Math.floor(minutes / 10) * 10 // Round the minutes to the nearest 10
  context.selectedTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}` // Set the selected time in the context
}

/**
 * Handles the input change event for search fields and updates search results.
 *
 * @param {Object} context - The context object containing the search results fields.
 * @param {Event} event - The input change event.
 * @param {boolean} isStart - A flag indicating whether the search is for the start or end location.
 */
export function onSearchInputChange (context, event, isStart) {
  const query = event.target.value // Get the input value from the event
  const searchResultsField = isStart ? 'searchResults' : 'searchResultsEnd' // Determine which search results field to update
  if (query.includes("'")) { // Return if the query contains a single quote
    return
  }
  if (query.length >= 2) { // Proceed if the query length is at least 2 characters
    fetch(`${process.env.VUE_APP_API_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({ searchQueryStart: query }) // Send the query in the request body
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        context[searchResultsField] = data // Update the context with the search results
      })
      .catch((error) => {
        console.error('错误:', error) // Log any errors
      })
  } else {
    context[searchResultsField] = [] // Clear the search results if the query is too short
  }
}

import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    username: localStorage.getItem('username') || '',
    avatarUrl: localStorage.getItem('avatarUrl') || ''
  },
  mutations: {
    login  (state, payload) {
      state.isLoggedIn = true
      state.username = payload.username
      state.avatarUrl = payload.avatarUrl
    },
    logout (state) {
      state.isLoggedIn = false
      state.username = ''
      state.avatarUrl = ''
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('login', payload)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('username', payload.username)
      localStorage.setItem('avatarUrl', payload.avatarUrl)
    },
    logout ({ commit }) {
      commit('logout')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('username')
      localStorage.removeItem('avatarUrl')
    }
  }
})

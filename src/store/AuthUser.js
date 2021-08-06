import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/auth.js'

Vue.use(Vuex)

let auth = JSON.parse(localStorage.getItem('auth_key'))

const initailState = {
    user: auth ? auth.user: null,
    jwt: auth ? auth.jwt: null,
    isAuthen: auth ? true: false
}

export default new Vuex.Store({
  state: initailState,
  getters: {
      user: (state) => state.user,
      jwt: (state) => state.jwt,
      isAuthen: (state) => state.isAuthen
  },
  mutations: {
    loginSuccess (state, user, jwt) {
        state.user = user
        state.jwt = jwt
        state.isAuthen = true
    },
    logoutSuccess(state) {
        state.user = null,
        state.jwt = null,
        state.isAuthen = false
    }
  },
  actions: {
      async login({ commit }, payload) {
          let res = await AuthService.login(payload)
          if (res.success) {
            commit('loginSuccess', res.user, res.jwt)
          } 
          return res
      },
      async logout({ commit }) {
        let res = await AuthService.logout()
        commit('logoutSuccess')
        return res;
      },
      async edit({ commit }, payload) {
        let body = {
          id: payload.id,
          reward_name: payload.reward_name,
          reward_point: payload.reward_point,
          reward_remain: payload.reward_remain,
          users: payload.users
            //subject: payload.subject[0].id
        }
        console.log(body)
        let res = await Axios.put(apiUrl + '/rewards/' + payload.id, body)
        console.log(res)
        commit("edit", payload.index, res.data )
      },

  },
  modules: {
  }
})

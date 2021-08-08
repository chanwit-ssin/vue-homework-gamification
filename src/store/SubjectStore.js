import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

let apiUrl = process.env.VUE_APP_API_HOST

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    subjects: (state) => state.data,
  },
  mutations: {
    fetch(state, res) {
      state.data = res.data;
    },
    add(state, res) {
      state.data.push(res.data);
    },
  },
  actions: {
    async fetch({ commit }) {
      let res = await Axios.get(apiUrl + "/subjects");
      commit("fetch",res)
    },
    /*async add({commit},payload){
      let body = {
        id: payload.id,
        point: payload.total_point,
        user: payload.user
      }
      let res = await Axiost.post(apiUrl + '/subjects',body)
      if(res.status === 200){
        commit("add",res)
      }
      else{
        console.error(res)
      }
    }*/
  },
  modules: {},
});

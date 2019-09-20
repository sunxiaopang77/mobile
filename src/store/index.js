import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 初始化一个数据
    user: null
  },
  mutations: {
    // 2. 添加一个 mutation 用于修改 state
    // 3. 登录成功，调用 mutation 将 token 放到 Vuex 容器中
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})

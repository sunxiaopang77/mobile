import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 初始化一个数据
    user: getItem('user')
  },
  mutations: {
    // 2. 添加一个 mutation 用于修改 state
    // 3. 登录成功，调用 mutation 将 token 放到 Vuex 容器中
    setUser (state, user) {
      state.user = user
      // 4. 为了防止页面刷新数据丢失，所以还需要将数据存储到本地存储
      setItem('user', state.user)
    }
  },
  actions: {

  }
})

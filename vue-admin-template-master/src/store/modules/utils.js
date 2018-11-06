import { getNewTime } from '@/storeApi/utils'

const utils = {
  state: {
    getTime: ''
  },
  mutations: {
    SET_GETTIME: (state, roles) => {
      state.getTime = roles
    }
  },
  actions: {
    // 获取服务器时间定时器
    getNowTime({ commit }) {
      return getNewTime().then(res => {
        if (res.data) {
          commit('SET_GETTIME', res.data.time)
        } else {
          new Error(res.message)
        }
      })
    }
  }
}

export default utils

import { phoneAddLog } from '@/storeApi/utils'
import { getCallPhoneStatus } from '@/storeApi/utils'

const phoneLog = {
  state: {
    getPhone: '',
    phoneStatusObj: {},
    phoneStatus: ''
  },
  mutations: {
    SET_GETPHONE: (state, roles) => {
      state.getPhone = roles
    },
    SET_PHONESTATUSOBJ: (state, phoneStatusObj) => {
      state.phoneStatusObj = phoneStatusObj
    },
    SET_PHONESTATUS: (state, phoneStatus) => {
      state.phoneStatus = phoneStatus
    }
  },
  actions: {
    // 查看手机号日志
    lookPhoneLog({ commit }, data) {
      return phoneAddLog(data).then(res => {
        if (res.data) {
          commit('SET_GETPHONE', res.data.phone)
        } else {
          new Error(res.message)
        }
      })
    },
    getCallPhoneStatus({ commit }, callId) {
      return getCallPhoneStatus(callId).then(res => {
        if (!res.data) throw new Error('系统错误call status')
        commit('SET_PHONESTATUS', res.data.callStatus)
        if (res.data.callStatus !== '2') {
          commit('SET_PHONESTATUSOBJ', res.data.callData)
        }

        return res.data.callStatus
      })
    }
  }
}

export default phoneLog

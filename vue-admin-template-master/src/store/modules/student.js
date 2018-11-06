const student = {
  state: {
    studentId: '',
    studentStatus: '',
    studentInfo: {}
  },

  mutations: {
    SET_STUDENTID: (state, studentId) => {
      state.studentId = studentId
    },
    SET_STUDENTSTATUS: (state, studentStatus) => {
      state.studentStatus = studentStatus
    },
    SET_STUDENTINFO: (state, studentInfo) => {
      state.studentInfo = studentInfo
    }
  },

  actions: {
    // 设置rosterId
    setStudentId({ commit }, id) {
      commit('SET_STUDENTID', id)
    },

    // 设置学生状态 0公共池 10潜客 20正式生 30异常生
    setStudentStatus({ commit }, status) {
      commit('SET_STUDENTSTATUS', status)
    },

    // 设置学生信息
    setStudentInfo({ commit }, info) {
      commit('SET_STUDENTINFO', info)
    }
  }
}

export default student

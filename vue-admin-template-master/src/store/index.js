import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import student from './modules/student'
import getters from './getters'
import utils from './modules/utils'
import phoneLog from './modules/phoneLog'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    student,
    utils,
    phoneLog
  },
  getters
})

export default store

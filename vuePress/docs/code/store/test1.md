# modules ---> user.js
```
import { loginByUsername, logout, getUserInfo } from '@/storeApi/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { isMobile } from '../../storeApi/utils'
```
getUserInfo 获取当前用户信息  主要在permission.js 调用

getUserInfo 判断当前用户是否已拉取完user_info信息

```
const user = {
  state: {
    user: '',
    status: '',
    code: '', 
    token: getToken(), //获取token
    xToken: '', 
    ijy_platform: '', //平台标识
    name: '',
    sex: '',
    phone: '',
    userId: '',
    roleId: '',
    rosterId: '',
    roleCode: '',  //用户角色code
    avatar: '',
    introduction: '',
    roles: [],
    isMobile: isMobile(),
    setting: {
      articlePlatform: []
    }
  },
```

登陆后用户信息会完整的保存 localstorage  

access_token 访问令牌的（如微信授权这样的一个机制）

b_token 老服务中心访问令牌的

ijx_platform 平台验证

sessionUser 用户信息 （获取用户信息最好用 mapGetters ）

```
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_OTHER_TOKEN: (state, token) => {
      state.ijy_platform = token
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_SEX: (state, sex) => {
      state.sex = sex
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_ROSTERID: (state, rosterId) => {
      state.rosterId = rosterId
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_ROLECODE: (state, roleCode) => {
      state.roleCode = roleCode
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_XToken: (state, xtoken) => {
      state.xToken = xtoken
    }
  },
```
mutations 操作

```
  actions: {
    save() {
      const ishosName = window.location.hostname
      if (ishosName !== 'localhost') {
        const topath = window.location.pathname
        localStorage.setItem('topath', topath)
      }
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          if (!response.data) {
            return reject(response)
          } else {
            const data = response.data
            commit('SET_TOKEN', data.access_token)
            setToken('user_info', JSON.stringify(data))
            setToken('access_token', response.data.access_token)
            setToken('auth_x', response.data.b_token)
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        //
        const response = {
          data: {
            name: 'Super Admin',
            roles: ['admin'],
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          }
        }
        // const data = response.data
        const userInfo = getToken('user_info')
        if (userInfo) {

```  
        
```  
          const userInfoObj = JSON.parse(userInfo)

```
修改其他登陆 注意传值
```

          commit('SET_NAME', userInfoObj.sessionUser.name)
          commit('SET_SEX', userInfoObj.sessionUser.sex)
          commit('SET_PHONE', userInfoObj.sessionUser.phone)
          commit('SET_USERID', userInfoObj.sessionUser.userId)
          commit('SET_ROLEID', userInfoObj.sessionUser.role.roleId)
          commit('SET_ROLECODE', userInfoObj.sessionUser.role.roleCode)
          commit('SET_OTHER_TOKEN', userInfoObj.ijy_platform)
          commit('SET_XToken', userInfoObj.b_token)
        }
        commit('SET_ROLES', ['admin'])
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_INTRODUCTION', '我是超级管理员')
        resolve(response)
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_NAME', '')
          commit('SET_OTHER_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_PHONE', '')
        commit('SET_USERID', '')
        commit('SET_ROLEID', '')
        commit('SET_ROLECODE', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },

    // 设置rosterId
    setRosterId({ commit }, id) {
      commit('SET_ROSTERID', id)
    }
  }
}

export default user
```

设置 auth_x 接口发送后端验证 

setToken('auth_x', response.data.b_token)
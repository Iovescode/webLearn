import { asyncRouterMap, constantRouterMap, asyncRouterMap_JL, asyncRouterMap_ZZ } from '@/router'
import store from '@/store'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    route.meta.roles.some(role => {
      if (!String(roles).includes(role)) {
        route.hidden = true
      }
      return String(roles).includes(role)
    })
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRouters
        // 角色处理
        const roleCode = store.getters.roleCode
        if (roleCode === 'ZJ-JL') {
          asyncRouterMap_JL.forEach(element => {
            asyncRouterMap.splice(asyncRouterMap.length - 2, 0, element)
          })
          accessedRouters = asyncRouterMap
        } else if (roleCode === 'ZJ-ZZ') {
          asyncRouterMap_ZZ.forEach(element => {
            asyncRouterMap.splice(asyncRouterMap.length - 2, 0, element)
          })
          accessedRouters = asyncRouterMap
        }
        accessedRouters = filterAsyncRouter(asyncRouterMap, [store.getters.roleCode])
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission

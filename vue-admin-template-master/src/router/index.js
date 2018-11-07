import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
// 默认菜单
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// 无角色菜单列表（普通组员菜单)
export const asyncRouterMap = [
  {
    path: '/parent',
    component: Layout,
    hidden: false,
    meta: { title: 'parent', icon: 'component' },
    children: [{
      path: 'child',
      component: _import('child/index'),
      name: 'child',
      meta: { title: 'child', icon: 'documentation' }
    },
    {
      path: 'child2',
      component: _import('child/index2'),
      name: 'child2',
      meta: { title: 'child2', icon: 'documentation' }
    }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
// 组长角色的路由
export const asyncRouterMap_ZZ = []
// 经理角色的路由
export const asyncRouterMap_JL = [

]


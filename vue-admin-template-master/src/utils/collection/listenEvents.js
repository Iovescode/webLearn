import router from '../../router'
import { formatDate } from '../formatDate'
export default function listenEvents(eventType, event, vm) {
  // const rule = ['$on', '$emit', '$once', '$off']
  vm.timeAction = formatDate('YYYY-MM-DD hh:mm:ms')
  const eventFilter = ['destroyPopper', 'hook:updated', 'hook:beforeUpdate', 'hook:beforeDestroy', 'created', 'input', 'handleGroupDisabled', 'queryChange']
  if (vm.$vnode && !eventFilter.includes(event)) {
    console.group('Event')
    console.log('事件发生时间:' + vm.timeAction)
    console.log('事件类型:' + eventType)
    console.log('事件：' + event)
    console.log('组件数据变化:', vm.$vnode.componentOptions.propsData)
    console.log('组件内置编号:' + vm._uid)
    console.log('组件信息:' + vm.$vnode.tag)
    console.log('页面:' + router.app._route.meta.title)
    console.log('路由:' + router.currentRoute.path)
    console.groupEnd('Event')
    // 采集数据开始
  }
}

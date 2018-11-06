/**
 * 我们将 event-bus 封装为一个插件.
 * plugin/event-bus.js
 */
export default {
  install(Vue) {
    const EventBus = new Vue()
    Vue.prototype.$events = EventBus
    Vue.EventBus = EventBus
  }
}

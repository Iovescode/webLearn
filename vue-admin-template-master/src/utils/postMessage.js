import { getString } from './storage'

window.onmessage = function(e) {
  const userInfo = getString('user_info')
  e.source.postMessage({ 'user_info': JSON.parse(userInfo), 'location': location.host }, '*')
}

export default {}

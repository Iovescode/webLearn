
import config from './config.js'
import api from './api.js'
import remote from './remote.js'

let baseURL
(() => {
  config.hostName.map((item, index) => {
    if (window.location.hostname.includes(item.name)) {
      baseURL = item.value
    }
  })
})()
function forapi(e, url) {
  if (e) {
    for (const item in remote) {
      if (e === item) {
        for (const key in remote[item]) {
          if (key === url) {
            return {
              method: key.match(/(\S*)@/)[1],
              url: remote[item][key]
            }
          }
        }
      }
    }
  } else {
    for (const item in api) {
      if (url === item) {
        return {
          method: item.match(/(\S*)@/)[1],
          url: api[item]
        }
      }
    }
  }
}
const deploy = {
  opt: {
    baseURL: '' || baseURL,
    timeout: 10000,
    deployGet: {
      'X-Requested-With': 'XMLHttpRequestfffggcjyvyjtfvfytfvfty',
      'Accept': '*/*',
      'Content-Type': 'application/json; charset=UTF-8',
      'token': '99c29e21933e96fda1dd'
    },
    deployPost: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  },
  mapping: function(e, url) {
    if (config.remote.includes(e)) {
      return forapi(e, url)
    } else {
      return forapi('', url)
    }
  }
}

export default deploy

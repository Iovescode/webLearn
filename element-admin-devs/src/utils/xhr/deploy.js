import api from './api.js'
import remote from './remote.js'
const hostName = [
  { name: 'localhost', value: 'api.apiopen.top' },
  { name: 'dev-', value: 'dev-izj.hfjy.com' },
  { name: 'test-', value: 'i-izj.hfjy.com' },
  { name: 'i-', value: 'i-izj.hfjy.com' },
  { name: 'offline-', value: 'offline-izj.hfjy.com' },
  { name: 'temp-', value: 'temp-ijx.hfjy.com' },
  { name: 'izj.', value: 'izj.hfjy.com' }
]
// const remote = ['ijx', 'ijy', 'ijw']
// const hostname = window.location.hostname.toString()
let baseURL
const hostnames = function() {
  hostName.map((item, index) => {
    if (window.location.hostname.includes(`${item.name}`)) {
      baseURL = 'http://' + item.value
    }
  })
}
hostnames()

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
          } else {
            throw new Error(`请把${remote[item][key]}放入romoteApi`)
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
      } else {
        throw new Error(`url`)
      }
    }
  }
}

const deploy = {
  // http默认配置
  opt: {
    baseURL: '' || baseURL,
    // remote: 'api',
    timeout: 10000,
    deployGet: {
      'X-Requested-With': 'XMLHttpRequestfffggcjyvyjtfvfytfvfty',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    deployPost: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  },
  mapping: function(e, url) {
    console.log(e, url, 898)
    if (e === 'izj') {
      return forapi('izj', url)
    } else {
      return forapi('', url)
    }
  }

}
export default deploy

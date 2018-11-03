const hostname = window.location.hostname
const deploy = {
  // http默认配置
  opt: {
    baseURL: hostname === 'localhost' ? 'http://www.baidu.com' : '',
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
  mapping: function(e) {
    if (e.includes('izj')) {
      return 'http://api.apiopen.top'
    }
  }

}
export default deploy

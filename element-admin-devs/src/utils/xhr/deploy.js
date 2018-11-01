const deploy = {
  // http默认配置
  baseURL: 'www.baidu.com',
  timeout: 10000,
  deployGet: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  deployPost: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
}
export default deploy

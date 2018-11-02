const deploy = {
  // http默认配置
  baseURL: 'http://dev-api.hfjy.com',
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

  // method: opts.method,
  // baseURL: 'http://dev-api.hfjy.com',
  // url: opts.url,
  // timeout: 10000,
  // params: Object.assign(Public, data),
  // data: qs.stringify(Object.assign(Public, data)),
  // headers: opts.method === 'get' ? {
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json; charset=UTF-8'
  // } : {
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // }
}
export default deploy

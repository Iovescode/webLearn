
export default class HttpUtils {
  static commonFetcdh(url, options, method = 'GET') {
    const searchStr = this.obj2String(options)
    let initObj = {}
    if (method === 'GET') { // 如果是GET请求，拼接url
      url += '?' + searchStr
      initObj = {
        method: method,
        credentials: 'include'
      }
    } else {
      initObj = {
        method: method,
        credentials: 'include',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: searchStr
      }
    }
    fetch(url, initObj).then((res) => {
      return res.json()
    }).then((res) => {
      return res
    })
  }

  obj2String(obj, arr = [], idx = 0) {
    for (const item in obj) {
      arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
  }

  GET(url, options) {
    return this.commonFetcdh(url, options, 'GET')
  }

  POST(url, options) {
    return this.commonFetcdh(url, options, 'POST')
  }
}

HttpUtils.GET('https://www.baidu.com/search/error.html', { a: 1, b: 2 })
HttpUtils.POST('https://www.baidu.com/search/error.html', { a: 1, b: 2 })

// GET
// HttpUtils.get(url)
//   .then(result => {
//     this.setState({
//       result: JSON.stringify(result)
//     })
//   })
//   .catch(error => {
//     this.setState({
//       result: 'err+' + JSON.stringify(error)
//     })
//   })

// POST
// HttpUtils.post(url, data)
//   .then(result => {
//     this.setState({
//       result: JSON.stringify(result)
//     })
//   })
//   .catch(error => {
//     this.setState({
//       result: 'err + ' + JSON.stringify(error)
//     })
//   })


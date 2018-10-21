// HttpUtils.js 文件
export default class HttpUtils {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Tyoe': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

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



import http from './xhr.js'
import ApiSetting from './api.js'
export default {
  created: function() {
    http(ApiSetting.getLocation, { 'srChannel': 'h5' })
      .then((res) => {
        console.log(res)
      }, (error) => {
        console.log(error)
      })
  }
}


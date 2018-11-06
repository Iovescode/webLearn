import db from '../db/db'

export function getCacheData(config) {
  db.cacheDate.where({ 'url': config.url })
}

export function CacheIndex(config) {
  if (config.indexDb_cache) {
    return new Promise((resolve, rejects) => {
      db.cacheDate.get({ url: config.url }).then(function(item) {
        if (item.data) {
          item.data.IS_CATCHE = true // 增加接口标识
        }
        resolve({ config: config, data: item.data })
      }).catch(err => {
        console.log(err)
      })
    })
  } else {
    return Promise.resolve({ config: config, data: { data: '', code: '0x000000' }})
  }
}

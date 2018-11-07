import db from './db'
async function update(config) {
  return await db.cacheDate.update({
    url: config.url
  })
}
function where(config) {
  return db.cacheDate.where(
    {
      url: config.baseURL + config.url
    }
  ).first()
}
export default{ update, where }

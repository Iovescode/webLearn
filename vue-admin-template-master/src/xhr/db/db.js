import Dexie from 'dexie'
import config from '@/../config/config.js'

const db = new Dexie(config.INDEXDB.DB)
db.version(1).stores(config.INDEXDB.TABLE)
export default db

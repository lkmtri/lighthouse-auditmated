module.exports.PORT = 3000

const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const MONGO_DB_NAME = 'frontend-performance-audit'
const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'mongodb'
const MONGO_DB_CREDENTIALS = MONGO_DB_USER && MONGO_DB_PASSWORD ? `${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@` : ''

module.exports.MONGO_DB_URL = `mongodb://${MONGO_DB_CREDENTIALS}${MONGO_DB_HOST}:27017/${MONGO_DB_NAME}`

const mongoose = require('mongoose')
const { MONGO_DB_URL } = require('../env')
const query = require('./query')

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      MONGO_DB_URL,
      { useNewUrlParser: true },
      async (error) => {
        if (error) { // Retry connect on error
          setTimeout(() => connect().then(resolve), 5000)
        } else {
          console.log('Successfully connected to MongoDB')
          resolve()
        }
      }
    )
  })
}

module.exports = {
  connect,
  query
}

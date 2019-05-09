const uuid = require('uuid/v4')
const { LighthouseResults } = require('./schema')

module.exports.getResult = (id) => LighthouseResults.findById(id)

module.exports.saveResult = async ({ name, result }) => {
  const record = await LighthouseResults.create({ name, result })
  return record.id
}

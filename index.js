const express = require('express')
const queue = require('express-queue')
const bodyParser = require('body-parser')
const LighthouseReportGenerator = require('lighthouse/lighthouse-core/report/report-generator.js')
const runAudit = require('./audits.js')
const { PORT } = require('./env')
const db = require('./db')

const app = express()

const getAuditSummary = ({ name, url, id, result, host }) => 
  Object.values(result.categories).reduce((acc, c) => {
    acc[c.title] = c.score
    return acc
  }, { 
    name,
    url,
    report: `http://${host}/audit/${id}`
  })

app.use(bodyParser.json())

app.post('/audit', queue({ activeLimit: 1, queuedLimit: 10 }))

app.post('/audit', async (req, res) => {
  try {
    const { name, url } = req.body
    const host = req.get('host')
    const result = await runAudit({ name, url })
    const id = await db.query.saveResult({ name, result: JSON.stringify(result) })
    res.status(200).json(getAuditSummary({ id, name, url, result, host }))
  } catch (e) {
    res.sendStatus(400)
  }
})

app.get('/audit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { result } = await db.query.getResult(id)
    res.send(LighthouseReportGenerator.generateReportHtml(JSON.parse(result)))
  } catch (e) {
    res.sendStatus(400)
  }
})

db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
  })
})

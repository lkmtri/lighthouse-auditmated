const express = require('express')
const queue = require('express-queue')
const bodyParser = require('body-parser')

const PORT = 3000

const app = express()

const runAudit = require('./audits.js')

app.use(bodyParser.json())

app.get('/audit', queue({ activeLimit: 1, queuedLimit: 10 }))

app.get('/audit', async (req, res) => {
  const { name, url } = req.query
  try {
    const result = await runAudit({ name, url })
    res.status(200).json(result)
  } catch (e) {
    res.sendStatus(400)
  }
})

app.use('/result', express.static('results'))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})

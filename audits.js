const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

const defaultOpts = {
  chromeFlags: ['--headless', '--no-sandbox'],
  output: 'html',
  throttlingMethod: 'devtools'
}

const launchChromeAndRunLighthouse = ({ url, opts = defaultOpts, config = null } = {}) => {
  return chromeLauncher.launch({ port: 50000, chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port
    return new Promise((resolve, reject) => {
      lighthouse(url, opts, config).then(results => {
        // use results.lhr for the JS-consumeable output
        // use results.report for the HTML/JSON/CSV output as a string
        // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
        return chrome.kill().then(() => resolve(results.lhr))
      })
    })
  })
}

module.exports = launchChromeAndRunLighthouse

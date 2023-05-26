var fs = require('fs');
const https = require('https')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()
const host = 'localhost'

var options = {
  // key: fs.readFileSync('ssl.key'),
  // cert: fs.readFileSync('ssl.crt'),
  // ca: [fs.readFileSync('root.crt')]
  key: fs.readFileSync('ssl-certificates/localhost.key', 'utf8'),
  cert: fs.readFileSync('ssl-certificates/localhost.crt', 'utf8'),
  ca: [fs.readFileSync('ssl-certificates/rootCA.pem')]
};

app.prepare()
.then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://${host}:${port} on ${dev ? "development": "production"} mode.`)
  })
  // const server = express()

  // server.get('*', (req, res) => {
  //   return handle(req, res)
  // })

  // server.listen(3000, (err) => {
  //   if (err) throw err
  //   console.log('> Ready on http://localhost:3000')
  // })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
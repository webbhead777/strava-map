const express = require('express')
const app = express()


app.use((req, res) => {
  console.log('request', req)
  return res.status(200).sendFile('../client/index.html', {root: __dirname })
})

app.get('*', (req, res) => {
  console.log('GET', req)
})

const port = process.env.PORT || 6000

app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})

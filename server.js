const express = require('express')
const app = express()

app.use(express.static('public', { maxAge: 60 * 1000 }))

app.listen(8080, function () {
  console.log('App listening on port 8080')
})

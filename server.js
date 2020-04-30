const express = require('express')
const app = express()
const mainfest = require('./public/assets-manifest.json')

app.set('view engine', 'ejs')


app.use(express.static('public', { maxAge: 60 * 1000 }))

app.use('/', (req, res) => {
  return res.render('index.ejs', {
    style: mainfest.style,
    script: mainfest.script
  })
})


app.listen(8080, function () {
  console.log('App listening on port 8080')
})

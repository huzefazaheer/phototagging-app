const express = require('express')
const cookieParser = require('cookie-parser')
const { default: gamesession } = require('./game')
const app = express()

app.use(cookieParser())
app.use(express.json())

app.get('/start', (req, res) => {
  let session
  if (req.cookies?.gamesession) {
    session = JSON.parse(req.cookies.gamesession)
  } else {
    session = new gamesession(crypto.randomUUID())
    res.cookie('gamesession', JSON.stringify(session), {
      maxAge: 900000,
    })
  }

  res.json(session)
})

app.get('/end', (req, res) => {
  if (req.cookies?.gamesession) {
    const session = JSON.parse(req.cookies.gamesession)
    console.log(session)
    const time = new Date() - new Date(session.startTime)
    res.clearCookie('gamesession')
    res.json(time / 1000)
  } else console.log('no session')
})

app.get('/end', (req, res) => {
  sessions.push(new gamesession(crypto.randomUUID()))
})

app.listen(8080)

const express = require('express')
const cookieParser = require('cookie-parser')
const { default: gamesession } = require('./game')
const { createSession, removeSession, getSessionById } = require('./models/db')
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/start', async (req, res) => {
  let session
  if (req.cookies?.gamesession) {
    session = await getSessionById(req.cookies.gamesession)
  } else {
    session = await createSession()
    res.cookie('gamesession', session.id, {
      maxAge: 900000,
    })
  }

  res.json(session)
})

app.get('/end', async (req, res) => {
  if (req.cookies?.gamesession) {
    const session = await removeSession(req.cookies.gamesession)
    const time = (new Date() - new Date(session.starttime)) / 1000
    res.clearCookie('gamesession')
    res.json({ session, time })
  } else console.log('no session')
})

app.get('/end', (req, res) => {
  sessions.push(new gamesession(crypto.randomUUID()))
})

app.listen(8080)

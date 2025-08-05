const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { default: gamesession } = require('./game')
const {
  createSession,
  removeSession,
  getSessionById,
  setTask1,
  setTask2,
} = require('./models/db')
const { error } = require('console')
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const obj1 = [-0.19367123697047484, -0.10222766907583614]
const obj2 = [-0.18973216137179072, -0.0955278755614768]

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

app.get('/tag/:id', async (req, res) => {
  if (req.cookies?.gamesession) {
    const session = await getSessionById(req.cookies.gamesession)

    const coords = req?.body?.coords ? JSON.parse(req.body.coords) : undefined
    const normalized_radius = req?.body?.normalized_radius
    if (coords && normalized_radius) {
      if (req.params.id == 1) {
        const dist = Math.sqrt(
          Math.pow(coords[0] - obj1[0], 2) + Math.pow(coords[1] - obj1[1], 2),
        )
        if (dist <= normalized_radius) {
          setTask1(session.id)
          res.json({ status: 'hit target 1' })
        }
      }
      if (req.params.id == 2) {
        const dist = Math.sqrt(
          Math.pow(coords[0] - obj2[0], 2) + Math.pow(coords[1] - obj2[1], 2),
        )
        if (dist <= normalized_radius) {
          setTask2(session.id)
          res.json({ status: 'hit target 2' })
        }
      }
    }
    res.json({ session })
  } else req.json({ error: 'Session expired' })
})

app.get('/end', async (req, res) => {
  if (req.cookies?.gamesession) {
    const session = await getSessionById(req.cookies.gamesession)
    if (session.obj1 && session.obj2) {
      const session = await removeSession(req.cookies.gamesession)
      const time = (new Date() - new Date(session.starttime)) / 1000
      res.clearCookie('gamesession')
      res.json({ session, time })
    }
  } else req.json({ error: 'Session expired' })
})

app.listen(8080)

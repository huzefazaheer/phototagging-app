const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const {
  createSession,
  removeSession,
  getSessionById,
  getLeaderboardForLevel,
  setSessionTimeTaken,
  addScoreToLeaderBoard,
  setTask,
} = require('./models/db')

const app = express()

const publicPath = path.join(__dirname, '/public')

app.use(cors({ credentials: true, origin: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicPath))

const game1 = {
  name: 'Beach Party',
  objective_count: 2,
  objectives: {
    1: {
      coords: [0.2396270788847732, -0.16587570746225078],
      character_name: 'Waldo',
      done: false,
    },
    2: {
      coords: [0.5449054377827889, -0.10557756583301592],
      character_name: 'Waldo',
      done: false,
    },
  },
}

const games = [game1]

app.get('/leaderboard/:id', async (req, res) => {
  const data = await getLeaderboardForLevel(req.params.id)
  res.json(data)
})

app.post('/leaderboard/:id', async (req, res) => {
  if (req.cookies?.gamesession) {
    const session = await getSessionById(req.cookies.gamesession)
    const username = req.body.username
    if (session && username) {
      await addScoreToLeaderBoard(username, session.timetaken)
      await removeSession(req.cookies.gamesession)
    }
    res.clearCookie('gamesession')
  }
})

app.get('/start/:id', async (req, res) => {
  let session
  if (req.cookies?.gamesession) {
    await removeSession(req.cookies.gamesession)
    res.clearCookie('gamesession')
  }

  if (req.params.id != 1) {
    res.json({ error: 'Invalid game id' })
    return
  }
  session = await createSession(JSON.stringify(games[req.params.id - 1]))
  res.cookie('gamesession', session.id, {
    maxAge: 900000,
    httpOnly: true,
  })

  res.json(session)
})

app.get('/tag/:id', async (req, res) => {
  if (req.cookies?.gamesession) {
    const session = await getSessionById(req.cookies.gamesession)
    const coords = req?.query?.coords ? JSON.parse(req.query.coords) : undefined
    const normalized_radius = req?.query?.normalized_radius
    if (coords && normalized_radius && req.params?.id) {
      const objective = session.game.objectives[req.params.id]
      if (!objective.done) {
        const req_coords = objective.coords
        const dist = Math.sqrt(
          Math.pow(coords[0] - req_coords[0], 2) +
            Math.pow(coords[1] - req_coords[1], 2),
        )
        if (dist <= normalized_radius) {
          setTask(session.id, req.params.id)
          res.json({ status: 'hit target ' + req.params.id })
          return
        } else res.json({ status: 'missed target ' + req.params.id })
      } else res.json({ error: 'Target hit already' })
    } else res.json({ error: 'Invalid target' })
  } else res.json({ error: 'Session expired' })
})

app.get('/end', async (req, res) => {
  if (req.cookies?.gamesession) {
    const session = await getSessionById(req.cookies.gamesession)
    Object.keys(session.game.objectives).forEach((key) => {
      if (!session.game.objectives[key].done) {
        res.json({ error: 'Game is not completed' })
        return
      }
    })

    const time = (new Date() - new Date(session.starttime)) / 1000
    await setSessionTimeTaken(time, req.cookies.gamesession)
    res.json({ session, time })
  } else res.json({ error: 'Session expired' })
})

app.listen(8080)

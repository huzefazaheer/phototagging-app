const pool = require('./pg')

async function createSession() {
  const { rows } = await pool.query(
    'INSERT INTO sessions (starttime) VALUES ($1) RETURNING *',
    [new Date()],
  )
  return rows[0]
}

async function getSessionById(id) {
  const { rows } = await pool.query('SELECT * FROM sessions WHERE id = ($1)', [
    id,
  ])
  return rows[0]
}

async function removeSession(id) {
  const { rows } = await pool.query(
    'DELETE FROM sessions WHERE id = ($1) RETURNING *',
    [id],
  )
  return rows[0]
}

async function setTask1(id) {
  const { rows } = await pool.query(
    'UPDATE sessions SET obj1 = TRUE WHERE id = $1 RETURNING *',
    [id],
  )
  return rows[0]
}

async function setTask2(id) {
  const { rows } = await pool.query(
    'UPDATE sessions SET obj2 = TRUE WHERE id = $1 RETURNING *',
    [id],
  )
  return rows[0]
}

async function getLeaderboardForLevel(levelid) {
  const { rows } = await pool.query(
    'SELECT username, timetaken FROM leaderboard INNER JOIN game ON game.id = $1',
    [levelid],
  )
  return rows
}

async function addScoreToLeaderBoard(username, score, levelid) {
  const { rows } = await pool.query(
    'INERT INTO leaderboard (username, levelid, timetaken) VALUES($1, $2, $3)',
    [username, levelid, score],
  )
}

module.exports = {
  createSession,
  getSessionById,
  removeSession,
  setTask1,
  setTask2,
  getLeaderboardForLevel,
  addScoreToLeaderBoard,
}

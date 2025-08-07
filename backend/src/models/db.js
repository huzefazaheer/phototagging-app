const pool = require('./pg')

async function createSession(game) {
  const { rows } = await pool.query(
    'INSERT INTO sessions (starttime, game) VALUES ($1, $2) RETURNING *',
    [new Date(), game],
  )
  return rows[0]
}

async function setSessionTimeTaken(timetaken, id) {
  try {
    await pool.query('UPDATE sessions SET timetaken = $1 WHERE id = $2;', [
      timetaken,
      id,
    ])
  } catch (error) {
    console.log(error)
  }
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

async function setTask(sessionId, taskNo) {
  const { rows } = await pool.query(
    `UPDATE sessions 
     SET game = jsonb_set(game, '{objectives, ${taskNo}, done}', 'true') 
     WHERE id = $1 
     RETURNING *`,
    [sessionId],
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
    'INSERT INTO leaderboard (username, levelid, timetaken) VALUES($1, $2, $3)',
    [username, levelid, score],
  )
}

module.exports = {
  createSession,
  getSessionById,
  removeSession,
  setTask,
  getLeaderboardForLevel,
  addScoreToLeaderBoard,
  setSessionTimeTaken,
}

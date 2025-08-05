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

module.exports = {
  createSession,
  getSessionById,
  removeSession,
  setTask1,
  setTask2,
}

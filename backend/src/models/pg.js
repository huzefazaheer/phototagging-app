const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgres://huzefa:123@localhost:5432/phototagging',
})

module.exports = pool

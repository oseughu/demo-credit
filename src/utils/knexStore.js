import db from '#database/db'
import KnexSessionStore from 'connect-session-knex'
import session from 'express-session'

const knexStore = new KnexSessionStore(session)

const store = new knexStore({
  knex: db,
  sidfieldname: 'session_id',
  clearInterval: 60000,
  createtable: true,
  tablename: 'sessions'
})

export default store

import db from '#database/db'
import jwt from 'jsonwebtoken'

const checkAuth = async (req, res, next) => {
  try {
    const cookie = req.session.jwt
    const claims = jwt.verify(cookie, process.env.SECRET)

    if (!cookie || !claims) {
      res.status(401).send({ error: 'unauthorized.' })
    }

    console.log(cookie)
    console.log(claims)

    req.user = await db
      .select('id', 'first_name', 'last_name', 'email', 'balance')
      .from('users')
      .where('id', '=', `${claims.id}`)
      .first()

    next()
  } catch (err) {
    console.log(err)
    res.status(401).send({ error: 'not logged in.' })
  }
}

export default checkAuth

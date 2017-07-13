import passport from 'passport'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import rc from './rc'
import r from './rethinkdb'
import { Strategy as GitHubStrategy } from 'passport-github'

export const requireAuth = expressJwt({secret: rc.auth.secret})

passport.use(new GitHubStrategy(rc.auth.github, async (accessToken, refreshToken, {id, username}, cb) => {
  try {
    // Whitelist
    if (!rc.auth.usersWhitelist.includes(username))  {
      return cb(null, null)
    }
    var user = await r.table('users').filter({username}).nth(0).default(null).run()
    // Create a user if not found
    if (!user) {
      user = await r.table('users').insert({username, githubId: id}, {returnChanges: 'always'}).run().then(v => v.changes[0].new_val)
    }
    return cb(null, user)
  } catch (err) {
    return cb(err, null)
  }
}))

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, rc.auth.secret, {
    expiresIn: '7d'
  })
  next()
}

export function setupAuth(app) {
  app.use(passport.initialize())

  app.get('/auth/github', passport.authenticate('github'))

  app.get('/auth/github/callback', passport.authenticate('github', {session: false, failureRedirect: '/server-auth-failure' }), generateToken, (req, res) => {
    res.redirect(`/login-token?token=${req.token}`)
  })

  app.get('/auth/load', requireAuth, (req, res) => {
    res.json({name: 'foo'})
  })

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {             // for express-jwt, default is errorstack. must at the very end.
      res.status(401).send('invalid token')
    }
  })
}

import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import renderFullPage from './util/renderFullPage'
import App from '../app'

const app = Express()
const port = process.env.PORT || 3750

passport.use(new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_URL + '/auth/twitter/callback',
  },
  (token, tokenSecret, profile, cb) => {
    console.log(profile)
    return cb(null, { username: profile.username })
  }
))

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// app.use((req, res, next) => {
//   res.header['Access-Control-Allow-Origin'] = '*'
//   next()
// })
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(Express.static(path.resolve(__dirname, '..', 'dist')))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/twitter',
  passport.authenticate('twitter'))

app.get('/auth/twitter/callback',
  passport.authenticate(
    'twitter',
    {failureRedirect: '/'},
    (_, res) => res.redirect('/') // success
  ))

app.get('*', (req, res) => {
  const context = {}

  const markup = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(302, context.url)
    res.end()
  } else {
    res.send(renderFullPage(markup))
  }
})

app.listen(port, () => console.log('listening on', port))
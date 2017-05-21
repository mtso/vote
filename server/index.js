import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import passport from './auth'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import renderFullPage from './util/renderFullPage'
import App from '../app'

const app = Express()
const port = process.env.PORT || 3750

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Express.static(path.resolve(__dirname, '..', 'dist')))

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/')
  }
)

app.get('/auth/twitter',
  passport.authenticate('twitter')
)

app.get('/*', (req, res) => {
  const context = {}

  console.log(req.user)

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
    res.send(renderFullPage(markup, req.user))
  }
})

app.listen(port, () => console.log('listening on', port))

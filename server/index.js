import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import passport from './auth'
const models = require('./models')
const pollController = require('./controllers/poll')
const ensureAuthenticated = require('./util/ensureAuthenticated')

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

app.post('/api/poll', ensureAuthenticated, pollController.postPoll)
app.get('/api/poll', pollController.getPoll)

app.get('/*', (req, res) => {
  const context = {}

  const state = {}
  if (req.user) {
    state.username = req.user.username
  }

  const renderResult = (polls) => {
    polls = polls.map((poll) => {
      poll = poll.get({
        plain: true,
      })
      poll.isChosen = false
      poll.choices = poll.Choices.map((choice) => choice.text)
      return poll
    })

    console.log(polls)

    state.polls = polls
    // [
    //     {
    //       isChosen: false,
    //       title: 'Who is your favorite captain?',
    //       choices: [
    //         'Piccard',
    //         'Clark',
    //       ],
    //     },
    //     {
    //       isChosen: false,
    //       title: 'What is your favorite ice cream flavor?',
    //       choices: [
    //         'Vanilla',
    //         'Chocolate',
    //         'Green Tea',
    //       ],
    //     },
    //   ]
    
    const markup = renderToString(
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App state={state} />
      </StaticRouter>
    )

    if (context.url) {
      res.redirect(302, context.url)
      res.end()
    } else {
      res.send(renderFullPage(markup, state))
    }
  }

  models.Poll
    .findAll({
      offset: 0,
      limit: 10,
      order: [ [ 'id', 'DESC' ] ],
      include: [ models.Choice ],
    })
    .then(renderResult)
    .catch((err) => console.error(err))
})

models.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log('listening on', port))
  })
  .catch((err) => console.log(err))

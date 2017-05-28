import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Poll, Choice } from '../models'
import renderFullPage from '../utils/renderFullPage'
import renderPollData from '../utils/renderPollData'
import App from '../../app'

const renderApp = (req, res) => {
  const context = {}

  const state = {}
  if (req.user) {
    state.username = req.user.username
  } else {
    state.ip = req.ip
  }

  const renderResult = (polls) => {
    polls = polls.map( renderPollData(req) )

    state.polls = polls

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

  Poll
    .findAll({
      offset: 0,
      limit: 10,
      order: [ [ 'id', 'DESC' ] ],
      include: [ Choice ],
    })
    .then(renderResult)
    .catch((err) => console.error(err))
}

export default renderApp
import React from 'react'
import { render } from 'react-dom'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'

render(
  <BrowserRouter>
    <App state={window.__INITIAL_STATE__} />
  </BrowserRouter>,
  document.querySelector('#app')
)
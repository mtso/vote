import React from 'react'
import { render } from 'react-dom'

const initialState = JSON.stringify(
  window.__INITIAL_STATE__ || '{}'
)

render(
  <App />,
  document.querySelector('#app')
)
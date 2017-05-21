import React from 'react'
import { render } from 'react-dom'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'

// const initialState = JSON.stringify(
//   window.__INITIAL_STATE__ || '{}'
// )

render(
  <BrowserRouter>
    <App names={
      ['hello', 'foo', 'bar']
    }/>
  </BrowserRouter>,
  document.querySelector('#app')
)
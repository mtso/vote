import React from 'react'
import { render } from 'react-dom'
import App from '../app'
import { BrowserRouter } from 'react-router-dom'

const initialState = window.__INITIAL_STATE__
  ? JSON.stringify( window.__INITIAL_STATE__ ) 
  : null

console.log(initialState)

render(
  <BrowserRouter>
    <App
      name={initialState}
    />
  </BrowserRouter>,
  document.querySelector('#app')
)
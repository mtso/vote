import React from 'react'
import './App.css'
import { default as request } from 'superagent'

const authenticateTwitter = () => {
  request
    .get('/auth/twitter')
    .end((err, res) => {
      console.log(err, res.body)
    })
}

const App = (props) => (
  <div>
    <h1 className='logo'>
      √ote
      <button
        className='oauth-button'
        onClick={authenticateTwitter}
      >
        Sign in with Twitter
      </button>
    </h1>
  </div>
)

export default App

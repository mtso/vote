import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'

const App = ({ name }) => (
  <div>
    <h1 className='logo'>
      √ote {
        name
          ? <span>Welcome back, {name}</span>
          : <a
              href='/auth/twitter'
            >
              Sign in with Twitter la~
            </a>
      }
    </h1>
  </div>
)

export default App

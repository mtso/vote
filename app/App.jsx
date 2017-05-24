import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Poll from './components/Poll'

const App = ({ state }) => (
  <div>
    <h1 className='logo'>
      √ote {
        state.username
          ? <span>Welcome back, {state.username}</span>
          : <a
              href='/auth/twitter'
            >
              Sign in with Twitter
            </a>
      }
    </h1>
    {
      state.polls && state.polls.map(
        (poll) => (
          <div>
            <h2>{poll.title}</h2>
            <Poll choices={poll.choices} />
          </div>
        )
      )
    }
  </div>
)

export default App

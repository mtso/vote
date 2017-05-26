import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Poll from './components/Poll'
import Header from './components/Header'

const App = ({ state }) => (
  <div>
    <Header username={state.username} />
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

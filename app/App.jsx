import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Poll from './components/Poll'
import Header from './components/Header'
import Feed from './pages/Feed'
import CreatePoll from './pages/CreatePoll'
// import PollCreator from './components/PollCreator'

const App = ({ state }) => (
  <Header username={state.username}>
    <Route exact path='/' component={
      () => <Feed polls={state.polls} />
    } />
    <Route exact path='/new' component={() => <CreatePoll {...state} />} />
  </Header>
)

export default App

/*
{
      state.polls && state.polls.map(
        (poll) => (
          <div>
            <h2>{poll.title} {poll.isChosen && 'chosen'}</h2>
            <Poll choices={poll.choices} />
          </div>
        )
      )
    }
*/
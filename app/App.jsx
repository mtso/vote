import React, { Component } from 'react'
import { default as request } from 'superagent'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Poll from './components/Poll'
import Header from './components/Header'
import Feed from './pages/Feed'
import PollCreatorContainer from './pages/PollCreatorContainer'
import pollQueue from './utils/pollQueue'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props.state)
  }
  componentDidUpdate() {
    pollQueue.log()
    let newPoll = pollQueue.pop()
    if (newPoll) {
      let newState = Object.assign({}, this.state, {
        polls: [newPoll].concat(...this.state.polls)
      })
      this.setState(newState)
    }
  }
  render() {
    return (
      <Header username={this.state.username}>
        <button onClick={pollQueue.log}>print queue</button>
        <Route exact path='/' component={
          () => <Feed polls={this.state.polls} />
        } />
        <Route exact path='/new' component={
          () => (
            <PollCreatorContainer
              {...this.state} 
            />
          )
        } />
      </Header>
    )
  }
}

export default App

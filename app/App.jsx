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
    this.handleVoteResponse = this.handleVoteResponse.bind(this)
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
  handleChoiceResponse(index, pollId) {
    this.setState({
      polls: this.state.polls.map()
    })
  }
  handleVoteResponse(index, pollId) {
    request
      .get('/api/poll/' + pollId)
      .end((err, resp) => {
        if (err) {
          return console.error(err)
        }
        this.setState({
          polls: this.state.polls.map((p, i) => {
            if (i === index) {
              return resp.body
            }
            return p
          })
        })
      })
  }
  render() {
    return (
      <Header username={this.state.username}>
        <Route exact path='/' component={
          () => (
            <Feed
              polls={this.state.polls}
              handleVoteResponse={this.handleVoteResponse}
            />
          )
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

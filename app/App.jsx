import React, { Component } from 'react'
import { default as request } from 'superagent'
import { Route, Link } from 'react-router-dom'
import Poll from './components/Poll'
import Header from './components/Header'
import Feed from './pages/Feed'
import PollCreatorContainer from './pages/PollCreatorContainer'
import PollContainer from './pages/PollContainer'
import pollQueue from './utils/pollQueue'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props.state)
    this.handleVoteResponse = this.handleVoteResponse.bind(this)
  }
  componentDidUpdate() {
    let newPoll = pollQueue.pop()
    if (newPoll) {
      let newState = Object.assign({}, this.state, {
        polls: [newPoll].concat(...this.state.polls)
      })
      this.setState(newState)
    }
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
        <Route exact path='/' render={
          () => (
            <Feed
              polls={this.state.polls}
              handleVoteResponse={this.handleVoteResponse}
            />
          )
        } />
        <Route path='/new' component={
          () => (
            <PollCreatorContainer
              {...this.state} 
            />
          )
        } />
        <Route path='/poll/:id' component={PollContainer} />
      </Header>
    )
  }
}

export default App

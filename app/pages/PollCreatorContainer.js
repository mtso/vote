import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { default as request } from 'superagent'
import PollCreator from '../components/PollCreator'
import pollQueue from '../utils/pollQueue'

class PollCreatorContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isComplete: false,
    }
    this.createPoll = this.createPoll.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }
  handleResponse(err, resp) {
    if (err) {
      return console.error(err)
    }
    pollQueue.push(resp.body.poll, () => {
      this.setState({
        isComplete: true,
      })
    })
  }
  createPoll(data) {
    request
      .post('/api/poll')
      .send(data)
      .end(this.handleResponse)
  }
  render() {
    if (!this.props.username || this.state.isComplete) {
      return <Redirect to='/' />
    }

    return (
      <PollCreator onSubmit={this.createPoll} />
    )
  }
}

export default PollCreatorContainer
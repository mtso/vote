import path from 'path'
import React, { Component } from 'react'
import { default as request } from 'superagent'
import PollCell from '../components/PollCell'

class Feed extends Component {
  constructor(props) {
    super(props)
  }
  submitPoll(index, pollId) {
    return (choice) => {
      const url = path.join('/api/choice', '' + choice.pollId)
      request
        .post(url)
        .send(choice)
        .end((err, resp) => {
          if (err) {
            return console.error(err)
          }
          this.props.handleVoteResponse(index, pollId)
        })
    }
  }
  render() {
    return (
      <div>
        {
          this.props.polls.map((poll, i) => (
            <PollCell
              key={poll.title + i}
              onSubmit={this.submitPoll(i, poll.id)}
              {...poll}
            />
          ))
        }
      </div>
    )
  }
}

export default Feed
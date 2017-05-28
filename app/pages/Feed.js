import path from 'path'
import React, { Component } from 'react'
import { default as request } from 'superagent'
import Poll from '../components/Poll'
import Donut from '../components/Donut'

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
          // if (resp.body.success) {
          //   console.log(resp.body.success)
          // }
          // console.log(resp.body)
        })
    }
  }
  render() {
    return (
      <div>
        {
          this.props.polls.map((poll, i) => {
            if (poll.isChosen) {
              return (
                <div key={poll.title + i}>
                  <Donut {...poll} />
                </div>
              )
            }
            return (
              <div key={poll.title + i}>
                <Poll onSubmit={this.submitPoll(i, poll.id)} {...poll} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Feed
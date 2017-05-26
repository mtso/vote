import React, { Component } from 'react'
import Poll from '../components/Poll'
import { default as request } from 'superagent'

class Feed extends Component {
  constructor(props) {
    super(props)


  }
  submitPoll(choice) {
    // if (props.user) {
    //   request
    //     .post('/poll')
    // }
  }
  render() {
    return (
      <div>
        {
          polls.map((poll) => {
            // if (poll.isChosen) {

            // }
            <div>
              <h2>{poll.title}</h2>
              <Poll
                choices={poll.choices}
                onSubmit={this.submitPoll}
              />
            </div>
          })
        }
      </div>
    )
  }
}
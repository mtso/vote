import React, { Component } from 'react'
import { default as request } from 'superagent'
import PollCell from '../components/PollCell'

class PollContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: null,
    }
  }
  componentDidMount() {
    request
      .get('/api/poll/' + this.props.match.params.id)
      .end((err, resp) => {
        if (err) {
          return console.error(err)
        }
        this.setState({
          poll: resp.body,
        })
      })
  }
  render() {
    if (!this.state.poll) {
      return <div />
    }
    return (
      <PollCell
        {...this.state.poll}
      />
    )
  }
}

export default PollContainer

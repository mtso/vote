import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Poll from '../components/Poll'
import PollCreator from '../components/PollCreator'

class CreatePoll extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (!this.props.username) {
      return <Redirect to='/' />
    }

    return (
      <PollCreator />
    )
  }
}

export default CreatePoll
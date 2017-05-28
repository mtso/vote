import React, { Component } from 'react'
import { default as request } from 'superagent'
import PollItem from './PollItem'
import PollItemOther from './PollItemOther'

class Poll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vote: null,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
    if (!!this.state.vote) {
      const choice = {
        text: this.state.vote,
        pollId: this.props.id, 
      }

      this.props.onSubmit(choice)
    }
  }
  onChange(e) {
    this.setState({
      vote: e.target.value,
    })
  }
  render() {
    const choices = this.props.choices.map(
      (v, i) => (
        <PollItem key={i} value={v} onChange={this.onChange} />
      )
    )
    return (
      <form onSubmit={this.onSubmit}>
        <h2>{this.props.title}</h2>
        <ul>
          {choices}
          <PollItemOther pollId={this.props.id} onChange={this.onChange} />
        </ul>
        <input type='submit' value='Vote' />
      </form>
    )
  }
}

export default Poll
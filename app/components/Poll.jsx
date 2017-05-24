import React, { Component } from 'react'
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
    console.log('SUBMIT', this.state.vote)
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
        <ul>
          {choices}
          <PollItemOther onChange={this.onChange} />
        </ul>
        <input type='submit' value='Vote' />
      </form>
    )
  }
}

export default Poll
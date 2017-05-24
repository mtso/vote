import React, { Component } from 'react'
import ListItem from './ListItem'

class PollItemOther extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }
  updateValue(e) {
    this.setState(
      { value: e.target.value }, 
      this.handleChange
    )
  }
  handleChange() {
    this.props.onChange({
      target: {
        value: this.state.value || null,
      },
    })
  }
  render() {
    return (
      <ListItem>
        <input type='radio' id='other' name='poll' onChange={this.handleChange} />
        <label htmlFor='other'>
          <input type='text' placeholder='Other' onChange={this.updateValue} />
        </label>
      </ListItem>
    )
  }
}

export default PollItemOther
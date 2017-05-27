import React, { Component } from 'react'

class PollCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      items: [],
      newKey: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }
  handleTitleChange(e) {
    e.preventDefault()
    this.setState({
      title: e.target.value,
    })
  }
  handleSubmit() {
    const choices = this.state.items
      .map((item) => item.value)
      .reduce((acc, item) => {
        acc[item] = acc[item] + 1 || 1
        return acc
      }, {})
    console.log({
      title: this.state.title,
      choices: Object.keys(choices),
    })
    this.setState({
      title: '',
      items: [],
      newKey: this.state.newKey + 1,
    })
  }
  handleBlur(e) {
    if (e.target.value === '') {
      const items = this.state.items.filter((item) => item.value !== '')
      this.setState({ items: items })
    }
  }
  handleChange(key) {
    return (e) => {
      const updated = this.state.items.map((item) => {
        if (item.key === key) {
          return {
            value: e.target.value,
            key,
          }
        }
        return item
      })
      if (key === this.state.newKey) {
        this.setState({
          items: updated.concat({
            value: e.target.value,
            key: this.state.newKey,
          }),
          newKey: this.state.newKey + 1,
        })
      } else {
        this.setState({
          items: updated,
        })
      }
    }
  }
  render() {
    const inputs = this.state.items.map(
      (item) => (
        <input
          type='search'
          value={item.value}
          placeholder={item.value}
          style={{display: 'block'}}
          key={item.key}
          onChange={this.handleChange(item.key)}
          onBlur={this.handleBlur}
        />
      )
    )
    inputs.push(
      <input
        type='search'
        style={{display: 'block'}}
        placeholder='Add Choice'
        key={this.state.newKey}
        onChange={this.handleChange(this.state.newKey)}
      />
    )
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={this.state.title}
          style={{width: '100%'}}
          placeholder='Poll Title'
          onChange={this.handleTitleChange}
        />
        {inputs}
        <button onClick={this.handleSubmit}>
          Create Poll
        </button>
      </form>
    )
  }
}

export default PollCreator
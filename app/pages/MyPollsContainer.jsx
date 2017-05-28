import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { default as request } from 'superagent'
import account from '../utils/account'
import Donut from '../components/Donut'

class MyPollsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
    }
    this.onDelete = this.onDelete.bind(this)
  }
  componentDidMount() {
    request
      .get('/api/mypolls')
      .end((err, resp) => {
        if (err) {
          console.error(err)
        }
        this.setState({
          polls: resp.body,
        })
      })
  }
  onDelete(index) {
    return (_) => {
      this.setState({
        polls: this.state.polls.filter((_, i) => index !== i),
      })
    }
  }
  render() {
    if (!account.isLoggedIn) {
      return <Redirect to='/' />
    }
    return (
      <div>
        { 
          this.state.polls.map((poll, i) => 
            <Donut
              key={poll.id}
              {...poll}
              canDelete={true}
              onDelete={this.onDelete(i)}
            />
          ) 
        }
      </div>
    )
  }
}

export default MyPollsContainer

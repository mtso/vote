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
  render() {
    if (!account.isLoggedIn) {
      return <Redirect to='/' />
    }
    return (
      <div>
        { 
          this.state.polls.map((poll) => 
            <Donut {...poll} />
          ) 
        }
      </div>
    )
  }
}

export default MyPollsContainer

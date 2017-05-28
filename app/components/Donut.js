import React, { Component } from 'react'
import { default as request } from 'superagent'
import { Link } from 'react-router-dom'
import TwitterLink from './TwitterLink'
import hashColor from '../utils/hashColor'

class Donut extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    if (typeof window === 'undefined' || !this.context || !this.props.data) {
      return
    }

    let data = this.props.data
    data.datasets[0].backgroundColor = data.labels.map(
      (l) => '#' + hashColor(l)
    )
    
    this._chart = new Chart(this.context, {
      type: 'doughnut',
      data: this.props.data,
      options: {
        cutoutPercentage: 80,
      },
    });
  }
  handleDelete() {
    request
      .delete('/api/poll/' + this.props.id)
      .end((err, resp) => {
        if (err || !resp.body.success) {
          return console.error(err, resp.body.success)
        }

        if (this.props.onDelete) {
          this.props.onDelete(this.props.id)
        }
      })
  }
  render() {
    return (
      <div>
        <h2>
          <Link to={'/poll/' + this.props.id}>{this.props.title}</Link>
          { 
            this.props.canDelete && 
            <button onClick={this.handleDelete}>Delete</button> 
          }
        </h2>
        <TwitterLink
          id={this.props.id}
          title={this.props.title}
        />
        <canvas
          ref={(canvas) => {
            this.context = canvas && canvas.getContext('2d')
          }}
          width={400}
          height={400}
        />
      </div>
    )
  }
}

export default Donut
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import hashColor from '../utils/hashColor'

class Donut extends Component {
  constructor(props) {
    super(props)
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
  render() {
    return (
      <div>
        <h2>
          <Link to={'/poll/' + this.props.id}>{this.props.title}</Link>
        </h2>
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
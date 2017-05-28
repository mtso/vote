import React, { Component } from 'react'
import hashColor from '../utils/hashColor'

class Donut extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (typeof window === 'undefined' || !this.context) {
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
        <h2>{this.props.title}</h2>
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
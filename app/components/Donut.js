import React, { Component } from 'react'
import { default as Chart } from 'chart.js'

class Donut extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
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
      <canvas
        ref={(canvas) => { this.context = canvas.getContext('2d') }}
        width={400}
        height={400}
      />
    )
  }
}

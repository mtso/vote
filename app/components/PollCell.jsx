import React from 'react'
import Donut from './Donut'
import Poll from './Poll'
import './PollCell.css'

const PollCell = (props) => (
  <div className='poll-cell'>
    {
      props.isChosen
        ? (
          <Donut
            {...props}
          />
        )
        : (
          <Poll
            onSubmit={props.onSubmit}
            {...props}
          />
        )
    }
  </div>
) 

export default PollCell

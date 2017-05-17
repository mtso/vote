import React from 'react'
import ListItem from './ListItem'

const PollItem = (props) => (
  <ListStyle>
    <input
      type='radio'
      id={props.value}
      value={props.value}
      name='poll' 
      onChange={props.onChange}
      onChange={props.onChange} 
    />
    <label htmlFor={props.value}>{props.value}</label>
  </ListStyle>
)

export default PollItem
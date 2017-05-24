import React from 'react'
import ListItem from './ListItem'

const PollItem = (props) => (
  <ListItem>
    <input
      type='radio'
      id={props.value}
      value={props.value}
      name='poll' 
      onChange={props.onChange}
    />
    <label htmlFor={props.value}>{props.value}</label>
  </ListItem>
)

export default PollItem
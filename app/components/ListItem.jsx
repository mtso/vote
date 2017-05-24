import React from 'react'

const ListItem = (props) => (
  <li style={
    props.style || {listStyleType: 'none'} 
  }>
    {props.children}
  </li>
)

export default ListItem
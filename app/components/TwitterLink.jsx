import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const TwitterLink = ({ id, title, displayText }) => {
  const twitter = 'https://twitter.com/intent/tweet'
  const url = 'url=https://cc4.herokuapp.com/poll/' + id
  const text = 'text=' + title.replace(' ', '+')+ '+++√ote+@'
  const twitterUrl = [twitter, [url, text].join('&')].join('?')
  return (
    <Link
      to={twitterUrl}
      target='_blank'
    >{displayText || 'Share'}</Link>
  )
}

export default TwitterLink

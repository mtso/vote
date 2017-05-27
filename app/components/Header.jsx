import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ username, children }) => (
  <div>
    <h1 className='logo'>√ote</h1> 
    {
      username
        ? <Link to='/new'>Create Poll</Link>
        : <a
            href='/auth/twitter'
          >
            Sign in with Twitter
          </a>
    }
    { children }
  </div>
)

export default Header
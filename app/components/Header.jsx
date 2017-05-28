import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ username, children }) => (
  <div>
    <h1>
      <Link to='/' className='logo'>√ote</Link>
      {
        username
          ? <Link 
              to='/new'
              className='oauth-button' 
            >Create Poll</Link>
          : <a
              href='/auth/twitter'
              className='oauth-button' 
            >
              Sign in with Twitter
            </a>
      }
    </h1>
    { children }
  </div>
)

export default Header
import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ username, children }) => (
  <div>
    <h1>
      <Link to='/' className='logo'>√ote</Link>
      {
        username
          ? <span>
              <Link 
                to='/new'
                className='calm-button' 
              >Create Poll</Link>
              <Link
                to='/mypolls'
                className='calm-button'
              >My Polls</Link>
            </span>
          : <a
              href='/auth/twitter'
              className='calm-button' 
            >
              Sign in with Twitter
            </a>
      }
    </h1>
    { children }
  </div>
)

export default Header
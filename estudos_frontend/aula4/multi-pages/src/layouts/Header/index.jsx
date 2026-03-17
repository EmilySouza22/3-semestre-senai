import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export const Header = () => {

  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout();
    navigate("/")
  }
  
  return (
    <header className='bg-amber-600'>
      <div className='container mx-auto'>
        <h1>Header</h1>
      </div>
    </header>
  )
}

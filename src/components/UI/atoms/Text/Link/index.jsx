import React from 'react'
import { Link } from 'react-router-dom';

export default function index({to,children}) {
  return (
    <Link to={to} >
      {children}
    </Link>
  )
}

import React from 'react'

export default function index({children, className}) {
  return (
    <div className={className}>{children}</div>
  )
}
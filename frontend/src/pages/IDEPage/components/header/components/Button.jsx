import React from 'react'

const Button = (props) => {
  return (
    <button className="bg-[#1D2332] hover:bg-[#2C3243] text-white rounded-md py-1 px-3">
          {props.name}
        </button>
  )
}

export default Button
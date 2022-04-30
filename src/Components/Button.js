import React from 'react'
import "./Button.css"
function Button(props) {
    const {value, func, type, onClick} = props;

  return (
      <button value={value} func={func} className={type} onClick={onClick}>{value}</button>
  )
}

export default Button
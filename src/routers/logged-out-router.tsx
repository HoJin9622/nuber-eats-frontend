import React from 'react'
import { isLoggedInVar } from '../apollo'

export const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true)
  }

  return (
    <div>
      <span>Logged Out</span>
      <button onClick={onClick}>Click to login</button>
    </div>
  )
}

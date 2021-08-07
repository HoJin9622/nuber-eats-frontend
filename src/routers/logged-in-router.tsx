import React from 'react'
import { isLoggedInVar } from '../apollo'

export const LoggedInRouter = () => {
  return (
    <div>
      <span>Logged In</span>
      <button onClick={() => isLoggedInVar(false)}>Log Out</button>
    </div>
  )
}
